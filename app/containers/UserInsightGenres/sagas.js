import { take, call, put, cancel, fork, select } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import request from 'utils/request';

import { FETCH_USER_INSIGHT_GENRES } from './constants';
import { fetchTimeGenresSuccess, fetchTimeGenresError } from './actions';
import { selectDateRange } from 'containers/UserInsightPage/selectors';

const apiURL = '/api/genres/';

export function* fetchTimeGenres() {
  const dateRange = yield select(selectDateRange());
  const genres = yield call(request, `${apiURL}time?startDate=${dateRange.startDate}&endDate=${dateRange.endDate}`);

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
