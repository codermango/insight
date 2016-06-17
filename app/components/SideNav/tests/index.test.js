import SideNav from '../index';

import expect from 'expect';
import { render } from 'enzyme';
import React from 'react';

describe('<SideNav />', () => {
  it('should render SideNav comopnent', () => {
    const renderedComponent = render(
      <SideNav />
    );
    expect(renderedComponent.find(SideNav)).toExist();
  });
});
