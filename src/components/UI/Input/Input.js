import React from 'react';

import classes from './Input.module.scss';

export const Input = props => {
  return (
    <input
      name={props.name}
      className={classes.input}
      type={props.type}
      placeholder={props.placeholder}
      value={props.inputValue}
      onChange={props.handleChange}
    />
  );
};
