import React from 'react';

import classes from './TextField.module.scss';

export const TextField = props => {
  return (
    <span style={props.fullWidth && { flex: 1 }} className={classes.text_field}>
      {props.children}
    </span>
  );
};
