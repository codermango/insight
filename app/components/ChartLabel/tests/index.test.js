import ChartLabel from '../index';

import expect from 'expect';
import { shallow } from 'enzyme';
import React from 'react';

describe('<ChartLabel />', () => {
  it('should render ChartLabel comopnent', () => {
    const renderedComponent = shallow(
      <ChartLabel />
    );
    expect(renderedComponent.find(ChartLabel)).toExist();
  });
});
