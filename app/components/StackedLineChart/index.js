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
      blacklist: [],
    };

    this.chartDomain = this.chartDomain.bind(this);
    this.resize = this.resize.bind(this);
    this.blackListed = this.blackListed.bind(this);
    this.blacklist = this.blacklist.bind(this);
    this.whitelist = this.whitelist.bind(this);
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

  blackListed(item) {
    return this.state.blacklist.indexOf(item) === -1;
  }

  blacklist(item) {
    const listIndex = this.state.blacklist.indexOf(item);
    if (listIndex === -1) {
      const newBlacklist = this.state.blacklist;
      newBlacklist.push(item);
      this.setState({ blacklist: newBlacklist });
    } else {
      this.whitelist(item);
    }
  }

  whitelist(item) {
    const listIndex = this.state.blacklist.indexOf(item);
    if (listIndex !== -1) {
      const newBlacklist = this.state.blacklist;
      newBlacklist.splice(listIndex, 1);
      this.setState({ blacklist: newBlacklist });
    }
  }

  render() {
    const { width, height, data, scale } = this.props;
    const chartStyles = this.chartStyles();
    const chartWidth = this.state.dimension.width > 0 ? this.state.dimension.width : width;
    const chartHeight = this.state.dimension.height > 0 ? this.state.dimension.height : height;
    return (
      <div ref="chart" className={styles.stackedLineChart}>
        {data ?
          <div style={{ fontSize: 10, marginTop: '5px', position: 'absolute' }}>
            {data.map(stack =>
              <div key={stack.name} style={{ display: 'inline-block', position: 'relative', cursor: 'pointer', padding: '0 5px', opacity: this.blackListed(stack.name) ? 1 : 0.5 }} onClick={() => this.blacklist(stack.name)}>
                <span style={{ width: '5px', height: '5px', backgroundColor: stack.color, position: 'absolute', top: '5px', borderRadius: '5px' }}></span>
                <span style={{ marginLeft: '8px' }}>{stack.name}</span>
              </div>
            )}
          </div>
          :
          ''
        }
        {data && data.length > 0 ?
          <VictoryChart
            width={chartWidth}
            height={chartHeight}
            domain={this.chartDomain()}
            style={chartStyles.parent}
          >
            <VictoryAxis
              scale={scale}
              tickCount={data.length}
              tickFormat={(x) => moment(x).format('MMMM')}
              style={chartStyles.xAxis}
            />
            <VictoryAxis
              dependentAxis
              style={chartStyles.yAxis}
            />
            {data.map(d =>
              <VictoryLine key={d.name} data={d.data} style={{ data: { stroke: d.color, strokeWidth: 3, opacity: 0.8, display: this.blackListed(d.name) ? 'block' : 'none' } }} />
            )}
            {data.map(d =>
              <VictoryScatter
                key={d.name}
                data={d.data}
                standalone={false}
                style={{ data: { fill: d.color, display: this.blackListed(d.name) ? 'block' : 'none' }, labels: { fill: '#FFF', padding: 12, fontSize: 16 } }}
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
          'No data'
        }
      </div>
    );
  }
}

export default StackedLineChart;
