/*
 *
 * UserInsightMovies actions
 *
 */

import {
  FETCH_USER_INSIGHT_MOVIES,
  FETCH_CONTENT_VIEWS_START,
  FETCH_CONTENT_VIEWS_SUCCESS,
  FETCH_CONTENT_VIEWS_ERROR,
  FETCH_TOP_MOVIES_START,
  FETCH_TOP_MOVIES_SUCCESS,
  FETCH_TOP_MOVIES_ERROR,
} from './constants';

export function fetchUserInsightMovies() {
  return {
    type: FETCH_USER_INSIGHT_MOVIES,
  };
}

/*
 *
 * ContentViews actions
 *
 */
export function fetchContentViews() {
  return {
    type: FETCH_CONTENT_VIEWS_START,
  };
}

export function fetchContentViewsSuccess(data) {
  return {
    type: FETCH_CONTENT_VIEWS_SUCCESS,
    data,
  };
}

export function fetchContentViewsError(error) {
  return {
    type: FETCH_CONTENT_VIEWS_ERROR,
    error,
  };
}

/*
 *
 * TopMovies actions
 *
 */
export function fetchTopMovies() {
  return {
    type: FETCH_TOP_MOVIES_START,
  };
}

export function fetchTopMoviesSuccess(data) {
  return {
    type: FETCH_TOP_MOVIES_SUCCESS,
    data,
  };
}

export function fetchTopMoviesError(error) {
  return {
    type: FETCH_TOP_MOVIES_ERROR,
    error,
  };
}
