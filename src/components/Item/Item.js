import React from 'react';

import classes from './Item.module.scss';

export const Item = props => {
  return (
    <div className={classes.container} onClick={props.handleClick}>
      <img src={props.icon} />
      <span className={classes.container_name}>{props.itemName}</span>
      {props.amount > -1 && (
        <span className={classes.container_amount}>{props.amount}</span>
      )}
    </div>
  );
};
