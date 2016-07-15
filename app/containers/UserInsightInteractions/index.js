/*
 *
 * UserInsightInteractions
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import styles from './styles.css';
import { fetchUserInsightInteractions } from './actions';
import {
  selectCompleteness,
  selectAverageInteractions,
} from 'containers/UserInsightPage/selectors';

import ChartCard from 'components/ChartCard';
import BarChart from 'components/BarChart';
import LineChart from 'components/LineChart';

export class UserInsightInteractions extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    fetchUserInsightInteractions: React.PropTypes.func,
    completeness: React.PropTypes.oneOfType([
      React.PropTypes.object,
      React.PropTypes.bool,
    ]),
    averageInteractions: React.PropTypes.oneOfType([
      React.PropTypes.object,
      React.PropTypes.bool,
    ]),
  }

  componentWillMount() {
    if (!this.props.completeness.get('data')) {
      this.props.fetchUserInsightInteractions();
    }
  }

  render() {
    const { completeness, averageInteractions } = this.props;

    return (
      <div className={styles.userInsightInteractions}>
        <ChartCard
          ref="main_card"
          title="Completeness"
          description="Completeness description"
          loading={completeness.get('loading')}
        >
          {completeness.get('data') ?
            <BarChart
              data={completeness.get('data')}
            />
            : ''
          }
        </ChartCard>
        <ChartCard
          title="Average user activity"
          description="Average number of movies watched per user and week"
          loading={averageInteractions.get('loading')}
        >
          {averageInteractions.get('data') ?
            <LineChart
              data={averageInteractions.get('data')}
              scale="time"
            />
            : ''
          }
        </ChartCard>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  completeness: selectCompleteness(),
  averageInteractions: selectAverageInteractions(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchUserInsightInteractions: () => dispatch(fetchUserInsightInteractions()),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserInsightInteractions);
