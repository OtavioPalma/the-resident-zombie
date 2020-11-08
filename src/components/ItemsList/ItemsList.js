import React from 'react';
import { Item } from '../Item/Item';

import classes from './ItemsList.module.scss';

import fiji_water from '../../assets/icons/fiji_water.svg';
import campbell_soup from '../../assets/icons/campbell_soup.svg';
import first_aid from '../../assets/icons/first_aid.svg';
import ak_47 from '../../assets/icons/ak_47.svg';

export const ItemsList = ({ title, inventory, handleClick }) => {
  return (
    <div className={classes.items}>
      <span className={classes.title}>{title}</span>
      <Item
        itemName={'Fiji Water (14)'}
        icon={fiji_water}
        amount={inventory[0]?.amount}
        handleClick={() => handleClick(0)}
      />
      <Item
        itemName={'Cambpell Soup (12)'}
        icon={campbell_soup}
        amount={inventory[1]?.amount}
        handleClick={() => handleClick(1)}
      />
      <Item
        itemName={'First Aid (10)'}
        icon={first_aid}
        amount={inventory[2]?.amount}
        handleClick={() => handleClick(2)}
      />
      <Item
        itemName={'AK47 (8)'}
        icon={ak_47}
        amount={inventory[3]?.amount}
        handleClick={() => handleClick(3)}
      />
    </div>
  );
};
