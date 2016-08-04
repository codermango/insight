/*
 *
 * AnalysisPage actions
 *
 */

import {
  FETCH_DASHBOARD,
  FETCH_DASHBOARD_DATA_START,
  FETCH_DASHBOARD_DATA_SUCCESS,
  FETCH_DASHBOARD_DATA_ERROR,
} from './constants';

export function fetchDashboard() {
  return {
    type: FETCH_DASHBOARD,
  };
}

/*
Dashboard Data
 */
export function fetchDashboardDataStart() {
  return {
    type: FETCH_DASHBOARD_DATA_START,
  };
}

export function fetchDashboardDataSuccess(data) {
  return {
    type: FETCH_DASHBOARD_DATA_SUCCESS,
    data,
  };
}

export function fetchDashboardDataError(error) {
  return {
    type: FETCH_DASHBOARD_DATA_ERROR,
    error,
  };
}
