
const initialState = {
  blockType: -1,
  angle: 0,
  flip: false,
  cells: [],
};

const select = (state = initialState, action) => {
  switch (action.type) {
    case 'START_GAME':
      return Object.assign({}, initialState);
    case 'SELECT_KOUHO':
      return Object.assign({}, state, {
        blockType: action.blockType,
        angle: action.angle,
        flip: action.flip,
        cells: JSON.parse(JSON.stringify(action.cells))
      })
    case 'DECIDE_SPACE':
      return Object.assign({}, initialState);
    default:
      return state
  }
}

export default select;
