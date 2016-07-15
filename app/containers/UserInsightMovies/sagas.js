import { take, call, put, cancel, fork } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import request from 'utils/request';

import { FETCH_USER_INSIGHT_MOVIES } from './constants';
import {
  fetchTopPurchasedMoviesSuccess,
  fetchContentViewsStart,
  fetchContentViewsSuccess,
  fetchContentViewsError,
  fetchTopMoviesStart,
  fetchTopMoviesSuccess,
} from './actions';

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

export function* fetchTopPurchasedMovies() {
  const topMovies = yield call(request, `${apiURL}toppurchasedmovies`);

  if (!topMovies.err) {
    yield put(fetchTopPurchasedMoviesSuccess(topMovies.data.response.data));
  }
}

export function* fetchUserInsightMovies() {
  yield [
    put(fetchContentViewsStart()),
    put(fetchTopMoviesStart()),
    call(fetchContentViews),
    call(fetchTopMovies),
    call(fetchTopPurchasedMovies),
  ];
}

export function* fetchInsightWatcher() {
  while (yield take(FETCH_USER_INSIGHT_MOVIES)) {
    yield call(fetchUserInsightMovies);
  }
}

// Individual exports for testing
export function* userInsightMoviesData() {
  const watcher = yield fork(fetchInsightWatcher);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// All sagas to be loaded
export default [
  userInsightMoviesData,
];
