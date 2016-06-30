import {
  selectContentViews,
  selectTopMovies,
} from '../selectors';
import { fromJS } from 'immutable';
import expect from 'expect';

describe('selectContentViews', () => {
  const contentViewsSelector = selectContentViews();
  it('should select the contentViews', () => {
    const contentViews = fromJS([]);
    const mockedState = fromJS({
      userInsightPage: {
        contentViews,
      },
    });
    expect(contentViewsSelector(mockedState)).toEqual(contentViews);
  });
});

describe('selectTopMovies', () => {
  const topMoviesSelector = selectTopMovies();
  it('should select the topMovies', () => {
    const topMovies = fromJS([]);
    const mockedState = fromJS({
      userInsightPage: {
        topMovies,
      },
    });
    expect(topMoviesSelector(mockedState)).toEqual(topMovies);
  });
});
