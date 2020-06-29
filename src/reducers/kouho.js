
const initialState = [];

const kouho = (state = initialState, action) => {
  switch (action.type) {
    case 'START_GAME':
      return [];
    case 'SELECT_KOUHO':
      return JSON.parse(JSON.stringify(action.list));
    case 'DECIDE_SPACE':
    case 'NOT_SELECT_KOUHO':
      return [];
    default:
      return state
  }
}

export default kouho;
