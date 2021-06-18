import { combineReducers } from 'redux';
import game from './game';
import player from './player';

const rootReducer = combineReducers({
  player,
  game,
});

export default rootReducer;
