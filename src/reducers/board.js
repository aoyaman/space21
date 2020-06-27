
// 20 x 20 のボード盤
const initialState = [
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
];


/**
 * ゲーム盤のreducer
 *
 * @param {} state
 * @param {*} action
 */
const board = (state = initialState, action) => {
  switch (action.type) {
    case 'START_GAME':
      return  JSON.parse(JSON.stringify(action.game.cells));
    default:
      return state
  }
}

export default board;
