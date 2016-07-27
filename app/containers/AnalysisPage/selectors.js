import { createSelector } from 'reselect';

/**
 * Direct selector to the analysisPage state domain
 */
const selectAnalysisPageDomain = () => state => state.get('analysisPage');


/**
 * Other specific selectors
 */
const selectActiveViewers = () => createSelector(
  selectAnalysisPageDomain(),
  (analysisState) => analysisState.get('activeViewers')
);

const selectChurn = () => createSelector(
  selectAnalysisPageDomain(),
  (analysisState) => analysisState.get('churn')
);

const selectAverageAmount = () => createSelector(
  selectAnalysisPageDomain(),
  (analysisState) => analysisState.get('averageAmount')
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
  selectActiveViewers,
  selectChurn,
  selectAverageAmount,
};
