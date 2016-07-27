/*
 *
 * AnalysisPage actions
 *
 */

import {
  FETCH_ANALYSIS,
  FETCH_ANALYSIS_ACTIVEVIEWERS_START,
  FETCH_ANALYSIS_ACTIVEVIEWERS_SUCCESS,
  FETCH_ANALYSIS_ACTIVEVIEWERS_ERROR,
  FETCH_ANALYSIS_CHURN_START,
  FETCH_ANALYSIS_CHURN_SUCCESS,
  FETCH_ANALYSIS_CHURN_ERROR,
  FETCH_ANALYSIS_AVERAGEAMOUNT_START,
  FETCH_ANALYSIS_AVERAGEAMOUNT_SUCCESS,
  FETCH_ANALYSIS_AVERAGEAMOUNT_ERROR,
} from './constants';

export function fetchAnalysis() {
  return {
    type: FETCH_ANALYSIS,
  };
}

/*
Active Viewers Action
 */
export function fetchAnalysisActiveViewersStart() {
  return {
    type: FETCH_ANALYSIS_ACTIVEVIEWERS_START,
  };
}

export function fetchAnalysisActiveViewersSuccess(data) {
  return {
    type: FETCH_ANALYSIS_ACTIVEVIEWERS_SUCCESS,
    data,
  };
}

export function fetchAnalysisActiveViewersError(error) {
  return {
    type: FETCH_ANALYSIS_ACTIVEVIEWERS_ERROR,
    error,
  };
}

/*
 Churn Action
 */
export function fetchAnalysisChurnStart() {
  return {
    type: FETCH_ANALYSIS_CHURN_START,
  };
}

export function fetchAnalysisChurnSuccess(data) {
  return {
    type: FETCH_ANALYSIS_CHURN_SUCCESS,
    data,
  };
}

export function fetchAnalysisChurnError(error) {
  return {
    type: FETCH_ANALYSIS_CHURN_ERROR,
    error,
  };
}

/*
 Average Amount Action
 */
export function fetchAnalysisAverageAmountStart() {
  return {
    type: FETCH_ANALYSIS_AVERAGEAMOUNT_START,
  };
}

export function fetchAnalysisAverageAmountSuccess(data) {
  return {
    type: FETCH_ANALYSIS_AVERAGEAMOUNT_SUCCESS,
    data,
  };
}

export function fetchAnalysisAverageAmountError(error) {
  return {
    type: FETCH_ANALYSIS_AVERAGEAMOUNT_ERROR,
    error,
  };
}
