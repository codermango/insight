import { take, call, put, fork, cancel } from 'redux-saga/effects';
import request from 'utils/request';

import { LOCATION_CHANGE } from 'react-router-redux';
import { FETCH_USER_INSIGHT } from './constants';
import { fetchContentViewsSuccess, fetchContentViewsError, fetchTopMoviesSuccess } from './actions';

const apiURL = '/api/movies/';

/**
 * Content-Views handler
 */
export function* fetchContentViews() {
  const views = yield call(request, `${apiURL}contentviews`);

  if (!views.err) {
    yield put(fetchContentViewsSuccess(views.data.response.data));
  } else {
    yield put(fetchContentViewsError(views.err));
  }
}

/**
 * Top-movies handler
 */
export function* fetchTopMovies() {
  const topMovies = yield call(request, `${apiURL}topmovies`);

  if (!topMovies.err) {
    yield put(fetchTopMoviesSuccess(topMovies.data.response.data));
  }
}

export function* fetchUserInsight() {
  yield [
    call(fetchContentViews),
    call(fetchTopMovies),
  ];
}

export function* fetchInsightWatcher() {
  while (yield take(FETCH_USER_INSIGHT)) {
    yield call(fetchUserInsight);
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* userInsightData() {
  // Fork watcher so we can continue execution
  const watcher = yield fork(fetchInsightWatcher);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Bootstrap sagas
export default [
  userInsightData,
];
