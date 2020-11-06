import * as actionTypes from '../actions/actionTypes';

const initialState = {
  error: null,
  loading: false,
  success: null,
  reports: null,
};

const flagSurvivorStart = state => ({
  ...state,
  error: null,
  loading: true,
  success: null,
});

const flagSurvivorSuccess = state => ({
  ...state,
  error: null,
  loading: false,
  success: true,
});

const flagSurvivorFail = (state, payload) => ({
  ...state,
  error: payload.error,
  loading: false,
  success: null,
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
      return flagSurvivorSuccess(state);
    case actionTypes.FLAG_SURVIVOR_FAIL:
      return flagSurvivorFail(state, payload);
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
