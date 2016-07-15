import { createSelector } from 'reselect';

/**
 * Direct selector to the userInsightPage state domain
 */
const selectUserInsight = () => state => state.get('userInsightPage');

/**
 * Other specific selectors
 */
const selectContentViews = () => createSelector(
  selectUserInsight(),
  (userInsightState) => userInsightState.get('contentViews')
);

const selectTopMovies = () => createSelector(
  selectUserInsight(),
  (userInsightState) => userInsightState.get('topMovies')
);

const selectTimeGenres = () => createSelector(
  selectUserInsight(),
  (userInsightState) => userInsightState.get('timeGenres')
);

const selectTopPurchasedMovies = () => createSelector(
  selectUserInsight(),
  (userInsightState) => userInsightState.get('topPurchasedMovies')
);

const selectTimeTransactions = () => createSelector(
  selectUserInsight(),
  (userInsightState) => userInsightState.get('timeTransactions')
);

const selectCompleteness = () => createSelector(
  selectUserInsight(),
  (userInsightState) => userInsightState.get('completeness')
);

const selectAverageInteractions = () => createSelector(
  selectUserInsight(),
  (userInsightState) => userInsightState.get('averageInteractions')
);


/**
 * Default selector used by UserInsightPage
 */

const selectUserInsightPage = () => createSelector(
  selectUserInsight(),
  (userInsightState) => userInsightState.toJS()
);

export default selectUserInsightPage;
export {
  selectUserInsight,
  selectContentViews,
  selectTopMovies,
  selectTimeGenres,
  selectTopPurchasedMovies,
  selectTimeTransactions,
  selectCompleteness,
  selectAverageInteractions,
};
