import { START_GAME, DECIDE_SPACE, CPU_PUT, DECIDE_PASS, GameActionTypes } from '../actions';
import { GameState } from '../entity/store';

const initialState: GameState = {
  id: null,
  date: null,
  nowPlayer: 0,
  loginPlayer: 0
}


/**
 * ゲーム進行情報のReducer
 */
const game = (state = initialState, action: GameActionTypes) => {
  switch (action.type) {
    case START_GAME:
      return Object.assign({}, state, {
        id: 1,
        date: action.game.date,
        nowPlayer: action.game.nowPlayer,
        loginPlayer: action.game.loginPlayer,
      });

    case DECIDE_SPACE:
    case CPU_PUT:
    case DECIDE_PASS:
      return Object.assign({}, state, {
        nowPlayer: action.nextPlayer,
      });
    default:
      return state
  }
}

export default game;
