import React from 'react';

import classes from './Header.module.scss';

export const Header = props => {
  return <div className={classes.header}>{props.children}</div>;
};
