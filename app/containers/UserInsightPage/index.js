/*
 *
 * UserInsightPage
 *
 */

import React from 'react';
import styles from './styles.css';

import UserInsightMovies from 'containers/UserInsightMovies';

export default class UserInsightPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  render() {
    return (
      <div className={styles.userInsightPage}>
        <div className={styles.header}>
          <ul className={styles.list}>
            <li className={styles.list_item}>Movies</li>
            <li className={styles.list_item}>Genres</li>
            <li className={styles.list_item}>User behavior</li>
            <li className={styles.list_item}>Devices</li>
          </ul>
        </div>
        <div className={styles.global_range_filter}>
          <span className={styles.filter_style}>All</span>
          <span className={styles.filter_style}>Year</span>
          <span className={styles.filter_style}>Month</span>
          <span className={styles.filter_style}>Day</span>
        </div>
        <UserInsightMovies />
      </div>
    );
  }
}
