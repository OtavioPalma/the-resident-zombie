import * as actionTypes from '../actions/actionTypes';

const initialState = {
  error: null,
  loading: false,
  genders: null,
  resources: null,
  success: null,
  survivors: null,
};

const addSurvivorStart = state => ({
  ...state,
  error: null,
  loading: true,
  success: null,
});

const addSurvivorSuccess = state => ({
  ...state,
  error: null,
  loading: false,
  success: true,
});

const addSurvivorFail = (state, payload) => ({
  ...state,
  error: payload.error,
  loading: false,
  success: null,
});

const initSurvivorStart = state => ({
  ...state,
  error: null,
  loading: true,
  success: null,
  genders: null,
  resources: null,
});

const initSurvivorSuccess = (state, payload) => ({
  ...state,
  error: null,
  loading: false,
  genders: payload.genders,
  resources: payload.resources,
});

const initSurvivorFail = (state, payload) => ({
  ...state,
  error: payload.error,
  loading: false,
});

const fetchSurvivorsStart = state => ({
  ...state,
  error: null,
  loading: true,
  survivors: null,
});

const fetchSurvivorsSuccess = (state, payload) => ({
  ...state,
  error: null,
  loading: false,
  survivors: payload.survivors,
});

const fetchSurvivorsFail = (state, payload) => ({
  ...state,
  error: payload.error,
  loading: false,
});

const updateSurvivorStart = state => ({
  ...state,
  error: null,
  loading: true,
  success: null,
});

const updateSurvivorSuccess = state => ({
  ...state,
  error: null,
  success: true,
});

const updateSurvivorFail = (state, payload) => ({
  ...state,
  error: payload.error,
  success: null,
});

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.ADD_SURVIVOR_START:
      return addSurvivorStart(state);
    case actionTypes.ADD_SURVIVOR_SUCCESS:
      return addSurvivorSuccess(state);
    case actionTypes.ADD_SURVIVOR_FAIL:
      return addSurvivorFail(state, payload);
    case actionTypes.INIT_SURVIVOR_START:
      return initSurvivorStart(state);
    case actionTypes.INIT_SURVIVOR_SUCCESS:
      return initSurvivorSuccess(state, payload);
    case actionTypes.INIT_SURVIVOR_FAIL:
      return initSurvivorFail(state, payload);
    case actionTypes.FETCH_SURVIVORS_START:
      return fetchSurvivorsStart(state);
    case actionTypes.FETCH_SURVIVORS_SUCCESS:
      return fetchSurvivorsSuccess(state, payload);
    case actionTypes.FETCH_SURVIVORS_FAIL:
      return fetchSurvivorsFail(state, payload);
    case actionTypes.UPDATE_SURVIVOR_START:
      return updateSurvivorStart(state);
    case actionTypes.UPDATE_SURVIVOR_SUCCESS:
      return updateSurvivorSuccess(state);
    case actionTypes.UPDATE_SURVIVOR_FAIL:
      return updateSurvivorFail(state, payload);
    default:
      return state;
  }
};

export default reducer;
