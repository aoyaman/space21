
const initialState = {
  page: "index",
  selectedGame: -1,
}

const app = (state = initialState, action) => {
  switch (action.type) {
    case 'START_GAME':
      return Object.assign({}, state, {page: "show", selectedGame: -1})
    case 'BACK_TO_THE_SHOW':
      return Object.assign({}, state, {page: "index", selectedGame: -1})
    case 'SHOW_GAME':
      return Object.assign({}, state, {page: "show", selectedGame: action.index})
    default:
      return state
  }
}



export default app
