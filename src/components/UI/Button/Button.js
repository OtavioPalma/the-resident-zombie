import React from 'react';

import classes from './Button.module.scss';

export const Button = props => {
  return (
    <button
      onClick={props.handleClick}
      disabled={props.status}
      className={classes.button}
    >
      {props.content}
    </button>
  );
};
