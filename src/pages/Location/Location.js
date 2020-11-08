import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import classes from './Location.module.scss';
import * as actions from '../../store/actions/index';

import { Spinner } from '../../components/UI/Spinner/Spinner';
import { Input } from '../../components/UI/Input/Input';
import { Button } from '../../components/UI/Button/Button';
import { Toast } from '../../components/UI/Toast/Toast';
import { TextField } from '../../components/UI/TextField/TextField';
import { Card } from '../../components/UI/Card/Card';
import { Header } from '../../components/UI/Header/Header';
import { SurvivorsList } from '../../components/SurvivorsList/SurvivorsList';

export const Location = () => {
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
    <div className="container">
      <Header>
        <span>Update your Location</span>

        <span>Update your current location so others can find you!</span>
      </Header>

      {error && <Toast message={`Error: ${error}`} type="error" />}

      {loading && <Spinner />}

      {!loading && survivors && (
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

            {!survivor && (
              <span>Select yourself upon the list to update your location</span>
            )}

            {survivor && (
              <Fragment>
                <div className={classes.card_survivor}>
                  <TextField>
                    {survivor.name}, {survivor.age}
                  </TextField>

                  <div className={classes.card_survivor__input}>
                    <TextField fullWidth>Lat</TextField>
                    <Input
                      name="lat"
                      type={'number'}
                      inputValue={survivor.lat}
                      handleChange={handleChange}
                      error={invalid}
                    />
                  </div>

                  <div className={classes.card_survivor__input}>
                    <TextField fullWidth>Long</TextField>
                    <Input
                      name="long"
                      type={'number'}
                      inputValue={survivor.long}
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
            )}
          </div>
        </Card>
      )}
    </div>
  );
};
