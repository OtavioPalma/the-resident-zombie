import { combineReducers } from 'redux';
import survivorReducer from './survivor';
import flagReducer from './flag';
import tradeReducer from './trade';
import reportReducer from './report';

export const rootReducer = combineReducers({
  survivor: survivorReducer,
  flag: flagReducer,
  trade: tradeReducer,
  report: reportReducer,
});
