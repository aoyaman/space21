
const initialState = {
  id: null,
  date: null,
  nowPlayer: 0,
}


/**
 * games reducer
 * 
 * @param {} state 
 * @param {*} action 
 */
const game = (state = initialState, action) => {
  switch (action.type) {
    case 'START_GAME':
      return Object.assign({}, state, {
        id: 1,
        date: action.game.date,
        nowPlayer: action.game.nowPlayer,
      });
    default:
      return state
  }
}

export default game;
