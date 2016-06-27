/*
 *
 * UserInsightPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  FETCH_CONTENT_VIEWS,
  FETCH_CONTENT_VIEWS_SUCCESS,
  FETCH_CONTENT_VIEWS_ERROR,
  FETCH_TOP_MOVIES_SUCCESS,
} from './constants';

const initialState = fromJS({
  loading: false,
  contentViews: false,
  error: false,
  topMovies: false,
});

function userInsightPageReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CONTENT_VIEWS:
      return state
        .set('loading', true)
        .set('error', false)
        .set('contentViews', false);
    case FETCH_CONTENT_VIEWS_SUCCESS:
      return state
        .set('loading', false)
        .set('error', false)
        .set('contentViews', action.data);
    case FETCH_CONTENT_VIEWS_ERROR:
      return state
        .set('loading', false)
        .set('error', action.error)
        .set('contentViews', false);
    case FETCH_TOP_MOVIES_SUCCESS:
      return state.set('topMovies', action.data);
    default:
      return state;
  }
}

export default userInsightPageReducer;
