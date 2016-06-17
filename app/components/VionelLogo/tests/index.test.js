import VionelLogo from '../index';

import expect from 'expect';
import { render } from 'enzyme';
import React from 'react';

describe('<VionelLogo />', () => {
  it('should render VionelLogo comopnent', () => {
    const renderedComponent = render(
      <VionelLogo />
    );
    expect(renderedComponent.find(VionelLogo)).toExist();
  });
});
