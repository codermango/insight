/*
 *
 * AnalysisPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  FETCH_ANALYSIS,
  FETCH_ANALYSIS_ACTIVEVIEWERS_SUCCESS,
  FETCH_ANALYSIS_ACTIVEVIEWERS_ERROR,
  FETCH_ANALYSIS_CHURN_SUCCESS,
  FETCH_ANALYSIS_CHURN_ERROR,
} from './constants';

const initialState = fromJS({
  activeViewers: {
    loading: false,
    data: false,
    error: false,
  },
  churn: {
    loading: false,
    data: false,
    error: false,
  },
});

function analysisPageReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ANALYSIS:
      return state
        .setIn(['activeViewers', 'loading'], true)
        .setIn(['activeViewers', 'error'], false)
        .setIn(['churn', 'loading'], true)
        .setIn(['churn', 'error'], false);

    case FETCH_ANALYSIS_ACTIVEVIEWERS_SUCCESS:
      return state
        .setIn(['activeViewers', 'loading'], false)
        .setIn(['activeViewers', 'data'], action.data)
        .setIn(['activeViewers', 'error'], false);
    case FETCH_ANALYSIS_CHURN_SUCCESS:
      return state
        .setIn(['churn', 'loading'], false)
        .setIn(['churn', 'data'], action.data)
        .setIn(['churn', 'error'], false);
    case FETCH_ANALYSIS_ACTIVEVIEWERS_ERROR:
      return state
        .setIn(['activeViewers', 'loading'], false)
        .setIn(['activeViewers', 'error'], action.error);
    case FETCH_ANALYSIS_CHURN_ERROR:
      return state
        .setIn(['churn', 'loading'], false)
        .setIn(['churn', 'error'], action.error);
    default:
      return state;
  }
}

export default analysisPageReducer;
