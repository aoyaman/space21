
const initialState = [];

const kouho = (state = initialState, action) => {
  switch (action.type) {
    case 'START_GAME':
      return [];
    case 'SELECT_KOUHO':
      return JSON.parse(JSON.stringify(action.list));
    default:
      return state
  }
}

export default kouho;
