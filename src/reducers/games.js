

/**
 * games reducer
 * @param {}} state
 * @param {*} action
 */
const games = (state = [], action) => {
  switch (action.type) {
    case 'START_GAME':
      return [
        ...state,
        action.game
      ]
    default:
      return state
  }
}

export default games
