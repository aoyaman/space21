
const initialState = {
  page: "start",
}

const app = (state = initialState, action) => {
  switch (action.type) {
    case 'START_GAME':
      return Object.assign({}, state, {page: "game"});

    case 'END_GAME':
      return Object.assign({}, state, {page: "start"});
    default:
      return state
  }
}



export default app
