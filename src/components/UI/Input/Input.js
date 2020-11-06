import React from 'react';

import classes from './Input.module.scss';

export const Input = props => {
  return (
    <div className={classes.input}>
      <input
        name={props.name}
        className={`${props.error.includes(props.name) && classes.input_error}`}
        type={props.type}
        placeholder={props.placeholder}
        value={props.inputValue}
        onChange={props.handleChange}
      />
      {props.error.includes(props.name) && (
        <label className={classes.input_text}>Required field!</label>
      )}
    </div>
  );
};
