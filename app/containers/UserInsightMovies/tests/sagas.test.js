/**
 * Test  sagas
 */

import expect from 'expect';
import { take, call, put, fork } from 'redux-saga/effects';
import { fetchUserInsightMovies, fetchContentViews, fetchInsightWatcher, userInsightMoviesData } from '../sagas';
import request from 'utils/request';

import { FETCH_USER_INSIGHT_MOVIES } from '../constants';
import { fetchContentViewsSuccess, fetchContentViewsError } from '../actions';


describe('fetchContentViews Saga', () => {
  let contentViewsGenerator;

  beforeEach(() => {
    contentViewsGenerator = fetchContentViews();

    const requestURL = '/api/movies/contentviews';
    const callDescriptor = contentViewsGenerator.next().value;
    expect(callDescriptor).toEqual(call(request, requestURL));
  });

  it('should dispatch the fetchContentViewsSuccess action if it requests the data successfully', () => {
    const response = {
      data: {
        response: {
          data: [
            {
              x: 1,
              y: 1,
              label: 1,
            },
          ],
        },
      },
    };
    const putDescriptor = contentViewsGenerator.next(response).value;
    expect(putDescriptor).toEqual(put(fetchContentViewsSuccess(response.data.response.data)));
  });

  it('should call the fetchContentViewsError action if the response errors', () => {
    const response = {
      err: 'Some error',
    };
    const putDescriptor = contentViewsGenerator.next(response).value;
    expect(putDescriptor).toEqual(put(fetchContentViewsError(response.err)));
  });
});

describe('fetchInsightWatcher Saga', () => {
  const fetchInsightWatcherGenerator = fetchInsightWatcher();

  it('should watch for FETCH_USER_INSIGHT_MOVIES action', () => {
    const takeDescriptor = fetchInsightWatcherGenerator.next().value;
    expect(takeDescriptor).toEqual(take(FETCH_USER_INSIGHT_MOVIES));
  });

  it('should invoke fetchUserInsightMovies saga on actions', () => {
    const callDescriptor = fetchInsightWatcherGenerator.next(put(FETCH_USER_INSIGHT_MOVIES)).value;
    expect(callDescriptor).toEqual(call(fetchUserInsightMovies));
  });
});

describe('userInsightMoviesDataSaga Saga', () => {
  const userInsightMoviesDataSaga = userInsightMoviesData();

  let forkDescriptor;

  it('should asyncronously fork fetchInsightWatcher saga', () => {
    forkDescriptor = userInsightMoviesDataSaga.next();
    expect(forkDescriptor.value).toEqual(fork(fetchInsightWatcher));
  });
});
