import * as actionTypes from '../actions/actionTypes';

const initialState = {
  error: null,
  loading: false,
  genders: null,
  resources: null,
  success: null,
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
    default:
      return state;
  }
};

export default reducer;
