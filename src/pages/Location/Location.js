import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import classes from './Location.module.scss';
import * as actions from '../../store/actions/index';

import { Toast } from '../../shared/Toast/Toast';
import { Spinner } from '../../shared/Spinner/Spinner';
import { Input } from '../../components/UI/Input/Input';
import { Button } from '../../components/UI/Button/Button';
import { TextField } from '../../components/UI/TextField/TextField';
import { Card } from '../../components/UI/Card/Card';
import { Header } from '../../components/UI/Header/Header';
import { SurvivorsList } from '../../components/SurvivorsList/SurvivorsList';

export const Location = () => {
  /* Local State */
  const [survivor, setSurvivor] = useState(null);
  const [invalid, setInvalid] = useState(['init']);

  /* Redux Selectors */
  const loading = useSelector(state => state.survivor.loading);
  const error = useSelector(state => state.survivor.error);
  const survivors = useSelector(state => state.survivor.survivors);

  /* Redux Dispatchers */
  const dispatch = useDispatch();
  const onFetchSurvivors = () => dispatch(actions.fetchSurvivors());
  const onUpdateSurvivor = survivor =>
    dispatch(actions.updateSurvivor(survivor));

  /**
   * Fetches the list of survivors on page load
   */
  useEffect(() => {
    onFetchSurvivors();
  }, []);

  /**
   * Checks if any field is empty and/or invalid before we proceed to update
   * the survivor location, then, resets the local state
   */
  useEffect(() => {
    if (invalid.length === 0) {
      onUpdateSurvivor(survivor);
      setSurvivor(null);
    }
  }, [invalid]);

  /**
   * Sets the selected survivor to change it's location
   * @param  {Survivor} survivor The selected survivor from the list
   */
  const handleSurvivor = survivor => {
    setSurvivor(survivor);
  };

  /**
   * Sets the latitude or longitude values on local state
   * @param  {Event} event The user type event
   */
  const handleChange = event => {
    const { name, value } = event.target;
    setSurvivor({ ...survivor, [name]: value });
  };

  /**
   * Iterate through the form fields to check if there is any invalid one
   */
  const handleSubmit = () => {
    setInvalid(
      Object.keys(survivor).filter(
        field => survivor[field] === null || survivor[field] === '',
      ),
    );
  };

  return (
    <div className="container">
      <Header>
        <span>Update your Location</span>

        <span>Update your current location so others can find you!</span>
      </Header>

      {
        /**
         * If something went wrong with the update we show to the user a
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
        !loading && survivors && (
          <Card grid="3fr 2fr">
            <div>
              <span> Survivors List </span>

              <SurvivorsList
                fullInfo
                survivor={survivor}
                survivors={survivors}
                handleClick={handleSurvivor}
              />
            </div>

            <div>
              <span> Survivor Location </span>

              {
                /**
                 * Shows the user a message to select a survivor on the list
                 *  to proceed with the update
                 */
                !survivor && (
                  <span>
                    Select yourself upon the list to update your location
                  </span>
                )
              }

              {
                /**
                 * If the user selected a survivor from the list show the form
                 * to update the survivor location
                 */
                survivor && (
                  <Fragment>
                    <div className={classes.card_survivor}>
                      <TextField>
                        {survivor.name}, {survivor.age}
                      </TextField>

                      <div className={classes.card_survivor__input}>
                        <TextField fullWidth>Lat</TextField>
                        <Input
                          name="latitude"
                          type={'number'}
                          inputValue={survivor.latitude}
                          handleChange={handleChange}
                          error={invalid}
                        />
                      </div>

                      <div className={classes.card_survivor__input}>
                        <TextField fullWidth>Long</TextField>
                        <Input
                          name="longitude"
                          type={'number'}
                          inputValue={survivor.longitude}
                          handleChange={handleChange}
                          error={invalid}
                        />
                      </div>
                    </div>

                    <Button
                      content="Save"
                      status={loading}
                      handleClick={handleSubmit}
                    />
                  </Fragment>
                )
              }
            </div>
          </Card>
        )
      }
    </div>
  );
};
