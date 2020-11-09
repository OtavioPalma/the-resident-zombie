import React from 'react';

import classes from './Item.module.scss';

export const Item = props => {
  return (
    <div className={classes.item} onClick={props.handleClick}>
      <img src={props.icon} />
      <span className={classes.item_name}>{props.itemName}</span>
      {props.amount > -1 && (
        <span className={classes.item_amount}>{props.amount}</span>
      )}
    </div>
  );
};
