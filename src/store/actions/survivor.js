import * as actionTypes from './actionTypes';
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

    axios
      .post('/people', payload.survivor)
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

    axios
      .get('/resources')
      .then(res => {
        dispatch(initSurvivorSuccess({ resources: res.data.data }));
      })
      .catch(err => {
        dispatch(initSurvivorFail({ error: err }));
      });
  };
};

export const fetchSurvivorsStart = () => ({
  type: actionTypes.FETCH_SURVIVORS_START,
});

export const fetchSurvivorsSuccess = payload => ({
  type: actionTypes.FETCH_SURVIVORS_SUCCESS,
  payload,
});

export const fetchSurvivorsFail = payload => ({
  type: actionTypes.FETCH_SURVIVORS_FAIL,
  payload,
});

export const fetchSurvivors = () => {
  return dispatch => {
    dispatch(fetchSurvivorsStart());

    axios
      .get('/people')
      .then(res => {
        dispatch(fetchSurvivorsSuccess({ survivors: res.data.data }));
      })
      .catch(err => {
        dispatch(fetchSurvivorsFail({ error: err }));
      });
  };
};

export const updateSurvivorStart = () => ({
  type: actionTypes.UPDATE_SURVIVOR_START,
});

export const updateSurvivorSuccess = () => ({
  type: actionTypes.UPDATE_SURVIVOR_SUCCESS,
});

export const updateSurvivorFail = payload => ({
  type: actionTypes.UPDATE_SURVIVOR_FAIL,
  payload,
});

export const updateSurvivor = payload => {
  return dispatch => {
    dispatch(updateSurvivorStart());

    axios
      .patch(`/people/${payload._id}`, payload)
      .then(() => {
        dispatch(updateSurvivorSuccess());
        dispatch(fetchSurvivors());
      })
      .catch(err => {
        dispatch(updateSurvivorFail({ error: err }));
      });
  };
};
