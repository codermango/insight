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

const selectLoading = () => createSelector(
  selectUserInsight(),
  (userInsightState) => userInsightState.get('loading')
);

const selectError = () => createSelector(
  selectUserInsight(),
  (userInsightState) => userInsightState.get('error')
);

const selectTopMovies = () => createSelector(
  selectUserInsight(),
  (userInsightState) => userInsightState.get('topMovies')
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
  selectLoading,
  selectError,
  selectTopMovies,
};
