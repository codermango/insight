import { take, call, put, fork } from 'redux-saga/effects';
import request from 'utils/request';

import { FETCH_USER_INSIGHT_MOVIES } from './constants';
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

export function* fetchUserInsightMovies() {
  yield [
    call(fetchContentViews),
    call(fetchTopMovies),
  ];
}

export function* fetchInsightWatcher() {
  while (yield take(FETCH_USER_INSIGHT_MOVIES)) {
    yield call(fetchUserInsightMovies);
  }
}

// Individual exports for testing
export function* userInsightMoviesData() {
  yield fork(fetchInsightWatcher);
}

// All sagas to be loaded
export default [
  userInsightMoviesData,
];
