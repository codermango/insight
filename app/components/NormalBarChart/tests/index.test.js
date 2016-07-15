import NormalBarChart from '../index';

import expect from 'expect';
import { shallow } from 'enzyme';
import React from 'react';

describe('<NormalBarChart />', () => {
  it('should render the NormalBarChart component', () => {
    const renderedComponent = shallow(<NormalBarChart />);
    expect(renderedComponent.find(NormalBarChart)).toExist();
  });
});
