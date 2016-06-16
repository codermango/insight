/**
*
* VionelLogo
*
*/

import React from 'react';
import { Link } from 'react-router';

import styles from './styles.css';
import Logo from './logo-shadow.png';

function VionelLogo() {
  return (
    <Link to="/" className={styles.vionelLogoWrapper}>
      <img className={styles.logo} src={Logo} alt="Vionel" />
    </Link>
  );
}

export default VionelLogo;
