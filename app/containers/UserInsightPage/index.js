/*
 *
 * UserInsightPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';

import { createStructuredSelector } from 'reselect';
import styles from './styles.css';

import { fetchContentViews } from './actions';
import {
  selectContentViews,
  selectLoading,
  selectError,
} from './selectors';

import ChartCard from 'components/ChartCard';

export class UserInsightPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    fetchContentViews: React.PropTypes.func,
    loading: React.PropTypes.bool,
    error: React.PropTypes.oneOfType([
      React.PropTypes.object,
      React.PropTypes.bool,
    ]),
    contentViews: React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.bool,
    ]),
  }

  constructor(props) {
    super(props);
    this.state = {
      containerWidth: 0,
    };

    this.resize = this.resize.bind(this);
  }

  componentWillMount() {
    this.props.fetchContentViews();
  }

  componentDidMount() {
    this.resize();
    window.addEventListener('resize', this.resize, false);
  }

  componentWillUnmount() {
    // console.log("will unmount");
    window.removeEventListener('resize', this.resize, false);
  }

  resize() {
    const width = ReactDOM.findDOMNode(this).offsetWidth;
    // console.log("width1: ",width);
    this.setState({ containerWidth: width });
  }

  render() {
    return (
      <div className={styles.userInsightPage}>
        <div>
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
        <div className={styles.full_width_chart}>
          <ChartCard width={this.state.containerWidth} />
        </div>
        <div>
          <ChartCard width={this.state.containerWidth / 3} />
          <ChartCard width={this.state.containerWidth / 3} />
          <ChartCard width={this.state.containerWidth / 3} />
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchContentViews: () => dispatch(fetchContentViews()),
    dispatch,
  };
}

const mapStateToProps = createStructuredSelector({
  contentViews: selectContentViews(),
  loading: selectLoading(),
  error: selectError(),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserInsightPage);
