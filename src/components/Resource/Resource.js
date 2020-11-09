import React from 'react';
import { IconButton } from '../UI/IconButton/IconButton';
import { Item } from '../Item/Item';

import classes from './Resource.module.scss';
import { TextField } from '../UI/TextField/TextField';

export const Resource = props => {
  return (
    <div className={classes.resource}>
      <IconButton content="-" handleClick={props.handleDecrease} />

      <Item itemName={props.name} icon={props.icon} />

      <IconButton content="+" handleClick={props.handleIncrease} />

      <TextField>x{props.amount}</TextField>
    </div>
  );
};
