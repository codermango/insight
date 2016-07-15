import LineChart from '../index';

import expect from 'expect';
import { shallow } from 'enzyme';
import React from 'react';

describe('<LineChart />', () => {
  it('should render the LineChart component', () => {
    const renderedComponent = shallow(<LineChart />);
    expect(renderedComponent.find(LineChart)).toExist();
  });
});
