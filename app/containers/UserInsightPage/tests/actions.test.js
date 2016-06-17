import expect from 'expect';
import {
  FETCH_CONTENT_VIEWS,
  FETCH_CONTENT_VIEWS_SUCCESS,
  FETCH_CONTENT_VIEWS_ERROR,
} from '../constants';
import {
  fetchContentViews,
  fetchContentViewsSuccess,
  fetchContentViewsError,
} from '../actions';

describe('UserInsight Actions', () => {
  describe('fetchContentViews', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: FETCH_CONTENT_VIEWS,
      };

      expect(fetchContentViews()).toEqual(expectedResult);
    });
  });

  describe('fetchContentViewsSuccess', () => {
    it('should return the correct type and the passed data', () => {
      const data = [{ x: 1, y: 1, label: 1 }];
      const expectedResult = {
        type: FETCH_CONTENT_VIEWS_SUCCESS,
        data,
      };

      expect(fetchContentViewsSuccess(data)).toEqual(expectedResult);
    });
  });

  describe('fetchContentViewsError', () => {
    it('should return the correct type and the error', () => {
      const message = {
        msg: 'Something went wrong!',
      };
      const expectedResult = {
        type: FETCH_CONTENT_VIEWS_ERROR,
        error: message,
      };

      expect(fetchContentViewsError(message)).toEqual(expectedResult);
    });
  });
});
