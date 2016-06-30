/**
*
* SideNav
*
*/

import React from 'react';
import { Link } from 'react-router';

import styles from './styles.css';

import VionelLogo from 'components/VionelLogo';

class SideNav extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className={styles.sideNav}>
        <div className={styles.header}>
          <VionelLogo />
        </div>
        <div className={styles.body}>
          <ul className={styles.menu}>
            <li className={styles.menu_item}><Link to="userinsight/movies" className={styles.menu_item_name}>User Insight</Link></li>
            <li className={styles.menu_item}><Link to="libraryinsight" className={styles.menu_item_name}>Library Insight</Link></li>
          </ul>
        </div>
      </div>
    );
  }
}

export default SideNav;
