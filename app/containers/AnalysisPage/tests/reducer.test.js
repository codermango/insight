import expect from 'expect';
import analysisPageReducer from '../reducer';
import { fromJS } from 'immutable';

describe('analysisPageReducer', () => {
  it('returns the initial state', () => {
    const initialState = {
      activeViewers: {
        loading: false,
        data: false,
        error: false,
      },
      churn: {
        loading: false,
        data: false,
        error: false,
      },
      averageAmount: {
        loading: false,
        data: false,
        error: false,
      },
      averageViewTime: {
        loading: false,
        data: false,
        error: false,
      },
      personasActiveViewers: {
        loading: false,
        data: false,
        error: false,
      },
    };
    expect(analysisPageReducer(undefined, {})).toEqual(fromJS(initialState));
  });
});
