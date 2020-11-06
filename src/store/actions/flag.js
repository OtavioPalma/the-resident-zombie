import * as actionTypes from './actionTypes';
import axios from '../../Axios';

export const flagSurvivorStart = () => ({
  type: actionTypes.FLAG_SURVIVOR_START,
});

export const flagSurvivorSuccess = () => ({
  type: actionTypes.FLAG_SURVIVOR_SUCCESS,
});

export const flagSurvivorFail = payload => ({
  type: actionTypes.FLAG_SURVIVOR_FAIL,
  payload,
});

export const flagSurvivor = payload => {
  return dispatch => {
    dispatch(flagSurvivorStart());

    const newFlag = {
      witness_id: payload.witness.id,
      suspect_id: payload.suspect.id,
    };

    axios
      .post('/flag', newFlag)
      .then(() => {
        dispatch(flagSurvivorSuccess());
      })
      .catch(err => {
        dispatch(flagSurvivorFail({ error: err }));
      });
  };
};
///////////////////////
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

    const survivorId = payload.witness.id;

    axios
      .get(`/flag?witness_id=${survivorId}`)
      .then(res => {
        dispatch(
          fetchSurvivorReportsSuccess({
            reports: res.data.map(el => el.suspect_id),
          }),
        );
      })
      .catch(err => {
        console.log(err);
        dispatch(fetchSurvivorReportsFail({ error: err }));
      });
  };
};
