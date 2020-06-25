
const initialState = {
  nexts: [],
  list: [],
  blockType: -1,
  angle: 0,
  flip: 0,
}

const kouho = (state = initialState, action) => {
  switch (action.type) {
    case 'SELECT_KOUHO':
      return Object.assign({}, state, {blockType: action.blockType, nexts: action.nexts, list: action.list})
    default:
      return state
  }
}

export default kouho;
