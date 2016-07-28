import { take, call, put, cancel, fork } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import request from 'utils/request';

import { FETCH_ANALYSIS } from './constants';
import {
  fetchAnalysisActiveViewersSuccess,
  fetchAnalysisActiveViewersError,
  fetchAnalysisChurnSuccess,
  fetchAnalysisChurnError,
  fetchAnalysisAverageAmountSuccess,
  fetchAnalysisAverageAmountError,
  fetchAnalysisAverageViewTimeSuccess,
  fetchAnalysisAverageViewTimeError,
  fetchAnalysisPersonasActiveViewersSuccess,
  fetchAnalysisPersonasActiveViewersError,
} from './actions';

const apiURL = '/api/analysis/';

export function* fetchAnalysisActiveViewers() {
  const data = yield call(request, `${apiURL}activeviewers`);
  if (!data.err) {
    yield put(fetchAnalysisActiveViewersSuccess(data.data.response.data));
  } else {
    yield put(fetchAnalysisActiveViewersError(data.err));
  }
}

export function* fetchAnalysisChurn() {
  const data = yield call(request, `${apiURL}churn`);
  if (!data.err) {
    yield put(fetchAnalysisChurnSuccess(data.data.response.data));
  } else {
    yield put(fetchAnalysisChurnError(data.err));
  }
}

export function* fetchAnalysisAverageAmount() {
  const data = yield call(request, `${apiURL}averageamount`);
  if (!data.err) {
    yield put(fetchAnalysisAverageAmountSuccess(data.data.response.data));
  } else {
    yield put(fetchAnalysisAverageAmountError(data.err));
  }
}

export function* fetchAnalysisAverageViewTime() {
  const data = yield call(request, `${apiURL}averageviewtime`);
  if (!data.err) {
    yield put(fetchAnalysisAverageViewTimeSuccess(data.data.response.data));
  } else {
    yield put(fetchAnalysisAverageViewTimeError(data.err));
  }
}

export function* fetchAnalysisPersonasActiveViewers() {
  const data = yield call(request, `${apiURL}personas/activeviewers`);
  if (!data.err) {
    yield put(fetchAnalysisPersonasActiveViewersSuccess(data.data.response.data));
  } else {
    yield put(fetchAnalysisPersonasActiveViewersError(data.err));
  }
}

export function* fetchAnalysis() {
  yield [
    call(fetchAnalysisActiveViewers),
    call(fetchAnalysisChurn),
    call(fetchAnalysisAverageAmount),
    call(fetchAnalysisAverageViewTime),
    call(fetchAnalysisPersonasActiveViewers),
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
