import { START_GAME, CHANGE_GAME_INFO, ActionStartGame, ActionChangeGameInfo } from '../actions';
import { GameInfoState } from '../entity/store';

const initialState: GameInfoState = {
  date: new Date(),
  nowPlayer: 0,
  loginPlayer: 0,
  cells: [],
  players: [],
  tegoma: []
}

type ActionTypes = ActionStartGame | ActionChangeGameInfo;

/**
 * 現在行っているゲームの情報
 */
const gameInfo = (state = initialState, action: ActionTypes) => {
  switch (action.type) {
    case START_GAME:
    case CHANGE_GAME_INFO:
      return {...action.gameInfo};
    default:
      return state
  }
}

export default gameInfo;
