/*
 *
 * UserInsightPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';
import styles from './styles.css';

import { fetchContentViews, fetchTopMovies, fetchUserInsight } from './actions';
import {
  selectContentViews,
  selectLoading,
  selectError,
  selectTopMovies,
} from './selectors';

import ChartCard from 'components/ChartCard';
import AreaChart from 'components/AreaChart';

export class UserInsightPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    fetchContentViews: React.PropTypes.func,
    fetchTopMovies: React.PropTypes.func,
    fetchUserInsight: React.PropTypes.func,
    loading: React.PropTypes.bool,
    error: React.PropTypes.oneOfType([
      React.PropTypes.object,
      React.PropTypes.bool,
    ]),
    contentViews: React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.bool,
    ]),
    topMovies: React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.bool,
    ]),
  }

  componentWillMount() {
    this.props.fetchUserInsight();
  }

  render() {
    const { contentViews, topMovies } = this.props;
    return (
      <div className={styles.userInsightPage}>
        <div className={styles.header}>
          <ul className={styles.list}>
            <li className={styles.list_item}>Movies</li>
            <li className={styles.list_item}>Genres</li>
            <li className={styles.list_item}>User behavior</li>
            <li className={styles.list_item}>Devices</li>
          </ul>
        </div>
        <div className={styles.global_range_filter}>
          <span className={styles.filter_style}>All</span>
          <span className={styles.filter_style}>Year</span>
          <span className={styles.filter_style}>Month</span>
          <span className={styles.filter_style}>Day</span>
        </div>
        <div ref="main_chart" className={styles.main_chart}>
          <ChartCard
            ref="main_card"
            title="Content views"
            description="Number of views over time"
          >
            {contentViews ?
              <AreaChart
                data={contentViews}
                scale="time"
              />
              : ''
            }
          </ChartCard>
        </div>
        <div className={styles.bottom_chart}>
          <ChartCard
            title="Top movies"
            description="All time most viewed movies"
          >
            {topMovies ?
              topMovies.map(movie => <p key={movie.vionelID}>{movie.name}</p>)
              :
              ''
            }
          </ChartCard>
          <ChartCard />
          <ChartCard />
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchContentViews: () => dispatch(fetchContentViews()),
    fetchTopMovies: () => dispatch(fetchTopMovies()),
    fetchUserInsight: () => dispatch(fetchUserInsight()),
    dispatch,
  };
}

const mapStateToProps = createStructuredSelector({
  contentViews: selectContentViews(),
  loading: selectLoading(),
  error: selectError(),
  topMovies: selectTopMovies(),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserInsightPage);
