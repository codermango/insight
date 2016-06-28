import BarComponent from '../index';

import expect from 'expect';
import { shallow } from 'enzyme';
import React from 'react';

describe('<BarComponent />', () => {
  it('should render BarComponent comopnent', () => {
    const renderedComponent = shallow(
      <BarComponent />
    );
    expect(renderedComponent.find(BarComponent)).toExist();
  });
});
