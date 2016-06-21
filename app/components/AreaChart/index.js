/**
*
* AreaChart
*
*/

import React from 'react';
import { VictoryChart, VictoryArea } from 'victory';

import styles from './styles.css';

class AreaChart extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    data: React.PropTypes.array,
  }

  static defaultProps = {
    width: 500,
    height: 400,
    data: [
      {
        x: 1, y: 2, label: 2,
      },
      {
        x: 2, y: 1, label: 1,
      },
    ],
  }
  render() {
    const { width, height, data } = this.props;
    return (
      <div className={styles.areaChart}>
        <VictoryChart height={height} width={width} className={styles.chart}>
          <VictoryArea
            width={width}
            height={height}
            data={data}
            interpolation={'cardinal'}
            style={{ data: { fill: '#66a0d5', opacity: 0.8, stroke: '#FFF' } }}
          />
        </VictoryChart>
      </div>
    );
  }
}

export default AreaChart;
