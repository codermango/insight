import expect from 'expect';
import userInsightPageReducer from '../reducer';
import { fromJS } from 'immutable';

describe('userInsightPageReducer', () => {
  it('returns the initial state', () => {
    expect(userInsightPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
