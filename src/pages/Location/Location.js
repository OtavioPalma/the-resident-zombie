import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import classes from './Location.module.scss';
import * as actions from '../../store/actions/index';

import { Spinner } from '../../components/UI/Spinner/Spinner';
import { Input } from '../../components/UI/Input/Input';
import { SurvivorCard } from '../../components/SurvivorCard/SurvivorCard';
import { Button } from '../../components/UI/Button/Button';

export const Location = () => {
  const [survivor, setSurvivor] = useState(null);
  const [invalid, setInvalid] = useState(['init']);

  /* Redux Selectors */
  const loading = useSelector(state => state.survivor.loading);
  const survivors = useSelector(state => state.survivor.survivors);

  /* Redux Dispatchers */
  const dispatch = useDispatch();
  const onFetchSurvivors = () => dispatch(actions.fetchSurvivors());
  const onUpdateSurvivor = survivor =>
    dispatch(actions.updateSurvivor(survivor));

  useEffect(() => {
    onFetchSurvivors();
  }, []);

  useEffect(() => {
    if (invalid.length === 0) {
      onUpdateSurvivor(survivor);
      setSurvivor(null);
    }
  }, [invalid]);

  const handleSurvivor = survivor => {
    setSurvivor(survivor);
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setSurvivor({ ...survivor, [name]: value });
  };

  const handleSubmit = () => {
    setInvalid(Object.keys(survivor).filter(field => !survivor[field]));
  };

  return (
    <div className={classes.container}>
      <span className={classes.container_title}>Update your Location</span>

      <span className={classes.container_subtitle}>
        Update your current location so others can find you!
      </span>

      {loading && <Spinner />}

      {survivors && (
        <div className={classes.container_card}>
          <div>
            <span className={classes.container_card__title}>
              Survivors List
            </span>

            <div className={classes.container_card__list}>
              {survivors.map(survivor => (
                <SurvivorCard
                  survivor={survivor}
                  key={survivor.id}
                  handleClick={() => handleSurvivor(survivor)}
                />
              ))}
            </div>
          </div>

          <div>
            <span className={classes.container_card__title}>
              Survivor Location
            </span>

            {!survivor && (
              <span className={classes.container_card__subtitle}>
                Select yourself upon the list to update your location
              </span>
            )}

            {survivor && (
              <Fragment>
                <div className={classes.container_card__survivor}>
                  <div className={classes.container_card__survivor_input}>
                    <span>
                      {survivor.name}, {survivor.age}
                    </span>
                  </div>

                  <div className={classes.container_card__survivor_input}>
                    <span>Lat</span>
                    <Input
                      name="lat"
                      type={'number'}
                      inputValue={survivor.lat}
                      handleChange={handleChange}
                      error={invalid}
                    />
                  </div>

                  <div className={classes.container_card__survivor_input}>
                    <span>Long</span>
                    <Input
                      name="long"
                      type={'number'}
                      inputValue={survivor.long}
                      handleChange={handleChange}
                      error={invalid}
                    />
                  </div>
                </div>

                <div className={classes.container_card__actions}>
                  <Button
                    content="Save"
                    status={loading}
                    handleClick={handleSubmit}
                  />
                </div>
              </Fragment>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
