import React from 'react';

import classes from './Logo.module.scss';
import logo from '../../../assets/images/logo.png';

export const Logo = props => (
  <div className={classes.logo}>
    <img src={logo} onClick={props.handleClick} />
  </div>
);
