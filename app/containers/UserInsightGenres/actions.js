import {
  FETCH_USER_INSIGHT_GENRES,
  FETCH_TIME_GENRES_START,
  FETCH_TIME_GENRES_SUCCESS,
  FETCH_TIME_GENRES_ERROR,
} from './constants';

export function fetchUserInsightGenres(dateRange) {
  return {
    type: FETCH_USER_INSIGHT_GENRES,
    dateRange,
  };
}

export function fetchTimeGenresStart() {
  return {
    type: FETCH_TIME_GENRES_START,
  };
}

export function fetchTimeGenresSuccess(data) {
  return {
    type: FETCH_TIME_GENRES_SUCCESS,
    data,
  };
}

export function fetchTimeGenresError(error) {
  return {
    type: FETCH_TIME_GENRES_ERROR,
    error,
  };
}
