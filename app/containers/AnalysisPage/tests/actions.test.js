import expect from 'expect';
import {
  fetchDashboard,
} from '../actions';
import {
  FETCH_DASHBOARD,
} from '../constants';

describe('AnalysisPage actions', () => {
  describe('fetchDashboard', () => {
    it('has a type of FETCH_DASHBOARD', () => {
      const expected = {
        type: FETCH_DASHBOARD,
      };
      expect(fetchDashboard()).toEqual(expected);
    });
  });
});
