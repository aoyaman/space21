import { START_GAME, ActionStartGame } from "../actions/types";
import { AppState } from "../entity/store";

const initialState: AppState = {
  page: "start",
};
type AppActionTypes = ActionStartGame;

const app = (state = initialState, action: AppActionTypes): AppState => {
  switch (action.type) {
    case START_GAME:
      return { ...state, page: "game" };

    default:
      return state;
  }
};

export default app;
