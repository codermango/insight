import { LibraryInsight } from '../index';

import expect from 'expect';
import { shallow } from 'enzyme';
import React from 'react';

describe('<LibraryInsight />', () => {
  it('should render LibraryInsight comopnent', () => {
    const renderedComponent = shallow(
      <LibraryInsight />
    );
    expect(renderedComponent.find(LibraryInsight)).toExist();
  });
});
