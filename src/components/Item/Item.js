import React from 'react';

import classes from './Item.module.scss';

export const Item = props => {
  return (
    <div className={classes.container}>
      <img src={props.icon} />
      <span>{props.itemName}</span>
    </div>
  );
};
