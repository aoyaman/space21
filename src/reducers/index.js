import { combineReducers } from "redux";
import app from "./app";
// import game from './game'
// import board from './board'
// import player from './player'
// import tegoma from './tegoma'
// import kouho from './kouho'
// import select from './select'
import gameInfo from "./gameInfo";

export default combineReducers({
  app,
  gameInfo,
});
