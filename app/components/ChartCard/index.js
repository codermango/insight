/**
*
* ChartCard
*
*/

import React from 'react';

import styles from './styles.css';

class ChartCard extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    children: React.PropTypes.node,
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
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default ChartCard;
