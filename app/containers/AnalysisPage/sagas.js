import { take, call, put, cancel, fork } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import request from 'utils/request';

import { FETCH_ANALYSIS } from './constants';
import {
  fetchAnalysisActiveViewersSuccess,
  fetchAnalysisActiveViewersError,
  fetchAnalysisChurnSuccess,
  fetchAnalysisChurnError,
} from './actions';

const apiURL = '/api/analysis/';

export function* fetchAnalysisActiveViewers() {
  const activeViewersData = yield call(request, `${apiURL}activeviewers`);
  if (!activeViewersData.err) {
    yield put(fetchAnalysisActiveViewersSuccess(activeViewersData.data.response.data));
  } else {
    yield put(fetchAnalysisActiveViewersError(activeViewersData.err));
  }
}

export function* fetchAnalysisChurn() {
  const churnData = yield call(request, `${apiURL}churn`);
  if (!churnData.err) {
    yield put(fetchAnalysisChurnSuccess(churnData.data.response.data));
  } else {
    yield put(fetchAnalysisChurnError(churnData.err));
  }
}

export function* fetchAnalysis() {
  yield [
    call(fetchAnalysisActiveViewers),
    call(fetchAnalysisChurn),
  ];
}

export function* fetchAnalysisWatcher() {
  while (yield take(FETCH_ANALYSIS)) {
    yield call(fetchAnalysis);
  }
}

export function* analysisData() {
  const watcher = yield fork(fetchAnalysisWatcher);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export default [
  analysisData,
];
