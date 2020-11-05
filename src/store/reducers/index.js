import { combineReducers } from 'redux';
import survivorReducer from './survivor';
import infectedReducer from './infected';
import tradeReducer from './trade';
import reportReducer from './report';

export const rootReducer = combineReducers({
  survivor: survivorReducer,
  infected: infectedReducer,
  trade: tradeReducer,
  report: reportReducer,
});
