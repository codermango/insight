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
    height: React.PropTypes.number,
    title: React.PropTypes.string,
    description: React.PropTypes.string,
  }
  static defaultProps = {
    title: 'Chart Title',
    description: 'Chart description',
  }
  render() {
    const { title, description } = this.props;
    return (
      <div className={styles.chartCard}>
        <div className={styles.header}>
          <h3 className={styles.chartHeader}>{title}</h3>
          <span className={styles.chartDescription}>{description}</span>
        </div>
        <div className={styles.body}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default ChartCard;
