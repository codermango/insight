import MovieList from '../index';

import expect from 'expect';
import { shallow } from 'enzyme';
import React from 'react';

describe('<MovieList />', () => {
  it('should render MovieList comopnent', () => {
    const renderedComponent = shallow(
      <MovieList />
    );
    expect(renderedComponent.find(MovieList)).toExist();
  });
});
