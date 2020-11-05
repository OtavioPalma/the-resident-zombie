import React from 'react';
import { IconButton } from '../UI/IconButton/IconButton';
import { Item } from '../Item/Item';

import classes from './Resource.module.scss';

export const Resource = props => {
  return (
    <div className={classes.container}>
      <IconButton content="-" handleClick={props.handleDecrease} />

      <Item itemName={props.name} icon={props.icon} />

      <IconButton content="+" handleClick={props.handleIncrease} />

      <span className={classes.container_amount}>{props.amount}</span>
    </div>
  );
};
