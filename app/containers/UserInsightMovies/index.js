/*
 *
 * UserInsightMovies
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import styles from './styles.css';

import { fetchUserInsightMovies } from './actions';
import {
  selectContentViews,
  selectTopMovies,
  selectTopPurchasedMovies,
} from 'containers/UserInsightPage/selectors';

import ChartCard from 'components/ChartCard';
import AreaChart from 'components/AreaChart';
import TopMovieList from 'components/TopMovieList';
import MovieList from 'components/MovieList';

export class UserInsightMovies extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    fetchUserInsightMovies: React.PropTypes.func,
    contentViews: React.PropTypes.oneOfType([
      React.PropTypes.object,
      React.PropTypes.bool,
    ]),
    topMovies: React.PropTypes.oneOfType([
      React.PropTypes.object,
      React.PropTypes.bool,
    ]),
    topPurchasedMovies: React.PropTypes.oneOfType([
      React.PropTypes.object,
      React.PropTypes.bool,
    ]),
  }

  componentWillMount() {
    this.props.fetchUserInsightMovies();
  }

  render() {
    const { contentViews, topMovies, topPurchasedMovies } = this.props;
    return (
      <div className={styles.userInsightMovies}>
        <div ref="main_chart" className={styles.main_chart}>
          <ChartCard
            ref="main_card"
            title="Content views"
            description="Number of views over time"
            loading={contentViews.get('loading')}
          >
            {contentViews.get('data') ?
              <AreaChart
                data={contentViews.get('data')}
                scale="time"
              />
              : ''
            }
          </ChartCard>
        </div>
        <div className={styles.bottom_chart}>
          <ChartCard
            title="Top Movies"
            description="All time most viewed movies"
            loading={topMovies.get('loading')}
          >
            {topMovies.get('data') ?
              <TopMovieList topMovies={topMovies.get('data')} />
              :
              ''
            }
          </ChartCard>
          <ChartCard
            title="Top Purchased Movies"
            description="All time most purchased movies (SEK)"
            loading={topPurchasedMovies.get('loading')}
          >
          {topPurchasedMovies.get('data') ?
            <MovieList
              topMovies={topPurchasedMovies.get('data')}
              sortBy="purchase_amount"
            />
            :
            ''
          }
          </ChartCard>
          <ChartCard />
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchUserInsightMovies: () => dispatch(fetchUserInsightMovies()),
    dispatch,
  };
}

const mapStateToProps = createStructuredSelector({
  contentViews: selectContentViews(),
  topMovies: selectTopMovies(),
  topPurchasedMovies: selectTopPurchasedMovies(),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserInsightMovies);
