import expect from 'expect';
import userInsightPageReducer from '../reducer';
import { fromJS } from 'immutable';

describe('userInsightPageReducer', () => {
  it('returns the initial state', () => {
    const initial = {
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
      topPurchasedMovies: fromJS({
        loading: false,
        data: false,
        error: false,
      }),
      timeTransactions: fromJS({
        loading: false,
        data: false,
        error: false,
      }),
    };
    expect(userInsightPageReducer(undefined, {})).toEqual(fromJS(initial));
  });
});
