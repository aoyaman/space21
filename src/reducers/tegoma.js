
// 23 x 12 のボード盤
const initialState = [
  [null, null, null, null, null, null, null, null, null, null], null, null, null,
  [null, null, null, null, null, null, null, null, null, null], null, null, null,
  [null, null, null, null, null, null, null, null, null, null], null, null, null,
  [null, null, null, null, null, null, null, null, null, null], null, null, null,
  [null, null, null, null, null, null, null, null, null, null], null, null, null,
  [null, null, null, null, null, null, null, null, null, null], null, null, null,
  [null, null, null, null, null, null, null, null, null, null], null, null, null,
  [null, null, null, null, null, null, null, null, null, null], null, null, null,
  [null, null, null, null, null, null, null, null, null, null], null, null, null,
  [null, null, null, null, null, null, null, null, null, null], null, null, null,
  [null, null, null, null, null, null, null, null, null, null], null, null, null,
  [null, null, null, null, null, null, null, null, null, null], null, null, null,
];


/**
 * ゲーム盤のreducer
 *
 * @param {} state
 * @param {*} action
 */
const tegoma = (state = initialState, action) => {
  switch (action.type) {
    case 'START_GAME':
      return  JSON.parse(JSON.stringify(action.game.tegoma));
    default:
      return state
  }
}

export default tegoma;
