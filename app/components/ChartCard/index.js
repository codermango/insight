/**
*
* ChartCard
*
*/

import React from 'react';
import { VictoryLine } from 'victory';

import styles from './styles.css';

class ChartCard extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    width: React.PropTypes.number,
  }
  render() {
    const { width } = this.props;
    return (
      <div className={styles.chartCard} style={{ width: width - 4 }}>
        <div className={styles.header}>
          <h3>This is a chart title</h3>
          <span>This is a chart description</span>
        </div>
        <div className={styles.body}>
          <VictoryLine
            y={(data) => Math.sin(2 * Math.PI * data.x)}
            height={200}
            width={width * 0.75}
            style={{ data: { stroke: 'green' } }}
          />
        </div>
      </div>
    );
  }
}

export default ChartCard;
