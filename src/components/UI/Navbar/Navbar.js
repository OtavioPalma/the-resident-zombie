import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';

import { Logo } from '../Logo/Logo';

import classes from './Navbar.module.scss';

export const Navbar = withRouter(props => {
  // Redirects User to Home Page on Logo Click
  const handleClick = () => {
    props.history.push('/');
  };

  return (
    <div className={classes.navbar}>
      <div className={classes.navbar_logo}>
        <Logo handleClick={handleClick} />
      </div>

      <ul className={classes.navbar_list}>
        <li>
          <NavLink to="/survivor">Add Survivor</NavLink>
        </li>
        <li>
          <NavLink to="/location">Update Location</NavLink>
        </li>
        <li>
          <NavLink to="/flag">Flag Survivor</NavLink>
        </li>
        <li>
          <NavLink to="/trade">Trade Items</NavLink>
        </li>
        <li>
          <NavLink to="/reports">Reports</NavLink>
        </li>
      </ul>
    </div>
  );
});
