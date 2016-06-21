/**
*
* AreaChart
*
*/

import React from 'react';
import moment from 'moment';
import { VictoryChart, VictoryAxis, VictoryArea, VictoryScatter } from 'victory';

import styles from './styles.css';

class AreaChart extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    data: React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.bool,
    ]),
    scale: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.bool,
    ]),
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
    scale: 'linear',
  }
  render() {
    const { width, data, scale } = this.props;
    return (
      <div className={styles.areaChart}>
        <VictoryChart
          width={width * 1.25}
          padding={{ bottom: 20, top: 50, left: 20, right: 10 }}
        >
          <VictoryAxis
            scale={scale}
            tickCount={12}
            tickFormat={(x) => moment(x).format('MMMM')}
            style={{ axis: { stroke: '#fff' }, ticks: { stroke: 'none' }, grid: { stroke: '#fff', opacity: 0 }, tickLabels: { fill: '#fff', fontSize: 10 }, axisLabel: { fill: '#fff', fontSize: 14 } }}
          />
          <VictoryAxis
            dependentAxis
            style={{ axis: { stroke: 'none' }, ticks: { stroke: 'none' }, grid: { stroke: '#fff', opacity: 0.5 }, tickLabels: { fill: '#fff', fontSize: 10 }, axisLabel: { fill: '#fff', fontSize: 14 } }}
          />
          <VictoryArea
            width={width}
            data={data}
            standalone={false}
            style={{ data: { fill: '#66a0d5', opacity: 0.4, stroke: '#fff' } }}
          />
          <VictoryScatter
            width={width}
            data={data}
            standalone={false}
            style={{ data: { fill: 'none', stroke: 'none' }, labels: { fill: '#fff', transition: 'fill .50 ease-in-out', fontSize: 16, opacity: 1 } }}
          />
        </VictoryChart>
      </div>
    );
  }
}

export default AreaChart;
