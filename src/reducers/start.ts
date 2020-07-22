import {
  CHANGE_PLAYER_SELECT,
  ActionChangePlayerSelect,
} from "../actions/types";
import { StartState } from "../entity/store";
import { PlayerType } from "../domain/GameInfo";

const initialState: StartState = {
  players: [
    { name: "P1", playerType: PlayerType.HUMAN },
    { name: "P2", playerType: PlayerType.CPU },
    { name: "P3", playerType: PlayerType.CPU },
    { name: "P4", playerType: PlayerType.CPU },
  ],
};
type ActionTypes = ActionChangePlayerSelect;

const start = (state = initialState, action: ActionTypes): StartState => {
  switch (action.type) {
    case CHANGE_PLAYER_SELECT: {
      const newState = { ...state };
      newState.players[action.index].playerType = action.playerType;
      return newState;
    }

    default:
      return state;
  }
};

export default start;
