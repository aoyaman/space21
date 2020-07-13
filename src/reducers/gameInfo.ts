import {
  START_GAME,
  CHANGE_GAME_INFO,
  ActionStartGame,
  ActionChangeGameInfo,
} from "../actions/types";
import { GameInfoState } from "../entity/store";
import Space21 from "../domain/Space21";

const initialState: GameInfoState = Space21.getInitializeGameInfo();

type ActionTypes = ActionStartGame | ActionChangeGameInfo;

/**
 * 現在行っているゲームの情報
 */
const gameInfo = (state = initialState, action: ActionTypes): GameInfoState => {
  switch (action.type) {
    case START_GAME:
    case CHANGE_GAME_INFO:
      console.log("action=", action);
      return { ...action.gameInfo };
    default:
      return state;
  }
};

export default gameInfo;
