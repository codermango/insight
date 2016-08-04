import expect from 'expect';
import analysisPageReducer from '../reducer';
import { fromJS } from 'immutable';

describe('analysisPageReducer', () => {
  it('returns the initial state', () => {
    const initialState = {
      dashboardData: fromJS({
        loading: false,
        data: false,
        error: false,
      }),
    };
    expect(analysisPageReducer(undefined, {})).toEqual(fromJS(initialState));
  });
});
