import { UserInsightMovies } from '../index';
import { fetchUserInsightMovies } from '../actions';

import expect from 'expect';
import { shallow } from 'enzyme';
import React from 'react';
import { fromJS } from 'immutable';

describe('<UserInsightMovies />', () => {
  it('should render UserInsightMovies comopnent', () => {
    const contentViews = fromJS({
      loading: false,
      error: false,
      data: false,
    });
    const topMovies = fromJS({
      loading: false,
      error: false,
      data: false,
    });
    const renderedComponent = shallow(
      <UserInsightMovies fetchUserInsightMovies={fetchUserInsightMovies} contentViews={contentViews} topMovies={topMovies} />
    );
    expect(renderedComponent.find(UserInsightMovies)).toExist();
  });
});
