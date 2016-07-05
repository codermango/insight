/*
 *
 * UserInsightGenres
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import styles from './styles.css';

import { fetchUserInsightGenres } from './actions';
import {
  selectTimeGenres,
} from 'containers/UserInsightPage/selectors';

import ChartCard from 'components/ChartCard';
import StackedLineChart from 'components/StackedLineChart';

export class UserInsightGenres extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    fetchUserInsightGenres: React.PropTypes.func,
    timeGenres: React.PropTypes.oneOfType([
      React.PropTypes.object,
      React.PropTypes.bool,
    ]),
  }

  componentWillMount() {
    if (!this.props.timeGenres.get('data')) {
      this.props.fetchUserInsightGenres();
    }
  }

  render() {
    const { timeGenres } = this.props;
    return (
      <div className={styles.userInsightGenres}>
        <ChartCard
          ref="main_card"
          title="Genre Popularity"
          description="Top viewed genres in percentage over time"
          loading={timeGenres.get('loading')}
          stackDescription={timeGenres.get('data')}
        >
          {timeGenres.get('data') ?
            <StackedLineChart data={timeGenres.get('data')} scale="time" />
            : ''
          }
        </ChartCard>
      </div>
    );
  }
}


function mapDispatchToProps(dispatch) {
  return {
    fetchUserInsightGenres: () => dispatch(fetchUserInsightGenres()),
    dispatch,
  };
}

const mapStateToProps = createStructuredSelector({
  timeGenres: selectTimeGenres(),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserInsightGenres);
