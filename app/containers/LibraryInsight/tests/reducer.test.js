import expect from 'expect';
import libraryInsightReducer from '../reducer';
import { fromJS } from 'immutable';

describe('libraryInsightReducer', () => {
  it('returns the initial state', () => {
    expect(libraryInsightReducer(undefined, {})).toEqual(fromJS({}));
  });
});
