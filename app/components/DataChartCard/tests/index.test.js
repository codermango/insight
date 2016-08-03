import DataChartCard from '../index';

import expect from 'expect';
import { shallow } from 'enzyme';
import React from 'react';

describe('<DataChartCard />', () => {
  it('should render the DataChartCard component', () => {
    const data = [
      { x: 'iPad', y: 3 },
      { x: 'iPhone', y: 5 },
      { x: 'Samsung Smart TV', y: 4 },
      { x: 'PC & Mac', y: 2 },
      { x: 'Android', y: 1 },
    ];
    const renderedComponent = shallow(<DataChartCard data={data} />);
    expect(renderedComponent.find(DataChartCard)).toExist();
  });
});
