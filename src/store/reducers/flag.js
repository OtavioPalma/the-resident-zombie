import * as actionTypes from '../actions/actionTypes';

const initialState = {
  error: null,
  loading: false,
  reports: null,
  suspect: null,
};

const flagSurvivorStart = state => ({
  ...state,
  error: null,
  loading: true,
  suspect: null,
});

const flagSurvivorSuccess = (state, payload) => ({
  ...state,
  error: null,
  loading: false,
  suspect: payload.suspect,
});

const flagSurvivorFail = (state, payload) => ({
  ...state,
  error: payload.error,
  loading: false,
  suspect: null,
});

const flagSurvivorReset = state => ({
  ...state,
  suspect: null,
});

const fetchSurvivorReportsStart = state => ({
  ...state,
  error: null,
  loading: true,
  reports: null,
});

const fetchSurvivorReportsSuccess = (state, payload) => ({
  ...state,
  error: null,
  loading: false,
  reports: payload.reports,
});

const fetchSurvivorReportsFail = (state, payload) => ({
  ...state,
  error: payload.error,
  loading: false,
  reports: null,
});

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.FLAG_SURVIVOR_START:
      return flagSurvivorStart(state);
    case actionTypes.FLAG_SURVIVOR_SUCCESS:
      return flagSurvivorSuccess(state, payload);
    case actionTypes.FLAG_SURVIVOR_FAIL:
      return flagSurvivorFail(state, payload);
    case actionTypes.FLAG_SURVIVOR_RESET:
      return flagSurvivorReset(state);
    case actionTypes.FETCH_SURVIVOR_REPORTS_START:
      return fetchSurvivorReportsStart(state);
    case actionTypes.FETCH_SURVIVOR_REPORTS_SUCCESS:
      return fetchSurvivorReportsSuccess(state, payload);
    case actionTypes.FETCH_SURVIVOR_REPORTS_FAIL:
      return fetchSurvivorReportsFail(state, payload);
    default:
      return state;
  }
};

export default reducer;
