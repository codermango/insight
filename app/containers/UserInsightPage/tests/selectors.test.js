import {
  selectContentViews,
  selectLoading,
  selectError,
} from '../selectors';
import { fromJS } from 'immutable';
import expect from 'expect';

describe('selectLoading', () => {
  const loadingSelector = selectLoading();
  it('should select the loading', () => {
    const loading = false;
    const mockedState = fromJS({
      userInsightPage: {
        loading,
      },
    });
    expect(loadingSelector(mockedState)).toEqual(loading);
  });
});

describe('selectError', () => {
  const errorSelector = selectError();
  it('should select the error', () => {
    const error = 404;
    const mockedState = fromJS({
      userInsightPage: {
        error,
      },
    });
    expect(errorSelector(mockedState)).toEqual(error);
  });
});

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
