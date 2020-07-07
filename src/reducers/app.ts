
import { START_GAME, END_GAME, AppActionTypes } from '../actions';
import { AppState } from '../entity/store';

const initialState: AppState = {
  page: "start",
}

const app = (state = initialState, action: AppActionTypes) => {
  switch (action.type) {
    case START_GAME:
      return Object.assign({}, state, {page: "game"});

    case END_GAME:
      return Object.assign({}, state, {page: "start"});
    default:
      return state
  }
}



export default app
