/*
 *
 * UserInsightPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  FETCH_CONTENT_VIEWS_START,
  FETCH_CONTENT_VIEWS_SUCCESS,
  FETCH_CONTENT_VIEWS_ERROR,
  FETCH_TOP_MOVIES_START,
  FETCH_TOP_MOVIES_SUCCESS,
  FETCH_TOP_MOVIES_ERROR,
} from 'containers/UserInsightMovies/constants';

const initialState = fromJS({
  contentViews: fromJS({
    loading: false,
    data: false,
    error: false,
  }),
  topMovies: fromJS({
    loading: false,
    data: false,
    error: false,
  }),
});

function userInsightPageReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CONTENT_VIEWS_START:
      return state
        .setIn(['contentViews', 'loading'], true)
        .setIn(['contentViews', 'error'], false);
    case FETCH_CONTENT_VIEWS_SUCCESS:
      return state
        .setIn(['contentViews', 'loading'], false)
        .setIn(['contentViews', 'error'], false)
        .setIn(['contentViews', 'data'], action.data);
    case FETCH_CONTENT_VIEWS_ERROR:
      return state
        .setIn(['contentViews', 'loading'], false)
        .setIn(['contentViews', 'error'], action.error);
    case FETCH_TOP_MOVIES_START:
      return state
        .setIn(['topMovies', 'loading'], true)
        .setIn(['topMovies', 'error'], false);
    case FETCH_TOP_MOVIES_SUCCESS:
      return state
        .setIn(['topMovies', 'loading'], false)
        .setIn(['topMovies', 'data'], action.data)
        .setIn(['topMovies', 'error'], false);
    case FETCH_TOP_MOVIES_ERROR:
      return state
        .setIn(['topMovies', 'loading'], false)
        .setIn(['topMovies', 'error'], action.error);
    default:
      return state;
  }
}

export default userInsightPageReducer;
