import KpiPanel from '../index';

import expect from 'expect';
import { shallow } from 'enzyme';
import React from 'react';

describe('<KpiPanel />', () => {
  it('should render the KpiPanel component', () => {
    const data = [
      { title: 'Active Viewers', number: 12345, change: 12 },
      { title: 'Churn', number: 12345, change: 21 },
      { title: 'Average Amount', number: 343234.32, change: 11.3 },
      { title: 'Average Viewing Time', number: 234.32, change: 45.6 },
      { title: 'ARPU', number: 37, change: 7 },
    ];
    const renderedComponent = shallow(<KpiPanel data={data} />);
    expect(renderedComponent.find(KpiPanel)).toExist();
  });
});
