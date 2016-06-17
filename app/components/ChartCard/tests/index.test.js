import ChartCard from '../index';

import expect from 'expect';
import { render } from 'enzyme';
import React from 'react';

describe('<ChartCard />', () => {
  it('should render the ChartCard component', () => {
    const renderedComponent = render(<ChartCard width={500} />);
    expect(renderedComponent.find(ChartCard)).toExist();
  });
});
