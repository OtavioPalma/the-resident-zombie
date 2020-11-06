import React from 'react';

import classes from './Card.module.scss';

export const Card = props => {
  return (
    <div
      className={classes.card}
      style={{ gridTemplateColumns: `${props.grid}` }}
    >
      {props.children}
    </div>
  );
};
