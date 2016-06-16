/**
*
* SideNav
*
*/

import React from 'react';
import { Link } from 'react-router';

import styles from './styles.css';

import VionelLogo from 'components/VionelLogo';

class SideNav extends React.Component {
  render() {
    return (
      <div className={styles.sideNav}>
        <div className={styles.header}>
          <VionelLogo />
        </div>
        <div className={styles.body}>
          <ul className={styles.menu}>
            <li className={styles.menu_item}><Link to="userinsight" className={styles.menu_item_name}>User Insight</Link></li>
            <li className={styles.menu_item}><span className={styles.menu_item_name}>Library Insight</span></li>
          </ul>
        </div>
      </div>
    );
  }
}

export default SideNav;
