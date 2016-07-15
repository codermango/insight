/**
*
* AreaChart
*
*/

import React from 'react';
import moment from 'moment';
import { VictoryChart, VictoryAxis, VictoryArea, VictoryScatter, VictoryBar } from 'victory';
import ChartLabel from 'components/ChartLabel';

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
      area: {
        data: {
          fill: 'url(#Gradient1)',
          stroke: '#039BE5',
          strokeWidth: 2,
          opacity: 0.5,
        },
      },
      bar: {
        data: {
          fill: 'url(#Gradient1)',
          stroke: 'none',
          strokeWidth: 0,
          opacity: 0.2,
        },
        labels: {
          display: 'none',
        },
      },
      scatter: {
        data: {
          stroke: '#039BE5',
          fill: '#272f39',
          strokeWidth: 2,
        },
        labels: {
          fill: 'white',
          padding: 12,
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
      <div ref="chart" className={styles.areaChart}>
        <VictoryChart
          width={chartWidth}
          height={chartHeight}
          style={chartStyles.parent}
          padding={{
            top: 5,
            bottom: 40,
            left: 50,
            right: 40,
          }}
        >
          <linearGradient id="Gradient1" x1="0" x2="0" y1="0" y2="1">
            <stop className="stop1" stopColor="#039BE5" offset="0%" />
            <stop className="stop2" stopColor="#039BE5" stopOpacity={0.5} offset="50%" />
            <stop className="stop3" stopColor="#039BE5" stopOpacity={0} offset="100%" />
          </linearGradient>
          <VictoryAxis
            scale={scale}
            tickCount={12}
            tickFormat={(x) => moment(x).format('MMMM')}
            style={chartStyles.xAxis}
          />
          <VictoryAxis
            dependentAxis
            style={chartStyles.yAxis}
          />
          <VictoryArea
            data={data}
            standalone={false}
            style={chartStyles.area}
          />
          <VictoryBar
            data={data}
            standalone={false}
            style={chartStyles.bar}
          />
          <VictoryScatter
            data={data}
            standalone={false}
            style={chartStyles.scatter}
            labelComponent={<ChartLabel />}
            events={[
              {
                target: 'data',
                eventHandlers: {
                  onMouseOver: () =>
                    [
                      {
                        target: 'labels',
                        mutation: () => ({ active: true }),
                      },
                      {
                        mutation: (props) => (
                          { style:
                            Object.assign({}, props.style, { fill: '#039BE5' }),
                          }
                        ),
                      },
                    ],
                  onMouseOut: () =>
                    [
                      {
                        target: 'labels',
                        mutation: () => ({ active: false }),
                      }, {
                        mutation: (props) => (
                          { style:
                            Object.assign({}, props.style, { fill: '#272f39' }),
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

export default AreaChart;
