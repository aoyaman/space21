import { START_GAME, SELECT_KOUHO, DECIDE_SPACE, KouhoActionTypes } from '../actions';
import { KouhoState } from '../entity/store';

const initialState: KouhoState = [];

const kouho = (state = initialState, action: KouhoActionTypes) => {
  switch (action.type) {
    case START_GAME:
      return [];
    case SELECT_KOUHO:
      return JSON.parse(JSON.stringify(action.list));
    case DECIDE_SPACE:
      return [];
    default:
      return state
  }
}

export default kouho;
