/*
 *
 * UserInsightPage
 *
 */

import React from 'react';
import { Link } from 'react-router';
import styles from './styles.css';


export default class UserInsightPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    children: React.PropTypes.node,
  }

  render() {
    return (
      <div className={styles.userInsightPage}>
        <div className={styles.header}>
          <ul className={styles.list}>
            <li className={styles.list_item}><Link to="/userinsight/movies" activeStyle={{ backgroundColor: '#2F3C52' }} className={styles.link}>Movies</Link></li>
            <li className={styles.list_item}><Link to="/userinsight/genres" activeStyle={{ backgroundColor: '#2F3C52' }} className={styles.link}>Genres</Link></li>
            <li className={styles.list_item}><Link to="/userinsight/users" activeStyle={{ backgroundColor: '#2F3C52' }} className={styles.link}>User behavior</Link></li>
            <li className={styles.list_item}><Link to="/userinsight/devices" activeStyle={{ backgroundColor: '#2F3C52' }} className={styles.link}>Devices</Link></li>
          </ul>
        </div>
        <div className={styles.global_range_filter}>
          <span className={styles.filter_style}>All</span>
          <span className={styles.filter_style}>Year</span>
          <span className={styles.filter_style}>Month</span>
          <span className={styles.filter_style}>Day</span>
        </div>
        {this.props.children}
      </div>
    );
  }
}
