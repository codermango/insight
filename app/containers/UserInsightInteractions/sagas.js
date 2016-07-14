import { take, call, put, cancel, fork } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import request from 'utils/request';

import { FETCH_USER_INSIGHT_INTERACTIONS } from './constants';
import {
  fetchCompletenessStart,
  fetchCompletenessSuccess,
  fetchCompletenessError,
  fetchAverageInteractionsStart,
  fetchAverageInteractionsSuccess,
  fetchAverageInteractionsError,
} from './actions';

const apiURL = '/api/interactions/';

export function* fetchCompleteness() {
  yield put(fetchCompletenessStart());
  const resp = yield call(request, `${apiURL}completeness`);

  if (!resp.err) {
    yield put(fetchCompletenessSuccess(resp.data.response.data));
  } else {
    yield put(fetchCompletenessError(resp.err));
  }
}

export function* fetchAverageInteractions() {
  yield put(fetchAverageInteractionsStart());
  const resp = yield call(request, `${apiURL}average`);

  if (!resp.err) {
    yield put(fetchAverageInteractionsSuccess(resp.data.response.data));
  } else {
    yield put(fetchAverageInteractionsError(resp.err));
  }
}

export function* fetchUserInsightInteractions() {
  yield [
    call(fetchCompleteness),
    call(fetchAverageInteractions),
  ];
}

export function* fetchInsightWatcher() {
  while (yield take(FETCH_USER_INSIGHT_INTERACTIONS)) {
    yield call(fetchUserInsightInteractions);
  }
}

export function* userInsightInteractionsData() {
  const watcher = yield fork(fetchInsightWatcher);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export default [
  userInsightInteractionsData,
];
