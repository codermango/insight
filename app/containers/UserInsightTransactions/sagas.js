import { take, call, put, cancel, fork } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import request from 'utils/request';

import { FETCH_USER_INSIGHT_TRANSACTIONS } from './constants';
import {
  fetchTimeTransactionsSuccess,
  fetchTimeTransactionsError,
} from './actions';

const apiURL = '/api/transactions/';

export function* fetchTimeTransactions() {
  const transactions = yield call(request, `${apiURL}time`);
  if (!transactions.err) {
    yield put(fetchTimeTransactionsSuccess(transactions.data.response.data));
  } else {
    yield put(fetchTimeTransactionsError(transactions.err));
  }
}

export function* fetchUserInsightTransactions() {
  yield [
    call(fetchTimeTransactions),
  ];
}

export function* fetchInsightWatcher() {
  while (yield take(FETCH_USER_INSIGHT_TRANSACTIONS)) {
    yield call(fetchUserInsightTransactions);
  }
}

export function* userInsightTransactionsData() {
  const watcher = yield fork(fetchInsightWatcher);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export default [
  userInsightTransactionsData,
];
