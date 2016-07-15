/*
 *
 * UserInsightTransactions
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { fetchUserInsightTransactions } from './actions';
import {
  selectTimeTransactions,
  selectGenreTransactions,
} from 'containers/UserInsightPage/selectors';
import styles from './styles.css';

import ChartCard from 'components/ChartCard';
import StackedLineChart from 'components/StackedLineChart';
import NormalBarChart from 'components/NormalBarChart';

export class UserInsightTransactions extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    fetchUserInsightTransactions: React.PropTypes.func,
    timeTransactions: React.PropTypes.oneOfType([
      React.PropTypes.object,
      React.PropTypes.bool,
    ]),
    genreTransactions: React.PropTypes.oneOfType([
      React.PropTypes.object,
      React.PropTypes.bool,
    ]),
  };

  componentWillMount() {
    if (!this.props.timeTransactions.get('data')) {
      this.props.fetchUserInsightTransactions();
    }
  }
  render() {
    const { timeTransactions, genreTransactions } = this.props;
    return (
      <div className={styles.userInsightTransactions}>
        <ChartCard
          ref="main_card"
          title="Transactions of different currency"
          description="Transactions of different currency over time"
          loading={timeTransactions.get('loading')}
        >
          {timeTransactions.get('data') ?
            <StackedLineChart data={timeTransactions.get('data')} scale="time" />
            : ''
          }
        </ChartCard>

        <ChartCard
          ref="main_card"
          title="Transactions of different genre"
          description="How many transactions are contributed by different genres"
          loading={genreTransactions.get('loading')}
        >
          {genreTransactions.get('data') ?
            <NormalBarChart
              data={genreTransactions.get('data')}
            />
            : ''
          }
        </ChartCard>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  timeTransactions: selectTimeTransactions(),
  genreTransactions: selectGenreTransactions(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchUserInsightTransactions: () => dispatch(fetchUserInsightTransactions()),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserInsightTransactions);
