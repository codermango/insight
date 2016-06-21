/**
 * Test  sagas
 */

import expect from 'expect';
import { take, call, put, fork, cancel } from 'redux-saga/effects';
import { fetchContentViews, fetchInsightWatcher, userInsightData } from '../sagas';
import request from 'utils/request';

import { LOCATION_CHANGE } from 'react-router-redux';
import { FETCH_CONTENT_VIEWS } from '../constants';
import { fetchContentViewsSuccess, fetchContentViewsError } from '../actions';


describe('fetchContentViews Saga', () => {
  let contentViewsGenerator;

  beforeEach(() => {
    contentViewsGenerator = fetchContentViews();

    const requestURL = '/api/movies/';
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

  it('should watch for FETCH_CONTENT_VIEWS action', () => {
    const takeDescriptor = fetchInsightWatcherGenerator.next().value;
    expect(takeDescriptor).toEqual(take(FETCH_CONTENT_VIEWS));
  });

  it('should invoke fetchContentViews saga on actions', () => {
    const callDescriptor = fetchInsightWatcherGenerator.next(put(FETCH_CONTENT_VIEWS)).value;
    expect(callDescriptor).toEqual(call(fetchContentViews));
  });
});

describe('userInsightDataSaga Saga', () => {
  const userInsightDataSaga = userInsightData();

  let forkDescriptor;

  it('should asyncronously fork fetchInsightWatcher saga', () => {
    forkDescriptor = userInsightDataSaga.next();
    expect(forkDescriptor.value).toEqual(fork(fetchInsightWatcher));
  });

  it('should yield until LOCATION_CHANGE action', () => {
    const takeDescriptor = userInsightDataSaga.next();
    expect(takeDescriptor.value).toEqual(take(LOCATION_CHANGE));
  });

  it('should finally cancel() the forked fetchInsightWatcher saga',
    function* fetchInsightSagaCancellable() {
      // reuse open fork for more integrated approach
      forkDescriptor = userInsightDataSaga.next(put(LOCATION_CHANGE));
      expect(forkDescriptor.value).toEqual(cancel(forkDescriptor));
    }
  );
});
