import React from 'react';

import classes from './SurvivorCard.module.scss';

import male from '../../../assets/icons/male.svg';
import female from '../../../assets/icons/female.svg';
import non_binary from '../../../assets/icons/non_binary.svg';

export const SurvivorCard = ({ survivor, handleClick, fullInfo, selected }) => {
  return (
    <div
      className={`${classes.survivor} ${selected && classes.selected}`}
      onClick={survivor?.infection < 5 ? handleClick : () => {}}
    >
      {survivor?.infection >= 5 && (
        <div className={classes.infected}>
          <span>INFECTED</span>
        </div>
      )}
      <div>
        <img
          className={classes.survivor_icon}
          src={
            survivor?.gender === 'male'
              ? male
              : survivor?.gender === 'female'
              ? female
              : non_binary
          }
        />
      </div>

      {fullInfo ? (
        <div>
          <div className={classes.survivor_line}>
            <span>Info:</span>
            <span>
              {survivor?.name}, {survivor?.age}
            </span>
          </div>

          <div className={classes.survivor_line}>
            <span>Location:</span>
            <span>
              {survivor?.latitude}, {survivor?.longitude}
            </span>
          </div>
        </div>
      ) : (
        <div className={classes.survivor_line}>
          <span>
            {survivor?.name}, {survivor?.age}
          </span>
        </div>
      )}
    </div>
  );
};
