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
  FETCH_ANALYSIS_AVERAGEVIEWTIME_START,
  FETCH_ANALYSIS_AVERAGEVIEWTIME_SUCCESS,
  FETCH_ANALYSIS_AVERAGEVIEWTIME_ERROR,
  FETCH_ANALYSIS_PERSONAS_ACTIVEVIEWERS_START,
  FETCH_ANALYSIS_PERSONAS_ACTIVEVIEWERS_SUCCESS,
  FETCH_ANALYSIS_PERSONAS_ACTIVEVIEWERS_ERROR,
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

/*
 Average View Time Action
 */
export function fetchAnalysisAverageViewTimeStart() {
  return {
    type: FETCH_ANALYSIS_AVERAGEVIEWTIME_START,
  };
}

export function fetchAnalysisAverageViewTimeSuccess(data) {
  return {
    type: FETCH_ANALYSIS_AVERAGEVIEWTIME_SUCCESS,
    data,
  };
}

export function fetchAnalysisAverageViewTimeError(error) {
  return {
    type: FETCH_ANALYSIS_AVERAGEVIEWTIME_ERROR,
    error,
  };
}

/*
 Personas Active Viewers Action
 */
export function fetchAnalysisPersonasActiveViewersStart() {
  return {
    type: FETCH_ANALYSIS_PERSONAS_ACTIVEVIEWERS_START,
  };
}

export function fetchAnalysisPersonasActiveViewersSuccess(data) {
  return {
    type: FETCH_ANALYSIS_PERSONAS_ACTIVEVIEWERS_SUCCESS,
    data,
  };
}

export function fetchAnalysisPersonasActiveViewersError(error) {
  return {
    type: FETCH_ANALYSIS_PERSONAS_ACTIVEVIEWERS_ERROR,
    error,
  };
}
