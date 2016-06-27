/*
 *
 * UserInsightPage actions
 *
 */

import {
  FETCH_USER_INSIGHT,
  FETCH_CONTENT_VIEWS,
  FETCH_CONTENT_VIEWS_SUCCESS,
  FETCH_CONTENT_VIEWS_ERROR,
  FETCH_TOP_MOVIES,
  FETCH_TOP_MOVIES_SUCCESS,
  FETCH_TOP_MOVIES_ERROR,
} from './constants';

export function fetchUserInsight() {
  return {
    type: FETCH_USER_INSIGHT,
  };
}

/*
 *
 * ContentViews actions
 *
 */
export function fetchContentViews() {
  return {
    type: FETCH_CONTENT_VIEWS,
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
    type: FETCH_TOP_MOVIES,
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
