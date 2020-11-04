import React, { useState } from 'react';

import { Input } from '../../components/UI/Input/Input';
import { Select } from '../../components/UI/Select/Select';

import classes from './Survivor.module.scss';

import fiji_water from '../../assets/icons/fiji_water.svg';
import campbell_soup from '../../assets/icons/campbell_soup.svg';
import first_aid from '../../assets/icons/first_aid.svg';
import ak_47 from '../../assets/icons/ak_47.svg';
import { IconButton } from '../../components/UI/IconButton/IconButton';
import { Button } from '../../components/UI/Button/Button';
import { Item } from '../../components/Item/Item';

export const Survivor = () => {
  const [survivor, setSurvivor] = useState({
    name: '',
    age: '',
    gender: '',
    lat: '',
    long: '',
    inventory: [
      {
        name: 'Fiji Water',
        icon: fiji_water,
        amount: 0,
      },
      {
        name: 'Campbell Soup',
        icon: campbell_soup,
        amount: 0,
      },
      {
        name: 'First Aid',
        icon: first_aid,
        amount: 0,
      },
      {
        name: 'AK47',
        icon: ak_47,
        amount: 0,
      },
    ],
  });

  const options = [
    {
      name: 'Survivor Gender',
      value: '',
    },
    {
      name: 'Male',
      value: 'male',
    },
    {
      name: 'Female',
      value: 'female',
    },
    {
      name: 'Non Binary',
      value: 'non_binary',
    },
  ];

  const handleChange = event => {
    const { name, value } = event.target;

    setSurvivor({ ...survivor, [name]: value });
  };

  const handleDecrease = index => {
    const inventoryCopy = [...survivor.inventory];
    if (inventoryCopy[index].amount > 0) inventoryCopy[index].amount--;

    setSurvivor({ ...survivor, inventory: [...inventoryCopy] });
  };

  const handleIncrease = index => {
    const inventoryCopy = [...survivor.inventory];
    if (inventoryCopy[index].amount < 100) inventoryCopy[index].amount++;

    setSurvivor({ ...survivor, inventory: [...inventoryCopy] });
  };

  return (
    <div className={classes.container}>
      <span className={classes.container_title}>Register as a Survivor</span>

      <span className={classes.container_subtitle}>
        Are you healthy and have items to trade? Connect with thousand of
        survivors!
      </span>

      <div className={classes.container_card}>
        <div className={classes.container_card__form}>
          <span className={classes.container_card__title}>Information</span>

          <Input
            name="name"
            type={'text'}
            placeholder={'Survivor Name'}
            inputValue={survivor.name}
            handleChange={handleChange}
          />

          <Input
            name="age"
            type={'number'}
            placeholder={'Survivor Age'}
            inputValue={survivor.age}
            handleChange={handleChange}
          />

          <Select
            name="gender"
            handleChange={handleChange}
            value={survivor.gender}
            options={options}
          />

          <Input
            name="lat"
            type={'number'}
            placeholder={'Latitude'}
            inputValue={survivor.lat}
            handleChange={handleChange}
          />

          <Input
            name="long"
            type={'number'}
            placeholder={'Longitude'}
            inputValue={survivor.long}
            handleChange={handleChange}
          />
        </div>

        <div className={classes.container_card__inventory}>
          <span className={classes.container_card__title}>Inventory</span>

          {survivor.inventory.map((item, index) => (
            <div key={item.name} className={classes.container_card__counter}>
              <IconButton
                content="-"
                handleClick={() => handleDecrease(index)}
              />

              <Item itemName={item.name} icon={item.icon} />

              <IconButton
                content="+"
                handleClick={() => handleIncrease(index)}
              />

              <span className={classes.container_card__amount}>
                {item.amount}
              </span>
            </div>
          ))}
        </div>

        <div className={classes.container_actions}>
          <Button content="Create" />
        </div>
      </div>
    </div>
  );
};
