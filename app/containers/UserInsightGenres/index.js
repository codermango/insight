/*
 *
 * UserInsightGenres
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import styles from './styles.css';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

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

  constructor(props) {
    super(props);
    this.state = {
      startDate: moment('2015-01-01'),
      endDate: moment('2015-12-31'),
    };
    this.fetchData = this.fetchData.bind(this);
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
  }

  componentWillMount() {
    if (!this.props.timeGenres.get('data')) {
      const dateRange = { startDate: this.state.startDate.toDate().getTime(), endDate: this.state.endDate.toDate().getTime() };
      this.fetchData(dateRange);
    }
  }

  fetchData(dateRange) {
    this.props.fetchUserInsightGenres(dateRange);
  }

  handleStartDateChange(date) {
    this.setState({ startDate: date });
    const dateRange = { startDate: date.toDate().getTime(), endDate: this.state.endDate.toDate().getTime() };
    this.fetchData(dateRange);
  }

  handleEndDateChange(date) {
    this.setState({ endDate: date });
    const dateRange = { startDate: this.state.startDate.toDate().getTime(), endDate: date.toDate().getTime() };
    this.fetchData(dateRange);
  }

  render() {
    const { timeGenres } = this.props;
    return (
      <div className={styles.userInsightGenres}>
        <div className={styles.dataOptions}>
          <DatePicker
            className={styles.dateInput}
            dateFormat="YYYY-MM-DD"
            showYearDropdown
            selected={this.state.startDate}
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            onChange={this.handleStartDateChange}
          />
          <DatePicker
            className={styles.dateInput}
            dateFormat="YYYY-MM-DD"
            showYearDropdown
            selected={this.state.endDate}
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            onChange={this.handleEndDateChange}
          />
        </div>
        <ChartCard
          ref="main_card"
          title="Genre Popularity"
          description="Top viewed genres in percentage over time"
          loading={timeGenres.get('loading')}
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
    fetchUserInsightGenres: (dateRange) => dispatch(fetchUserInsightGenres(dateRange)),
    dispatch,
  };
}

const mapStateToProps = createStructuredSelector({
  timeGenres: selectTimeGenres(),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserInsightGenres);
