
import { START_GAME, DECIDE_SPACE, CPU_PUT, DECIDE_PASS, PlayerActionTypes } from '../actions';
import { PlayerState } from '../entity/store';

/**
 * 初期値。
 */
const initialState: PlayerState = [];

/**
 * プレイヤーのreducer
 *
 * @param {} state
 * @param {*} action
 */
const player = (state = initialState, action: PlayerActionTypes) => {
  switch (action.type) {
    case START_GAME:
      return  JSON.parse(JSON.stringify(action.game.players));
    case DECIDE_SPACE:
    case CPU_PUT:
    case DECIDE_PASS:
      return  JSON.parse(JSON.stringify(action.player));
    default:
      return state
  }
}

export default player;
