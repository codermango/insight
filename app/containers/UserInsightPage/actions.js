/*
 *
 * UserInsightPage actions
 *
 */

import {
  FETCH_CONTENT_VIEWS,
  FETCH_CONTENT_VIEWS_SUCCESS,
  FETCH_CONTENT_VIEWS_ERROR,
} from './constants';

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
