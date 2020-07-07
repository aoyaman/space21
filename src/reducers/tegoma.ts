import { START_GAME, DECIDE_SPACE, TegomaActionTypes } from '../actions';
import { TegomaState } from '../entity/store';

// 初期値
const initialState: TegomaState = [];


/**
 * ゲーム盤のreducer
 */
const tegoma = (state = initialState, action: TegomaActionTypes) => {
  switch (action.type) {
    case START_GAME:
      return  JSON.parse(JSON.stringify(action.game.tegoma));
    case DECIDE_SPACE:
      return  JSON.parse(JSON.stringify(action.tegoma));
    default:
      return state
  }
}

export default tegoma;
