import * as actionTypes from './actionTypes';
import axios from '../../Axios';

export const fetchInfectedStart = () => ({
  type: actionTypes.FETCH_INFECTED_START,
});

export const fetchInfectedSuccess = payload => ({
  type: actionTypes.FETCH_INFECTED_SUCCESS,
  payload,
});

export const fetchInfectedFail = payload => ({
  type: actionTypes.FETCH_INFECTED_FAIL,
  payload,
});

export const fetchInfected = () => {
  return dispatch => {
    dispatch(fetchInfectedStart());

    axios
      .get('/report/infected')
      .then(res => {
        dispatch(fetchInfectedSuccess({ infected: res.data.data }));
      })
      .catch(err => {
        dispatch(fetchInfectedFail({ error: err }));
      });
  };
};

export const fetchNonInfectedStart = () => ({
  type: actionTypes.FETCH_NON_INFECTED_START,
});

export const fetchNonInfectedSuccess = payload => ({
  type: actionTypes.FETCH_NON_INFECTED_SUCCESS,
  payload,
});

export const fetchNonInfectedFail = payload => ({
  type: actionTypes.FETCH_NON_INFECTED_FAIL,
  payload,
});

export const fetchNonInfected = () => {
  return dispatch => {
    dispatch(fetchNonInfectedStart());

    axios
      .get('/report/non_infected')
      .then(res => {
        dispatch(fetchNonInfectedSuccess({ nonInfected: res.data.data }));
      })
      .catch(err => {
        dispatch(fetchNonInfectedFail({ error: err }));
      });
  };
};

export const fetchInventoryStart = () => ({
  type: actionTypes.FETCH_INVENTORY_START,
});

export const fetchInventorySuccess = payload => ({
  type: actionTypes.FETCH_INVENTORY_SUCCESS,
  payload,
});

export const fetchInventoryFail = payload => ({
  type: actionTypes.FETCH_INVENTORY_FAIL,
  payload,
});

export const fetchInventory = () => {
  return dispatch => {
    dispatch(fetchInventoryStart());

    axios
      .get('/report/people_inventory')
      .then(res => {
        dispatch(fetchInventorySuccess({ inventory: res.data.data }));
      })
      .catch(err => {
        dispatch(fetchInventoryFail({ error: err }));
      });
  };
};

export const fetchLostPointsStart = () => ({
  type: actionTypes.FETCH_LOST_POINTS_START,
});

export const fetchLostPointsSuccess = payload => ({
  type: actionTypes.FETCH_LOST_POINTS_SUCCESS,
  payload,
});

export const fetchLostPointsFail = payload => ({
  type: actionTypes.FETCH_LOST_POINTS_FAIL,
  payload,
});

export const fetchLostPoints = () => {
  return dispatch => {
    dispatch(fetchLostPointsStart());

    axios
      .get('/report/infected_points')
      .then(res => {
        dispatch(fetchLostPointsSuccess({ points: res.data.data }));
      })
      .catch(err => {
        dispatch(fetchLostPointsFail({ error: err }));
      });
  };
};
