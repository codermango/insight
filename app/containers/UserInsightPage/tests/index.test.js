import UserInsightPage from '../index';

import expect from 'expect';
import { shallow } from 'enzyme';
import React from 'react';

describe('<UserInsightPage />', () => {
  it('should render UserInsightPage comopnent', () => {
    const renderedComponent = shallow(
      <UserInsightPage />
    );
    expect(renderedComponent.find(UserInsightPage)).toExist();
  });
});
