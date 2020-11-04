import React from 'react';
import { Link } from 'react-router-dom';

import { Logo } from '../Logo/Logo';

import classes from './Navbar.module.scss';

export const Navbar = () => {
  return (
    <div className={classes.container}>
      <div className={classes.container_logo}>
        <Logo />
      </div>

      <ul className={classes.container_list}>
        <li>
          <Link to="/survivor">Add Survivor</Link>
        </li>
        <li>
          <Link to="/location">Update Location</Link>
        </li>
        <li>
          <Link to="/flag">Flag Survivor</Link>
        </li>
        <li>
          <Link to="/trade">Trade Items</Link>
        </li>
        <li>
          <Link to="/reports">Reports</Link>
        </li>
      </ul>
    </div>
  );
};
