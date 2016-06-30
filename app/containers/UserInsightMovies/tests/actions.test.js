import expect from 'expect';
import {
  FETCH_USER_INSIGHT_MOVIES,
} from '../constants';
import {
  fetchUserInsightMovies,
} from '../actions';

describe('UserInsightMovies Actions', () => {
  describe('fetchUserInsightMovies', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: FETCH_USER_INSIGHT_MOVIES,
      };

      expect(fetchUserInsightMovies()).toEqual(expectedResult);
    });
  });
});
