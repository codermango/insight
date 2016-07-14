import BarChart from '../index';

import expect from 'expect';
import { shallow } from 'enzyme';
import React from 'react';

describe('<BarChart />', () => {
  it('should render the BarChart component', () => {
    const renderedComponent = shallow(<BarChart />);
    expect(renderedComponent.find(BarChart)).toExist();
  });
});
