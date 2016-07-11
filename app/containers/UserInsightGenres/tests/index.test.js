import { UserInsightGenres } from '../index';
import { fetchUserInsightGenres } from '../actions';

import expect from 'expect';
import { shallow } from 'enzyme';
import React from 'react';
import { fromJS } from 'immutable';

describe('<UserInsightGenres />', () => {
  it('should render UserInsightGenres comopnent', () => {
    const timeGenres = fromJS({
      loading: false,
      error: false,
      data: false,
    });
    const renderedComponent = shallow(
      <UserInsightGenres fetchUserInsightGenres={fetchUserInsightGenres} timeGenres={timeGenres} />
    );
    expect(renderedComponent.find(UserInsightGenres)).toExist();
  });
});
