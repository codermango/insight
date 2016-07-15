/**
*
* BarChart
*
*/

import React from 'react';
import { VictoryChart, VictoryAxis, VictoryBar } from 'victory';

import styles from './styles.css';

class BarChart extends React.Component { // eslint-disable-line react/prefer-stateless-function

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
      bar: {
        data: {
          fill: 'url(#GradientBar)',
          stroke: 'none',
          strokeWidth: 0,
          opacity: 1,
          width: 18,
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
      <div ref="chart" className={styles.barChart}>
        <VictoryChart
          domainPadding={{ x: 10 }}
          padding={{
            top: 15,
            bottom: 40,
            left: 40,
            right: 40,
          }}
          width={chartWidth}
          height={chartHeight}
          style={chartStyles.parent}
        >
          <linearGradient id="GradientBar" x1="0" x2="0" y1="0" y2="1">
            <stop className="stop1" stopColor="#039BE5" offset="0%" />
            <stop className="stop2" stopColor="#039BE5" stopOpacity={0.5} offset="50%" />
            <stop className="stop3" stopColor="#039BE5" stopOpacity={0} offset="100%" />
          </linearGradient>
          <VictoryAxis
            scale={scale}
            style={chartStyles.xAxis}
            tickFormat={(x) => `${x}%`}
            tickCount={data.length}
          />
          <VictoryAxis
            dependentAxis
            style={chartStyles.yAxis}
          />
          <VictoryBar
            data={data}
            standalone={false}
            style={chartStyles.bar}
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
                      {
                        target: 'data',
                        mutation: (props) => (
                          {
                            style: Object.assign({}, props.style, { fill: '#039BE5' }),
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
                      {
                        target: 'data',
                        mutation: (props) => (
                          {
                            style: Object.assign({}, props.style, { fill: 'url(#GradientBar)' }),
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

export default BarChart;
