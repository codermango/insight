import { createSelector } from 'reselect';

/**
 * Direct selector to the userInsightPage state domain
 */
const selectUserInsightPageDomain = () => state => state.get('userInsightPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by UserInsightPage
 */

const selectUserInsightPage = () => createSelector(
  selectUserInsightPageDomain(),
  (substate) => substate.toJS()
);

export default selectUserInsightPage;
export {
  selectUserInsightPageDomain,
};
