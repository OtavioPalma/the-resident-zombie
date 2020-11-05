import * as actionTypes from './actionTypes';
import { v4 as uuid } from 'uuid';
import axios from '../../Axios';

export const addSurvivorStart = () => ({
  type: actionTypes.ADD_SURVIVOR_START,
});

export const addSurvivorSuccess = () => ({
  type: actionTypes.ADD_SURVIVOR_SUCCESS,
});

export const addSurvivorFail = payload => ({
  type: actionTypes.ADD_SURVIVOR_FAIL,
  payload,
});

export const addSurvivor = payload => {
  return dispatch => {
    dispatch(addSurvivorStart());

    const newSurvivor = {
      id: uuid(),
      ...payload.survivor,
    };

    axios
      .post('/people', newSurvivor)
      .then(() => {
        dispatch(addSurvivorSuccess());
      })
      .catch(err => {
        dispatch(addSurvivorFail({ error: err }));
      });
  };
};

export const initSurvivorStart = () => ({
  type: actionTypes.INIT_SURVIVOR_START,
});

export const initSurvivorSuccess = payload => ({
  type: actionTypes.INIT_SURVIVOR_SUCCESS,
  payload,
});

export const initSurvivorFail = payload => ({
  type: actionTypes.INIT_SURVIVOR_FAIL,
  payload,
});

export const initSurvivor = () => {
  return dispatch => {
    dispatch(initSurvivorStart());

    // eslint-disable-next-line no-undef
    Promise.all([axios.get('/genders'), axios.get('/resources')])
      .then(res => {
        dispatch(
          initSurvivorSuccess({ genders: res[0].data, resources: res[1].data }),
        );
      })
      .catch(err => {
        dispatch(initSurvivorFail({ error: err }));
      });
  };
};
