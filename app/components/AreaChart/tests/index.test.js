import AreaChart from '../index';

import expect from 'expect';
import { shallow } from 'enzyme';
import React from 'react';

describe('<AreaChart />', () => {
  it('should render the AreaChart component', () => {
    const renderedComponent = shallow(<AreaChart />);
    expect(renderedComponent.find(AreaChart)).toExist();
  });
});
