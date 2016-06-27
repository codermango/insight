import expect from 'expect';
import userInsightPageReducer from '../reducer';
import { fromJS } from 'immutable';

describe('userInsightPageReducer', () => {
  it('returns the initial state', () => {
    const initial = {
      loading: false,
      contentViews: false,
      error: false,
      topMovies: false,
    };
    expect(userInsightPageReducer(undefined, {})).toEqual(fromJS(initial));
  });
});
