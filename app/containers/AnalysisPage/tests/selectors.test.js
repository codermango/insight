import {
  selectActiveViewers,
  selectChurn,
  selectAverageAmount,
} from '../selectors';
import { fromJS } from 'immutable';
import expect from 'expect';


describe('selectActiveViewers', () => {
  const activeViewersSelector = selectActiveViewers();
  it('should select activeViewers', () => {
    const activeViewers = fromJS([]);
    const mockedState = fromJS({
      analysisPage: {
        activeViewers,
      },
    });
    expect(activeViewersSelector(mockedState)).toEqual(activeViewers);
  });
});

describe('selectChurn', () => {
  const churnSelector = selectChurn();
  it('should select churn', () => {
    const churn = fromJS([]);
    const mockedState = fromJS({
      analysisPage: {
        churn,
      },
    });
    expect(churnSelector(mockedState)).toEqual(churn);
  });
});

describe('selectAverageAmount', () => {
  const averageAmountSelector = selectAverageAmount();
  it('should select averageAmount', () => {
    const averageAmount = fromJS([]);
    const mockedState = fromJS({
      analysisPage: {
        averageAmount,
      },
    });
    expect(averageAmountSelector(mockedState)).toEqual(averageAmount);
  });
});
