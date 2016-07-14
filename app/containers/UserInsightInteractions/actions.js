/*
 *
 * UserInsightInteractions actions
 *
 */

import {
  FETCH_USER_INSIGHT_INTERACTIONS,
  FETCH_COMPLETENESS_START,
  FETCH_COMPLETENESS_SUCCESS,
  FETCH_COMPLETENESS_ERROR,
} from './constants';

export function fetchUserInsightInteractions() {
  return {
    type: FETCH_USER_INSIGHT_INTERACTIONS,
  };
}

export function fetchCompletenessStart() {
  return {
    type: FETCH_COMPLETENESS_START,
  };
}

export function fetchCompletenessSuccess(data) {
  return {
    type: FETCH_COMPLETENESS_SUCCESS,
    data,
  };
}

export function fetchCompletenessError(error) {
  return {
    type: FETCH_COMPLETENESS_ERROR,
    error,
  };
}
