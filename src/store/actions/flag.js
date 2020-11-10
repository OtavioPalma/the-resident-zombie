import * as actionTypes from './actionTypes';
import axios from '../../Axios';

export const flagSurvivorStart = () => ({
  type: actionTypes.FLAG_SURVIVOR_START,
});

export const flagSurvivorSuccess = payload => ({
  type: actionTypes.FLAG_SURVIVOR_SUCCESS,
  payload,
});

export const flagSurvivorFail = payload => ({
  type: actionTypes.FLAG_SURVIVOR_FAIL,
  payload,
});

export const flagSurvivor = payload => {
  return dispatch => {
    dispatch(flagSurvivorStart());

    const newFlag = {
      infectedId: payload.suspect._id,
    };

    axios
      .post(`/people/${payload.witness._id}/infections`, newFlag)
      .then(res => {
        dispatch(
          flagSurvivorSuccess({ suspect: res.data.data.infectionSuspect }),
        );
      })
      .catch(err => {
        dispatch(flagSurvivorFail({ error: err }));
      });
  };
};

export const flagSurvivorReset = () => ({
  type: actionTypes.FLAG_SURVIVOR_RESET,
});

export const fetchSurvivorReportsStart = () => ({
  type: actionTypes.FETCH_SURVIVOR_REPORTS_START,
});

export const fetchSurvivorReportsSuccess = payload => ({
  type: actionTypes.FETCH_SURVIVOR_REPORTS_SUCCESS,
  payload,
});

export const fetchSurvivorReportsFail = payload => ({
  type: actionTypes.FETCH_SURVIVOR_REPORTS_FAIL,
  payload,
});

export const fetchSurvivorReports = payload => {
  return dispatch => {
    dispatch(fetchSurvivorReportsStart());

    const survivorId = payload.witness._id;

    axios
      .get(`/people/${survivorId}/infections`)
      .then(res => {
        dispatch(
          fetchSurvivorReportsSuccess({
            reports: res.data.data.map(el => el.idInfected),
          }),
        );
      })
      .catch(err => {
        console.log(err);
        dispatch(fetchSurvivorReportsFail({ error: err }));
      });
  };
};
