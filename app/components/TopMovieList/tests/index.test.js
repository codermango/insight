import TopMovieList from '../index';

import expect from 'expect';
import { shallow } from 'enzyme';
import React from 'react';

describe('<TopMovieList />', () => {
  it('should render TopMovieList comopnent', () => {
    const renderedComponent = shallow(
      <TopMovieList />
    );
    expect(renderedComponent.find(TopMovieList)).toExist();
  });
});
