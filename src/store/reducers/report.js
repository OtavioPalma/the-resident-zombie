import * as actionTypes from '../actions/actionTypes';

const initialState = {
  error: null,
  loading: false,
  infected: null,
  nonInfected: null,
  inventory: null,
  points: null,
};

const fetchInfectedStart = state => ({
  ...state,
  error: null,
  loading: true,
});

const fetchInfectedSuccess = (state, payload) => ({
  ...state,
  error: null,
  loading: false,
  infected: payload.infected,
});

const fetchInfectedFail = (state, payload) => ({
  ...state,
  error: payload.error,
  loading: false,
  infected: null,
});

const fetchNonInfectedStart = state => ({
  ...state,
  error: null,
  loading: true,
});

const fetchNonInfectedSuccess = (state, payload) => ({
  ...state,
  error: null,
  loading: false,
  nonInfected: payload.nonInfected,
});

const fetchNonInfectedFail = (state, payload) => ({
  ...state,
  error: payload.error,
  loading: false,
  nonInfected: null,
});

const fetchInventoryStart = state => ({
  ...state,
  error: null,
  loading: true,
});

const fetchInventorySuccess = (state, payload) => ({
  ...state,
  error: null,
  loading: false,
  inventory: payload.inventory,
});

const fetchInventoryFail = (state, payload) => ({
  ...state,
  error: payload.error,
  loading: false,
  inventory: null,
});

const fetchLostPointsStart = state => ({
  ...state,
  error: null,
  loading: true,
});

const fetchLostPointsSuccess = (state, payload) => ({
  ...state,
  error: null,
  loading: false,
  points: payload.points,
});

const fetchLostPointsFail = (state, payload) => ({
  ...state,
  error: payload.error,
  loading: false,
  points: null,
});

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.FETCH_INFECTED_START:
      return fetchInfectedStart(state);
    case actionTypes.FETCH_INFECTED_SUCCESS:
      return fetchInfectedSuccess(state, payload);
    case actionTypes.FETCH_INFECTED_FAIL:
      return fetchInfectedFail(state, payload);
    case actionTypes.FETCH_NON_INFECTED_START:
      return fetchNonInfectedStart(state);
    case actionTypes.FETCH_NON_INFECTED_SUCCESS:
      return fetchNonInfectedSuccess(state, payload);
    case actionTypes.FETCH_NON_INFECTED_FAIL:
      return fetchNonInfectedFail(state, payload);
    case actionTypes.FETCH_INVENTORY_START:
      return fetchInventoryStart(state);
    case actionTypes.FETCH_INVENTORY_SUCCESS:
      return fetchInventorySuccess(state, payload);
    case actionTypes.FETCH_INVENTORY_FAIL:
      return fetchInventoryFail(state, payload);
    case actionTypes.FETCH_LOST_POINTS_START:
      return fetchLostPointsStart(state);
    case actionTypes.FETCH_LOST_POINTS_SUCCESS:
      return fetchLostPointsSuccess(state, payload);
    case actionTypes.FETCH_LOST_POINTS_FAIL:
      return fetchLostPointsFail(state, payload);
    default:
      return state;
  }
};

export default reducer;
