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
  FETCH_AVERAGE_INTERACTIONS_START,
  FETCH_AVERAGE_INTERACTIONS_SUCCESS,
  FETCH_AVERAGE_INTERACTIONS_ERROR,
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

export function fetchAverageInteractionsStart() {
  return {
    type: FETCH_AVERAGE_INTERACTIONS_START,
  };
}

export function fetchAverageInteractionsSuccess(data) {
  return {
    type: FETCH_AVERAGE_INTERACTIONS_SUCCESS,
    data,
  };
}

export function fetchAverageInteractionsError(error) {
  return {
    type: FETCH_AVERAGE_INTERACTIONS_ERROR,
    error,
  };
}
