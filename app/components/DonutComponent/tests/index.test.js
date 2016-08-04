import DonutComponent from '../index';

import expect from 'expect';
import { shallow } from 'enzyme';
import React from 'react';

describe('<DonutComponent />', () => {
  it('should render the DonutComponent component', () => {
    const renderedComponent = shallow(<DonutComponent />);
    expect(renderedComponent.find(DonutComponent)).toExist();
  });
});
