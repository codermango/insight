/**
*
* StackedLineChart
*
*/

import React from 'react';
import moment from 'moment';
import { VictoryChart, VictoryAxis, VictoryLine, VictoryScatter } from 'victory';
import ChartLabel from 'components/ChartLabel';

import styles from './styles.css';

class StackedLineChart extends React.Component {

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
        name: 'Drama',
        data: [
          {
            x: 1420066800000,
            y: 18,
            label: 18,
          },
        ],
        count: 450592,
        color: 'hsl(0, 100%, 50%)',
      },
    ],
    scale: 'linear',
  }

  constructor(props) {
    super(props);
    this.state = {
      xMin: 0,
      xMax: 0,
      dimension: false,
    };

    this.chartDomain = this.chartDomain.bind(this);
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

  chartDomain() {
    let xMax = 0;
    let xMin = 0;
    const data = this.props.data;
    if (data) {
      const layers = data.map(d => d.data);
      layers.map(layer =>
        layer.map(l => !xMin ? xMin = l.x : l.x < xMin ? xMin = l.x : !xMax ? xMax = l.x : l.x > xMax ? xMax = l.x : 0) // eslint-disable-line
      );
    }
    return { x: [xMin, xMax] };
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
        axis: { stroke: '#FFF' },
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
      <div ref="chart" className={styles.stackedLineChart}>
        {data ?
          <VictoryChart
            width={chartWidth}
            height={chartHeight}
            domain={this.chartDomain()}
            style={chartStyles.parent}
          >
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
            {data.map(d =>
              <VictoryLine key={d.name} data={d.data} style={{ data: { stroke: d.color, strokeWidth: 3, opacity: 0.8 } }} />
            )}
            {data.map(d =>
              <VictoryScatter
                key={d.name}
                data={d.data}
                standalone={false}
                style={{ data: { fill: d.color }, labels: { fill: '#FFF', padding: 12, fontSize: 16 } }}
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
                                Object.assign({}, props.style, { fill: '#FFF' }),
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
                                Object.assign({}, props.style, { fill: d.color }),
                              }
                            ),
                          },
                        ],
                    },
                  },
                ]}
              />
            )}
          </VictoryChart>
          :
          ''
        }
      </div>
    );
  }
}

export default StackedLineChart;
