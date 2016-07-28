import { AnalysisPage } from '../index';
import { fetchAnalysis } from '../actions';

import expect from 'expect';
import { shallow } from 'enzyme';
import React from 'react';
import { fromJS } from 'immutable';


describe('<AnalysisPage />', () => {
  it('should render AnalysisPage comopnent', () => {
    const activeViewers = fromJS({
      loading: false,
      error: false,
      data: false,
    });
    const churn = fromJS({
      loading: false,
      error: false,
      data: false,
    });
    const averageAmount = fromJS({
      loading: false,
      error: false,
      data: false,
    });
    const personasActiveViewers = fromJS({
      loading: false,
      error: false,
      data: false,
    });
    const renderedComponent = shallow(
      <AnalysisPage
        activeViewers={activeViewers}
        churn={churn}
        averageAmount={averageAmount}
        personasActiveViewers={personasActiveViewers}
        fetchAnalysis={fetchAnalysis}
      />
    );
    expect(renderedComponent.find(AnalysisPage)).toExist();
  });
});
