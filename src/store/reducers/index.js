import { combineReducers } from 'redux';
import peopleReducer from './people';
import infectedReducer from './infected';
import tradeReducer from './trade';
import reportReducer from './report';

export const rootReducer = combineReducers({
  people: peopleReducer,
  infected: infectedReducer,
  trade: tradeReducer,
  report: reportReducer,
});
