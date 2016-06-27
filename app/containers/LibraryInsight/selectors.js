import { createSelector } from 'reselect';

/**
 * Direct selector to the libraryInsight state domain
 */
const selectLibraryInsightDomain = () => state => state.get('libraryInsight');

/**
 * Other specific selectors
 */


/**
 * Default selector used by LibraryInsight
 */

const selectLibraryInsight = () => createSelector(
  selectLibraryInsightDomain(),
  (substate) => substate.toJS()
);

export default selectLibraryInsight;
export {
  selectLibraryInsightDomain,
};
