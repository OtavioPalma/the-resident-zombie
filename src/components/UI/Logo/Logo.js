import React from 'react';

import classes from './Logo.module.scss';
import logo from '../../../assets/images/logo.png';

export const Logo = props => (
  <div className={classes.container}>
    <img src={logo} className={classes.logo} onClick={props.handleReset} />
  </div>
);
