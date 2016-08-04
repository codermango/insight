import {
  selectDashboardData,
} from '../selectors';
import { fromJS } from 'immutable';
import expect from 'expect';


describe('selectDashboardData', () => {
  const dashboardDataSelector = selectDashboardData();
  it('should select dashboardData', () => {
    const dashboardData = fromJS({});
    const mockedState = fromJS({
      analysisPage: {
        dashboardData,
      },
    });
    expect(dashboardDataSelector(mockedState)).toEqual(dashboardData);
  });
});
