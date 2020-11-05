import React from 'react';

import classes from './Select.module.scss';

export const Select = props => {
  return (
    <div className={classes.container}>
      <select
        name={props.name}
        className={`${classes.select} ${
          props.error.includes(props.name) && classes.select_error
        }`}
        onChange={props.handleChange}
        value={props.inputValue}
      >
        {props.options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
      {props.error.includes(props.name) && (
        <label className={classes.error}>Required field!</label>
      )}
    </div>
  );
};
