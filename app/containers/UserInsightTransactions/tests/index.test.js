import { UserInsightTransactions } from '../index';
import { fetchUserInsightTransactions } from '../actions';

import expect from 'expect';
import { shallow } from 'enzyme';
import React from 'react';
import { fromJS } from 'immutable';

describe('<UserInsightTransactions />', () => {
  it('should render UserInsightTransactions comopnent', () => {
    const timeTransactions = fromJS({
      loading: false,
      error: false,
      data: false,
    });
    const renderedComponent = shallow(
      <UserInsightTransactions fetchUserInsightTransactions={fetchUserInsightTransactions} timeTransactions={timeTransactions} />
    );
    expect(renderedComponent.find(UserInsightTransactions)).toExist();
  });
});
