import UserInsightDashboard from '../index';

import expect from 'expect';
import { shallow } from 'enzyme';
import React from 'react';

describe('<UserInsightDashboard />', () => {
  it('should render UserInsightDashboard comopnent', () => {
    const renderedComponent = shallow(
      <UserInsightDashboard />
    );
    expect(renderedComponent.find(UserInsightDashboard)).toExist();
  });
});
