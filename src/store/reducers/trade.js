import * as actionTypes from '../actions/actionTypes';

const initialState = {
  error: null,
  loading: false,
};

const tradeItemsStart = state => ({
  ...state,
  error: null,
  loading: true,
});

const tradeItemsSuccess = state => ({
  ...state,
  error: null,
});

const tradeItemsFail = (state, payload) => ({
  ...state,
  error: payload.error,
});

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.TRADE_ITEMS_START:
      return tradeItemsStart(state);
    case actionTypes.TRADE_ITEMS_SUCCESS:
      return tradeItemsSuccess(state);
    case actionTypes.TRADE_ITEMS_FAIL:
      return tradeItemsFail(state, payload);
    default:
      return state;
  }
};

export default reducer;
