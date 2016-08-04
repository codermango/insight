/*
 *
 * AnalysisPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  FETCH_DASHBOARD_DATA_START,
  FETCH_DASHBOARD_DATA_SUCCESS,
  FETCH_DASHBOARD_DATA_ERROR,
} from './constants';

const initialState = fromJS({
  dashboardData: fromJS({
    loading: false,
    data: false,
    error: false,
  }),
});

function analysisPageReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_DASHBOARD_DATA_START:
      return state
        .setIn(['dashboardData', 'loading'], true)
        .setIn(['dashboardData', 'error'], false);
    case FETCH_DASHBOARD_DATA_SUCCESS:
      return state
        .setIn(['dashboardData', 'loading'], false)
        .setIn(['dashboardData', 'error'], false)
        .setIn(['dashboardData', 'data'], action.data);
    case FETCH_DASHBOARD_DATA_ERROR:
      return state
        .setIn(['dashboardData', 'loading'], false)
        .setIn(['dashboardData', 'error'], action.error);
    default:
      return state;
  }
}

export default analysisPageReducer;
