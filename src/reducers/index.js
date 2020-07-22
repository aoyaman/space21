import { combineReducers } from "redux";
import app from "./app";
import gameInfo from "./gameInfo";
import start from "./start";

export default combineReducers({
  app,
  gameInfo,
  start,
});
