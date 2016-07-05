import StackedLineChart from '../index';

import expect from 'expect';
import { shallow } from 'enzyme';
import React from 'react';

describe('<StackedLineChart />', () => {
  it('should render the StackedLineChart component', () => {
    const renderedComponent = shallow(<StackedLineChart />);
    expect(renderedComponent.find(StackedLineChart)).toExist();
  });
});
