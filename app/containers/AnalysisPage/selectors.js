import { createSelector } from 'reselect';

/**
 * Direct selector to the analysisPage state domain
 */
const selectAnalysisPageDomain = () => state => state.get('analysisPage');


/**
 * Other specific selectors
 */
const selectDashboardData = () => createSelector(
  selectAnalysisPageDomain(),
  (state) => state.get('dashboardData')
);

/**
 * Default selector used by AnalysisPage
 */

const selectAnalysisPage = () => createSelector(
  selectAnalysisPageDomain(),
  (analysisState) => analysisState.toJS()
);

export default selectAnalysisPage;
export {
  selectAnalysisPageDomain,
  selectDashboardData,
};
