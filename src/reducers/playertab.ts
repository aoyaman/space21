import { SELECT_PLAYER_TAB, ActionSelectPlayerTab } from "../actions/types";
import { PlayerTabState } from "../entity/store";

const initialState: PlayerTabState = {
  tabIndex: 0,
};
type ActionTypes = ActionSelectPlayerTab;

const playertab = (
  state = initialState,
  action: ActionTypes
): PlayerTabState => {
  switch (action.type) {
    case SELECT_PLAYER_TAB: {
      return { ...state, tabIndex: action.index };
    }

    default:
      return state;
  }
};

export default playertab;
