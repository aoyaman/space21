

/**
 * プレイヤー情報の形
 */
var playerInfo = {
  name: null,
  color: null,
  blockZansu: 0,
  point: 0,
  pass: false,
  blocks: [],
};

/**
 * 初期値。配列。４人分
 */
const initialState = [playerInfo, playerInfo, playerInfo, playerInfo];

/**
 * プレイヤーのreducer
 *
 * @param {} state
 * @param {*} action
 */
const player = (state = initialState, action) => {
  switch (action.type) {
    case 'START_GAME':
      return  JSON.parse(JSON.stringify(action.game.players));
    default:
      return state
  }
}

export default player;
