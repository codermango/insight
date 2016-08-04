import DataCard from '../index';

import expect from 'expect';
import { shallow } from 'enzyme';
import React from 'react';

describe('<DataCard />', () => {
  it('should render the DataCard component', () => {
    const data = {
      title: 'Active Users',
      number: 342434,
      change: 12,
    };
    const renderedComponent = shallow(<DataCard data={data} />);
    expect(renderedComponent.find(DataCard)).toExist();
  });
});
