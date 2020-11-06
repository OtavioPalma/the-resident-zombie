import React from 'react';

import classes from './IconButton.module.scss';

export const IconButton = props => {
  return (
    <button onClick={props.handleClick} className={classes.icon_button}>
      {props.content}
    </button>
  );
};
