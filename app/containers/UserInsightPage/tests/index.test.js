import { UserInsightPage } from '../index';
import { fetchUserInsight } from '../actions';

import expect from 'expect';
import { shallow } from 'enzyme';
import React from 'react';

describe('<UserInsightPage />', () => {
  it('should render UserInsightPage comopnent', () => {
    const contentViews = [
      { x: 1, y: 1, label: 1 },
    ];
    const renderedComponent = shallow(
      <UserInsightPage loading={false} error={false} contentViews={contentViews} fetchUserInsight={fetchUserInsight} />
    );
    expect(renderedComponent.find(UserInsightPage)).toExist();
  });
});
