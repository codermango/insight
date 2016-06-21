import { take, call, put, fork, cancel } from 'redux-saga/effects';
import request from 'utils/request';

import { LOCATION_CHANGE } from 'react-router-redux';
import { FETCH_CONTENT_VIEWS } from './constants';
import { fetchContentViewsSuccess, fetchContentViewsError } from './actions';


/**
 * Content-Views request/response handler
 */
export function* fetchContentViews() {
  const requestURL = '/api/movies/';

  // Call our request helper (see 'utils/request')
  const views = yield call(request, requestURL);

  if (!views.err) {
    yield put(fetchContentViewsSuccess(views.data.response.data));
  } else {
    yield put(fetchContentViewsError(views.err));
  }
}

/**
 * Watches for LOAD_REPOS action and calls handler
 */
export function* fetchInsightWatcher() {
  while (yield take(FETCH_CONTENT_VIEWS)) {
    yield call(fetchContentViews);
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
