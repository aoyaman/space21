import { START_GAME, SELECT_KOUHO, DECIDE_SPACE, NOT_SELECT_KOUHO, KouhoActionTypes } from '../actions';
import { KouhoState } from '../entity/store';

const initialState: KouhoState = [];

const kouho = (state = initialState, action: KouhoActionTypes) => {
  switch (action.type) {
    case START_GAME:
      return [];
    case SELECT_KOUHO:
      return JSON.parse(JSON.stringify(action.list));
    case DECIDE_SPACE:
    case NOT_SELECT_KOUHO:
      return [];
    default:
      return state
  }
}

export default kouho;
