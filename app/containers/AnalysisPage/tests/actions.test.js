import expect from 'expect';
import {
  fetchAnalysis,
} from '../actions';
import {
  FETCH_ANALYSIS,
} from '../constants';

describe('AnalysisPage actions', () => {
  describe('fetchAnalysis', () => {
    it('has a type of FETCH_ANALYSIS', () => {
      const expected = {
        type: FETCH_ANALYSIS,
      };
      expect(fetchAnalysis()).toEqual(expected);
    });
  });
});
