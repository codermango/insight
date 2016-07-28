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
  FETCH_ANALYSIS_AVERAGEAMOUNT_SUCCESS,
  FETCH_ANALYSIS_AVERAGEAMOUNT_ERROR,
  FETCH_ANALYSIS_AVERAGEVIEWTIME_SUCCESS,
  FETCH_ANALYSIS_AVERAGEVIEWTIME_ERROR,
  FETCH_ANALYSIS_PERSONAS_ACTIVEVIEWERS_SUCCESS,
  FETCH_ANALYSIS_PERSONAS_ACTIVEVIEWERS_ERROR,
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
  averageAmount: {
    loading: false,
    data: false,
    error: false,
  },
  averageViewTime: {
    loading: false,
    data: false,
    error: false,
  },
  personasActiveViewers: {
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
        .setIn(['churn', 'error'], false)
        .setIn(['averageAmount', 'loading'], true)
        .setIn(['averageAmount', 'error'], false)
        .setIn(['averageViewTime', 'loading'], true)
        .setIn(['averageViewTime', 'error'], false)
        .setIn(['personasActiveViewers', 'loading'], true)
        .setIn(['personasActiveViewers', 'error'], false);
    case FETCH_ANALYSIS_ACTIVEVIEWERS_SUCCESS:
      return state
        .setIn(['activeViewers', 'loading'], false)
        .setIn(['activeViewers', 'data'], action.data)
        .setIn(['activeViewers', 'error'], false);
    case FETCH_ANALYSIS_ACTIVEVIEWERS_ERROR:
      return state
        .setIn(['activeViewers', 'loading'], false)
        .setIn(['activeViewers', 'error'], action.error);
    case FETCH_ANALYSIS_CHURN_SUCCESS:
      return state
        .setIn(['churn', 'loading'], false)
        .setIn(['churn', 'data'], action.data)
        .setIn(['churn', 'error'], false);
    case FETCH_ANALYSIS_CHURN_ERROR:
      return state
        .setIn(['churn', 'loading'], false)
        .setIn(['churn', 'error'], action.error);
    case FETCH_ANALYSIS_AVERAGEAMOUNT_SUCCESS:
      return state
        .setIn(['averageAmount', 'loading'], false)
        .setIn(['averageAmount', 'data'], action.data)
        .setIn(['averageAmount', 'error'], false);
    case FETCH_ANALYSIS_AVERAGEAMOUNT_ERROR:
      return state
        .setIn(['averageAmount', 'loading'], false)
        .setIn(['averageAmount', 'error'], action.error);
    case FETCH_ANALYSIS_AVERAGEVIEWTIME_SUCCESS:
      return state
        .setIn(['averageViewTime', 'loading'], false)
        .setIn(['averageViewTime', 'data'], action.data)
        .setIn(['averageViewTime', 'error'], false);
    case FETCH_ANALYSIS_AVERAGEVIEWTIME_ERROR:
      return state
        .setIn(['averageViewTime', 'loading'], false)
        .setIn(['averageViewTime', 'error'], action.error);
    case FETCH_ANALYSIS_PERSONAS_ACTIVEVIEWERS_SUCCESS:
      return state
        .setIn(['personasActiveViewers', 'loading'], false)
        .setIn(['personasActiveViewers', 'data'], action.data)
        .setIn(['personasActiveViewers', 'error'], false);
    case FETCH_ANALYSIS_PERSONAS_ACTIVEVIEWERS_ERROR:
      return state
        .setIn(['personasActiveViewers', 'loading'], false)
        .setIn(['personasActiveViewers', 'error'], action.error);
    default:
      return state;
  }
}

export default analysisPageReducer;
