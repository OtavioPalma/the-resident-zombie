import React from 'react';

import classes from './Input.module.scss';

export const Input = props => {
  return (
    <div className={classes.container}>
      <input
        name={props.name}
        className={`${classes.input} ${
          props.error.includes(props.name) && classes.input_error
        }`}
        type={props.type}
        placeholder={props.placeholder}
        value={props.inputValue}
        onChange={props.handleChange}
      />
      {props.error.includes(props.name) && (
        <label className={classes.error}>Required field!</label>
      )}
    </div>
  );
};
