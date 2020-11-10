import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import classes from './Survivor.module.scss';
import * as actions from '../../store/actions/index';

import { Toast } from '../../shared/Toast/Toast';
import { Spinner } from '../../shared/Spinner/Spinner';
import { Input } from '../../components/UI/Input/Input';
import { Select } from '../../components/UI/Select/Select';
import { Button } from '../../components/UI/Button/Button';
import { Resource } from '../../components/Resource/Resource';
import { Card } from '../../components/UI/Card/Card';
import { Header } from '../../components/UI/Header/Header';

import fiji_water from '../../assets/icons/fiji_water.svg';
import campbell_soup from '../../assets/icons/campbell_soup.svg';
import first_aid from '../../assets/icons/first_aid.svg';
import ak_47 from '../../assets/icons/ak_47.svg';

export const Survivor = () => {
  /* Local State */
  const [survivor, setSurvivor] = useState({
    name: '',
    age: '',
    gender: '',
    latitude: '',
    longitude: '',
    inventory: [],
  });
  const [invalid, setInvalid] = useState(['init']);

  /* Constants and Variables */
  const genders = [
    { name: 'Survivor Gender', value: '' },
    { name: 'Male', value: 'male' },
    { name: 'Female', value: 'female' },
    { name: 'Non Binary', value: 'non_binary' },
  ];

  /* Redux Selectors */
  const loading = useSelector(state => state.survivor.loading);
  const error = useSelector(state => state.survivor.error);
  const resources = useSelector(state => state.survivor.resources);

  /* Redux Dispatchers */
  const dispatch = useDispatch();
  const onInitSurvivor = () => dispatch(actions.initSurvivor());
  const onAddSurvivor = survivor => dispatch(actions.addSurvivor({ survivor }));

  /**
   * Fetches the list of resources on page load
   */
  useEffect(() => {
    onInitSurvivor();
  }, []);

  /**
   * When the resources fetch ends whe map the object array with the initial
   * amount of zero (every time the above method is called)
   */
  useEffect(() => {
    resources &&
      setSurvivor({
        ...survivor,
        inventory: resources.map(res => ({
          resourceId: res._id,
          name: res.name,
          amount: 0,
        })),
      });
  }, [resources]);

  /**
   * Checks if any field is empty and/or invalid before we proceed to create
   * a survivor, then, resets the local state and fetches the resource list
   */
  useEffect(() => {
    if (invalid.length === 0) {
      onAddSurvivor(survivor);
      setSurvivor({
        name: '',
        age: '',
        gender: '',
        latitude: '',
        longitude: '',
        inventory: [],
      });
      onInitSurvivor();
    }
  }, [invalid]);

  /**
   * Sets the field value on local state
   * @param  {Event} event The user type event
   */
  const handleChange = event => {
    const { name, value } = event.target;
    setSurvivor({ ...survivor, [name]: value });
  };

  /**
   * Decreases the item count (min of 0)
   * @param  {Number} index The item index
   */
  const handleDecrease = index => {
    const inventoryCopy = [...survivor.inventory];
    if (inventoryCopy[index].amount > 0) inventoryCopy[index].amount--;
    setSurvivor({ ...survivor, inventory: [...inventoryCopy] });
  };

  /**
   * Increases the item count (max of 100)
   * @param  {Number} index The item index
   */
  const handleIncrease = index => {
    const inventoryCopy = [...survivor.inventory];
    if (inventoryCopy[index].amount < 100) inventoryCopy[index].amount++;
    setSurvivor({ ...survivor, inventory: [...inventoryCopy] });
  };

  /**
   * Iterate through the form fields to check if there is any invalid one
   */
  const handleSubmit = () => {
    setInvalid(Object.keys(survivor).filter(field => !survivor[field]));
  };

  return (
    <div className="container">
      <Header>
        <span>Register as a Survivor</span>

        <span>
          Are you healthy and have items to trade? Connect with thousand of
          survivors!
        </span>
      </Header>

      {
        /**
         * If something went wrong with any request we show the user a
         * friendly toast
         */
        error && <Toast message={`Error: ${error}`} type="error" />
      }

      {
        /**
         * While fetching our async data show the user a friendly spinner
         */
        loading && <Spinner />
      }

      {
        /**
         * After the loading show the content with the fetched data
         */
        resources && (
          <Card grid="1fr 1fr">
            <div>
              <span>Information</span>

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
                name="latitude"
                type={'number'}
                placeholder={'Latitude'}
                inputValue={survivor.latitude}
                handleChange={handleChange}
                error={invalid}
              />

              <Input
                name="longitude"
                type={'number'}
                placeholder={'Longitude'}
                inputValue={survivor.longitude}
                handleChange={handleChange}
                error={invalid}
              />
            </div>

            <div className={classes.card_inventory}>
              <span>Inventory</span>

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

              <Button
                content="Create"
                status={loading}
                handleClick={handleSubmit}
              />
            </div>
          </Card>
        )
      }
    </div>
  );
};
