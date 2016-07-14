import { UserInsightInteractions } from '../index';
import { fetchUserInsightInteractions } from '../actions';

import expect from 'expect';
import { shallow } from 'enzyme';
import React from 'react';
import { fromJS } from 'immutable';

describe('<UserInsightInteractions />', () => {
  it('should render UserInsightInteractions comopnent', () => {
    const completeness = fromJS({
      loading: false,
      error: false,
      data: false,
    });
    const renderedComponent = shallow(
      <UserInsightInteractions fetchUserInsightInteractions={fetchUserInsightInteractions} completeness={completeness} />
    );
    expect(renderedComponent.find(UserInsightInteractions)).toExist();
  });
});
