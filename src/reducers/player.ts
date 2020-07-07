
import { START_GAME, DECIDE_SPACE, PlayerActionTypes } from '../actions';
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
      return  JSON.parse(JSON.stringify(action.player));
    default:
      return state
  }
}

export default player;
