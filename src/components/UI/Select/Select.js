import React from 'react';

import classes from './Select.module.scss';

export const Select = props => {
  return (
    <select
      name={props.name}
      className={classes.select}
      onChange={props.handleChange}
      value={props.inputValue}
    >
      {props.options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  );
};
