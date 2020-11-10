import * as actionTypes from './actionTypes';
import axios from '../../Axios';

import { fetchSurvivors } from './survivor';

export const tradeItemsStart = () => ({
  type: actionTypes.TRADE_ITEMS_START,
});

export const tradeItemsSuccess = () => ({
  type: actionTypes.TRADE_ITEMS_SUCCESS,
});

export const tradeItemsFail = payload => ({
  type: actionTypes.TRADE_ITEMS_FAIL,
  payload,
});

export const tradeItems = payload => {
  return dispatch => {
    dispatch(tradeItemsStart());

    axios
      .post(
        `/people/${payload.survivorId}/properties/trade_item`,
        payload.trade,
      )
      .then(() => {
        dispatch(tradeItemsSuccess());
        dispatch(fetchSurvivors());
      })
      .catch(err => {
        dispatch(tradeItemsFail({ error: err }));
      });
  };
};
