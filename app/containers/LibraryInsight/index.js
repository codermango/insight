/*
 *
 * LibraryInsight
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import selectLibraryInsight from './selectors';
import styles from './styles.css';

import ChartCard from 'components/ChartCard';
import { VictoryChart, VictoryArea } from 'victory';

export class LibraryInsight extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = {
      dimension: false,
    };

    this.resize = this.resize.bind(this);
  }

  componentWillMount() {

  }

  componentDidMount() {
    this.resize();
    window.addEventListener('resize', this.resize, false);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize, false);
  }

  resize() {
    this.setState({ dimension: this.refs.main_row.getBoundingClientRect() });
  }

  render() {
    const height = this.state.dimension ? this.state.dimension.height * 0.8 : 200;
    return (
      <div className={styles.libraryInsight}>
        <div className={styles.main_row} ref="main_row">
          <ChartCard>
            <VictoryChart height={height}>
              <VictoryArea />
            </VictoryChart>
          </ChartCard>
        </div>
        <div className={styles.bottom_row}>
          <div className={styles.card}>Card</div>
          <div className={styles.card}>Card</div>
          <div className={styles.card}>Card</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = selectLibraryInsight();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LibraryInsight);
