import React from 'react';
import styles from './Header.module.scss';

import { FaMagento } from 'react-icons/fa';

const Header = () => {
  return (
    <nav className="navbar bg-light mb-4 p-0">
      <div className="container">
        <a className="navbar-brand" href="/">
          <div className="d-flex">
            <FaMagento className={styles.logo}></FaMagento>
            <div>Project MGMT</div>
          </div>
        </a>
      </div>
    </nav>
  );
};

export default Header;
