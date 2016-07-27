/**
 * Test  sagas
 */

import expect from 'expect';
import { take, call, put, fork } from 'redux-saga/effects';
import { fetchAnalysis, fetchAnalysisActiveViewers, analysisData, fetchAnalysisWatcher } from '../sagas';
import request from 'utils/request';

import { FETCH_ANALYSIS } from '../constants';
import { fetchAnalysisActiveViewersSuccess, fetchAnalysisActiveViewersError } from '../actions';


describe('fetchAnalysisActiveViewers Saga', () => {
  let activeViewersGenerator;
  beforeEach(() => {
    activeViewersGenerator = fetchAnalysisActiveViewers();

    const requestURL = '/api/analysis/activeviewers';
    const callDescriptor = activeViewersGenerator.next().value;
    expect(callDescriptor).toEqual(call(request, requestURL));
  });

  it('should dispatch the fetchAnalysisActiveViewersSuccess action if it requests the data successfully', () => {
    const response = {
      data: {
        response: {
          data: [
            {
              pre_value: 67250,
              cur_value: 60890,
              change_rate: -9.46,
            },
          ],
        },
      },
    };
    const putDescriptor = activeViewersGenerator.next(response).value;
    expect(putDescriptor).toEqual(put(fetchAnalysisActiveViewersSuccess(response.data.response.data)));
  });

  it('should call the fetchAnalysisActiveViewersError action if the response errors', () => {
    const response = {
      err: 'Some error',
    };
    const putDescriptor = activeViewersGenerator.next(response).value;
    expect(putDescriptor).toEqual(put(fetchAnalysisActiveViewersError(response.err)));
  });
});


describe('fetchAnalysisWatcher Saga', () => {
  const fetchAnalysisWatcherGenerator = fetchAnalysisWatcher();

  it('should watch for FETCH_ANALYSIS action', () => {
    const takeDescriptor = fetchAnalysisWatcherGenerator.next().value;
    expect(takeDescriptor).toEqual(take(FETCH_ANALYSIS));
  });

  it('should invoke fetchAnalysis saga on actions', () => {
    const callDescriptor = fetchAnalysisWatcherGenerator.next(put(FETCH_ANALYSIS)).value;
    expect(callDescriptor).toEqual(call(fetchAnalysis));
  });
});


describe('analysisData Saga', () => {
  const analysisDataSaga = analysisData();

  let forkDescriptor;

  it('should asyncronously fork fetchAnalysisWatcher saga', () => {
    forkDescriptor = analysisDataSaga.next();
    expect(forkDescriptor.value).toEqual(fork(fetchAnalysisWatcher));
  });
});
