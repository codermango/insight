import { take, call, put, cancel, fork } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import request from 'utils/request';

import { FETCH_DASHBOARD } from './constants';
import {
  fetchDashboardDataSuccess,
  fetchDashboardDataError,
} from './actions';

const apiURL = '/api/analysis/';

export function* fetchDashboardData() {
  const data = yield call(request, `${apiURL}dashboarddata`);
  if (!data.err) {
    yield put(fetchDashboardDataSuccess(data.data.response.data));
  } else {
    yield put(fetchDashboardDataError(data.err));
  }
}

export function* fetchDashboard() {
  yield [
    call(fetchDashboardData),
  ];
}

export function* fetchDashboardWatcher() {
  while (yield take(FETCH_DASHBOARD)) {
    yield call(fetchDashboard);
  }
}

export function* analysisData() {
  const watcher = yield fork(fetchDashboardWatcher);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export default [
  analysisData,
];
