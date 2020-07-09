import { START_GAME, DECIDE_SPACE, CPU_PUT, BoardActionTypes } from '../actions';
import { BoardState } from '../entity/store';

// 20 x 20 のボード盤
const initialState: BoardState = [];


/**
 * ゲーム盤のreducer
 */
const board = (state = initialState, action: BoardActionTypes) => {
  switch (action.type) {
    case START_GAME:
      return  JSON.parse(JSON.stringify(action.game.cells));
    case DECIDE_SPACE:
    case CPU_PUT:
      return  JSON.parse(JSON.stringify(action.board));
    default:
      return state
  }
}

export default board;
