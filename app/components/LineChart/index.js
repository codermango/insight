/**
*
* LineChart
*
*/

import React from 'react';
import moment from 'moment';
import { VictoryChart, VictoryAxis, VictoryLine } from 'victory';

import styles from './styles.css';

class LineChart extends React.Component { // eslint-disable-line react/prefer-stateless-function

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

  constructor(props) {
    super(props);
    this.state = {
      dimension: false,
    };

    this.resize = this.resize.bind(this);
  }

  componentDidMount() {
    this.resize();
    window.addEventListener('resize', this.resize, false);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize, false);
  }

  resize() {
    this.setState({ dimension: this.refs.chart.getBoundingClientRect() });
  }

  chartStyles() {
    return {
      parent: {
        boxSizing: 'border-box',
        display: 'block',
        width: '100%',
        height: '100%',
        padding: 20,
      },
      line: {
        data: {
          fill: 'none',
          stroke: 'url(#GradientLine)',
          opacity: 1,
        },
        labels: {
          display: 'none',
          fill: '#FFF',
          fontSize: 12,
        },
      },
      xAxis: {
        axis: { stroke: 'none' },
        ticks: { stroke: 'none' },
        tickLabels: { fill: '#FFF', fontSize: 10 },
      },
      yAxis: {
        axis: { stroke: 'none' },
        ticks: { stroke: 'none' },
        grid: { stroke: '#FFF', opacity: 0.2 },
        tickLabels: { fill: '#FFF', fontSize: 10 },
      },
    };
  }

  render() {
    const { width, height, data, scale } = this.props;
    const chartStyles = this.chartStyles();
    const chartWidth = this.state.dimension.width > 0 ? this.state.dimension.width : width;
    const chartHeight = this.state.dimension.height > 0 ? this.state.dimension.height : height;

    return (
      <div ref="chart" className={styles.lineChart}>
        <VictoryChart
          domainPadding={{ x: 20 }}
          width={chartWidth}
          height={chartHeight}
          style={chartStyles.parent}
          padding={{
            top: 10,
            bottom: 40,
            left: 40,
            right: 40,
          }}
        >
          <linearGradient id="GradientLine" x1="0" x2="0" y1="0" y2="1">
            <stop className="stop1" stopColor="#039BE5" offset="0%" />
            <stop className="stop2" stopColor="#039BE5" offset="50%" />
            <stop className="stop3" stopColor="red" offset="100%" />
          </linearGradient>
          <VictoryAxis
            scale={scale}
            style={chartStyles.xAxis}
            tickFormat={(x) => moment(x).format('MMMM')}
          />
          <VictoryAxis
            dependentAxis
            style={chartStyles.yAxis}
          />
          <VictoryLine
            data={data}
            standalone={false}
            style={chartStyles.line}
            events={[
              {
                target: 'data',
                eventHandlers: {
                  onMouseOver: () =>
                    [
                      {
                        target: 'labels',
                        mutation: (props) => (
                          { style:
                            Object.assign({}, props.style, { display: 'block' }),
                          }
                        ),
                      },
                    ],
                  onMouseOut: () =>
                    [
                      {
                        target: 'labels',
                        mutation: (props) => (
                          { style:
                            Object.assign({}, props.style, { display: 'none' }),
                          }
                        ),
                      },
                    ],
                },
              },
            ]}
          />
        </VictoryChart>
      </div>
    );
  }
}

export default LineChart;
