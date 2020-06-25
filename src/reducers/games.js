
const games = (state = [], action) => {
  switch (action.type) {
    case 'START_GAME':
      return [
        ...state,
        {
          id: state.length + 1,
          date: new Date()
        }
      ]
    default:
      return state
  }
}

export default games
