import React from 'react';

import classes from './SurvivorsList.module.scss';

import { SurvivorCard } from './SurvivorCard/SurvivorCard';

export const SurvivorsList = props => {
  return (
    <div className={classes.survivors_list}>
      {props.survivors?.map(survivor => (
        <SurvivorCard
          survivor={survivor}
          key={survivor._id}
          handleClick={() => props.handleClick(survivor)}
          fullInfo={props.fullInfo}
          selected={props.survivor?._id === survivor._id}
        />
      ))}
    </div>
  );
};
