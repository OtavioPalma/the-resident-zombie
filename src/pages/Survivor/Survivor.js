import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import classes from './Survivor.module.scss';
import * as actions from '../../store/actions/index';

import { Input } from '../../components/UI/Input/Input';
import { Select } from '../../components/UI/Select/Select';
import { Button } from '../../components/UI/Button/Button';
import { Spinner } from '../../components/UI/Spinner/Spinner';

import fiji_water from '../../assets/icons/fiji_water.svg';
import campbell_soup from '../../assets/icons/campbell_soup.svg';
import first_aid from '../../assets/icons/first_aid.svg';
import ak_47 from '../../assets/icons/ak_47.svg';
import { Resource } from '../../components/Resource/Resource';
import { Toast } from '../../components/UI/Toast/Toast';

export const Survivor = () => {
  const [survivor, setSurvivor] = useState({
    name: '',
    age: '',
    gender: '',
    lat: '',
    long: '',
    inventory: [],
  });
  const [invalid, setInvalid] = useState(['init']);

  /* Redux Selectors */
  const loading = useSelector(state => state.survivor.loading);
  const error = useSelector(state => state.survivor.error);
  const genders = useSelector(state => state.survivor.genders);
  const resources = useSelector(state => state.survivor.resources);
  const success = useSelector(state => state.survivor.success);

  /* Redux Dispatchers */
  const dispatch = useDispatch();
  const onInitSurvivor = () => dispatch(actions.initSurvivor());
  const onAddSurvivor = survivor => dispatch(actions.addSurvivor({ survivor }));

  useEffect(() => {
    onInitSurvivor();
  }, []);

  useEffect(() => {
    resources &&
      setSurvivor({
        ...survivor,
        inventory: resources.map(res => ({ ...res, amount: 0 })),
      });
  }, [resources]);

  useEffect(() => {
    if (invalid.length === 0) {
      onAddSurvivor(survivor);
      setSurvivor({
        name: '',
        age: '',
        gender: '',
        lat: '',
        long: '',
        inventory: [],
      });
      onInitSurvivor();
    }
  }, [invalid]);

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

  const handleSubmit = () => {
    setInvalid(Object.keys(survivor).filter(field => !survivor[field]));
  };

  return (
    <div className={classes.container}>
      <span className={classes.container_title}>Register as a Survivor</span>

      {success && <Toast message={'Survivor Registered!'} type="success" />}
      {error && <Toast message={`Error: ${error}`} type="error" />}

      <span className={classes.container_subtitle}>
        Are you healthy and have items to trade? Connect with thousand of
        survivors!
      </span>

      {loading && <Spinner />}

      {genders && resources && (
        <div className={classes.container_card}>
          <div className={classes.container_card__form}>
            <span className={classes.container_card__title}>Information</span>

            <Input
              name="name"
              type={'text'}
              placeholder={'Survivor Name'}
              inputValue={survivor.name}
              handleChange={handleChange}
              error={invalid}
            />

            <Input
              name="age"
              type={'number'}
              placeholder={'Survivor Age'}
              inputValue={survivor.age}
              handleChange={handleChange}
              error={invalid}
            />

            <Select
              name="gender"
              handleChange={handleChange}
              value={survivor.gender}
              options={genders}
              error={invalid}
            />

            <Input
              name="lat"
              type={'number'}
              placeholder={'Latitude'}
              inputValue={survivor.lat}
              handleChange={handleChange}
              error={invalid}
            />

            <Input
              name="long"
              type={'number'}
              placeholder={'Longitude'}
              inputValue={survivor.long}
              handleChange={handleChange}
              error={invalid}
            />
          </div>

          <div className={classes.container_card__inventory}>
            <span className={classes.container_card__title}>Inventory</span>

            <Resource
              handleDecrease={() => handleDecrease(0)}
              handleIncrease={() => handleIncrease(0)}
              name="Fiji Water"
              icon={fiji_water}
              amount={survivor?.inventory[0]?.amount}
            />

            <Resource
              handleDecrease={() => handleDecrease(1)}
              handleIncrease={() => handleIncrease(1)}
              name="Campbell Soup"
              icon={campbell_soup}
              amount={survivor?.inventory[1]?.amount}
            />

            <Resource
              handleDecrease={() => handleDecrease(2)}
              handleIncrease={() => handleIncrease(2)}
              name="First Aid"
              icon={first_aid}
              amount={survivor?.inventory[2]?.amount}
            />

            <Resource
              handleDecrease={() => handleDecrease(3)}
              handleIncrease={() => handleIncrease(3)}
              name="AK47"
              icon={ak_47}
              amount={survivor?.inventory[3]?.amount}
            />
          </div>

          <div className={classes.container_actions}>
            <Button
              content="Create"
              status={loading}
              handleClick={handleSubmit}
            />
          </div>
        </div>
      )}
    </div>
  );
};
