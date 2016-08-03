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
import {
  FETCH_USER_INSIGHT_GENRES,
  FETCH_TIME_GENRES_SUCCESS,
  FETCH_TIME_GENRES_ERROR,
} from 'containers/UserInsightGenres/constants';
import {
  FETCH_USER_INSIGHT_TRANSACTIONS,
  FETCH_TIME_TRANSACTIONS_SUCCESS,
  FETCH_TIME_TRANSACTIONS_ERROR,
} from 'containers/UserInsightTransactions/constants';
import {
  FETCH_COMPLETENESS_START,
  FETCH_COMPLETENESS_SUCCESS,
  FETCH_COMPLETENESS_ERROR,
  FETCH_AVERAGE_INTERACTIONS_START,
  FETCH_AVERAGE_INTERACTIONS_SUCCESS,
  FETCH_AVERAGE_INTERACTIONS_ERROR,
} from 'containers/UserInsightInteractions/constants';


const initialState = fromJS({
  dateRange: false,
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
  timeGenres: fromJS({
    loading: false,
    data: false,
    error: false,
  }),
  completeness: fromJS({
    loading: false,
    data: false,
    error: false,
  }),

  timeTransactions: fromJS({
    loading: false,
    data: false,
    error: false,
  }),
  averageInteractions: fromJS({
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
    case FETCH_USER_INSIGHT_GENRES:
      return state
        .set('dateRange', action.dateRange)
        .setIn(['timeGenres', 'loading'], true)
        .setIn(['timeGenres', 'error'], false);
    case FETCH_TIME_GENRES_SUCCESS:
      return state
        .setIn(['timeGenres', 'loading'], false)
        .setIn(['timeGenres', 'data'], action.data)
        .setIn(['timeGenres', 'error'], false);
    case FETCH_TIME_GENRES_ERROR:
      return state
        .setIn(['timeGenres', 'loading'], false)
        .setIn(['timeGenres', 'error'], action.error);
    case FETCH_USER_INSIGHT_TRANSACTIONS:
      return state
        .setIn(['timeTransactions', 'loading'], true)
        .setIn(['timeTransactions', 'error'], false);
    case FETCH_TIME_TRANSACTIONS_SUCCESS:
      return state
        .setIn(['timeTransactions', 'loading'], false)
        .setIn(['timeTransactions', 'data'], action.data)
        .setIn(['timeTransactions', 'error'], false);
    case FETCH_TIME_TRANSACTIONS_ERROR:
      return state
        .setIn(['timeTransactions', 'loading'], false)
        .setIn(['timeTransactions', 'error'], action.error);

    case FETCH_COMPLETENESS_START:
      return state
        .setIn(['completeness', 'loading'], true)
        .setIn(['completeness', 'error'], false);
    case FETCH_COMPLETENESS_SUCCESS:
      return state
        .setIn(['completeness', 'loading'], false)
        .setIn(['completeness', 'data'], action.data)
        .setIn(['completeness', 'error'], false);
    case FETCH_COMPLETENESS_ERROR:
      return state
        .setIn(['completeness', 'loading'], false)
        .setIn(['completeness', 'error'], action.error);
    case FETCH_AVERAGE_INTERACTIONS_START:
      return state
        .setIn(['averageInteractions', 'loading'], true)
        .setIn(['averageInteractions', 'error'], false);
    case FETCH_AVERAGE_INTERACTIONS_SUCCESS:
      return state
        .setIn(['averageInteractions', 'loading'], false)
        .setIn(['averageInteractions', 'data'], action.data)
        .setIn(['averageInteractions', 'error'], false);
    case FETCH_AVERAGE_INTERACTIONS_ERROR:
      return state
        .setIn(['averageInteractions', 'loading'], false)
        .setIn(['averageInteractions', 'error'], action.error);
    default:
      return state;
  }
}

export default userInsightPageReducer;
