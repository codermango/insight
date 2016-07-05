import { take, call, put, cancel, fork } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import request from 'utils/request';

import { FETCH_USER_INSIGHT_GENRES } from './constants';
import { fetchTimeGenresSuccess, fetchTimeGenresError } from './actions';

const apiURL = '/api/genres/';

export function* fetchTimeGenres() {
  const genres = yield call(request, `${apiURL}time`);

  if (!genres.err) {
    yield put(fetchTimeGenresSuccess(genres.data.response.data));
  } else {
    yield put(fetchTimeGenresError(genres.err));
  }
}

export function* fetchUserInsightGenres() {
  yield [
    call(fetchTimeGenres),
  ];
}

export function* fetchInsightWatcher() {
  while (yield take(FETCH_USER_INSIGHT_GENRES)) {
    yield call(fetchUserInsightGenres);
  }
}

export function* userInsightGenresData() {
  const watcher = yield fork(fetchInsightWatcher);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export default [
  userInsightGenresData,
];
