import { START_GAME, SELECT_KOUHO, DECIDE_SPACE, SelectActionTypes } from '../actions';
import { SelectState } from '../entity/store';

const initialState: SelectState = {
  blockType: -1,
  angle: 0,
  flip: false,
  cells: [],
};

const select = (state = initialState, action: SelectActionTypes) => {
  switch (action.type) {
    case START_GAME:
      return {...initialState};
    case SELECT_KOUHO:
      return {...StorageEvent,
        blockType: action.blockType,
        angle: action.angle,
        flip: action.flip,
        cells: JSON.parse(JSON.stringify(action.cells))
      };
    case DECIDE_SPACE:
      return {...initialState};
    default:
      return state
  }
}

export default select;
