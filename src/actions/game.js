/**
 * ゲームの処理に対するアクション
 */



// ゲーム開始
export const startGame = () => (dispatch) => {
  dispatch({
    type: 'START_GAME',
    game: makeNewGame()
  });
}


// 候補を選択する
export const selectKouho = blockType => (dispatch, getState) => {
  var list = [];
  const {game, player, board, kouho} = getState();

  var angleDefault = 0;
  var flipDefault = false;

  var blocks = JSON.parse(JSON.stringify(player[game.nowPlayer].blocks));
  blocks[blockType].color = COLOR_SELECT;
  var tegoma = makeNexts(blocks);

  // 置ける場所の候補リスト
  for (var y = 0; y < board.length; y++) {
    for (var x = 0; x < board[y].length; x++) {
      if (checkBlock(blockType, x, y, board, 0, angleDefault, flipDefault)) {

        // 候補用の色を取得
        var color = COLOR_SELECT;

        // ここに置いた場合の絵を書く
        var cells2 = JSON.parse(JSON.stringify(board));
        drawBlock(blockType, x, y, cells2, color, angleDefault, flipDefault);

        // 候補をリストに追加
        var kouhoItem = {
          x,
          y,
          cells: cells2,
        }
        list.push(kouhoItem);
      }
    }
  }

  var cells = makeCells(5,5);
  drawBlock(blockType, 0, 0, cells, COLOR_SELECT, 0, false);


  dispatch({
    type: 'SELECT_KOUHO',
    blockType,
    tegoma,
    list,
    cells,
  });
}



// -----------------------------------------------------

const COLOR_DEFAULT = 'd3d3d3';
const COLOR_RED = 'ff0000';
const COLOR_BLUE = '0000ff';
const COLOR_GREEN = '006400';
const COLOR_YELLOW = 'ffa500';
const COLOR_SELECT = 'ffb6c1';

const BLOCK_SHAPE = [ [ [ 0, 0 ], [ 0, 1 ], [ 1, 0 ], [ 1, 1 ] ], // 0:四角
  [ [ 0, 0 ] ], // 1:１小竹の
  [ [ 1, 0 ], [ 0, 1 ], [ 1, 1 ], [ 2, 1 ] ], // 2:逆T(短かい方)
  [ [ 0, 0 ], [ 1, 0 ] ], // 3:２連続
  [ [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 3, 0 ] ], // 4:４連続
  [ [ 0, 0 ], [ 1, 0 ], [ 1, 1 ] ], // 5:「の３個
  [ [ 0, 1 ], [ 1, 1 ], [ 2, 1 ], [ 2, 0 ] ], // 6:「の４個
  [ [ 0, 0 ], [ 1, 0 ], [ 2, 0 ] ], // 7:３連続
  [ [ 0, 1 ], [ 1, 0 ], [ 1, 1 ], [ 2, 0 ] ], // 8:半分卍(４個)

  [ [ 0, 0 ], [ 0, 1 ], [ 1, 1 ], [ 2, 1 ], [ 3, 1 ] ], // 9: 寝てる
  [ [ 0, 2 ], [ 1, 0 ], [ 1, 1 ], [ 1, 2 ], [ 2, 2 ] ], // 10: 逆T(長い方)
  [ [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 1, 2 ], [ 2, 2 ] ], // 11: L(５個)
  [ [ 0, 1 ], [ 1, 0 ], [ 1, 1 ], [ 2, 0 ], [ 3, 0 ] ], // 12: 半分卍(４個)
  [ [ 0, 1 ], [ 0, 2 ], [ 1, 1 ], [ 2, 0 ], [ 2, 1 ] ], // 13: Z
  [ [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 0, 3 ], [ 0, 4 ] ], // 14:５連続

  [ [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 1, 1 ], [ 1, 2 ] ], // 15: 下半身太
  [ [ 1, 0 ], [ 2, 0 ], [ 0, 1 ], [ 1, 1 ], [ 0, 2 ] ], // 16: Wみたいなの
  [ [ 0, 0 ], [ 1, 0 ], [ 0, 1 ], [ 0, 2 ], [ 1, 2 ] ], // 17: コの逆
  [ [ 1, 0 ], [ 2, 0 ], [ 0, 1 ], [ 1, 1 ], [ 1, 2 ] ], // 18: 手裏剣風
  [ [ 1, 0 ], [ 2, 1 ], [ 0, 1 ], [ 1, 1 ], [ 1, 2 ] ], // 19: 十字架
  [ [ 1, 0 ], [ 0, 1 ], [ 1, 1 ], [ 2, 1 ], [ 3, 1 ] ], // 20: トンファー

];

const NEXT_POSITIONS = [

  [ 0, 2 ], // 四角
  [ 3, 0 ], // １小竹の
  [ 4, 2 ], // 逆T(短かい方)
  [ 7, 0 ], // ２連続
  [ 9, 3 ], // ４連続
  [ 12, 0 ], // 「の３個
  [ 15, 2 ], // 「の４個
  [ 17, 0 ], // ３連続
  [ 20, 2 ], // 半分卍(４個)

  [ 0, 6 ], // 寝てるやつ
  [ 5, 5 ], // 逆T(長い方)
  [ 9, 5 ], // L(５個)
  [ 13, 6 ], // 半分卍(４個)
  [ 18, 5 ], // Z
  [ 22, 5 ], // ５連続

  [ 0, 9 ], // 下半身太
  [ 3, 9 ], // Wみたいなの
  [ 7, 9 ], // コの逆
  [ 11, 9 ], // 手裏剣風
  [ 15, 9 ], // 十字架
  [ 19, 10 ], // トンファー
];

const makeCells = (w, h) => {
  var cells  = [];
  for (var y = 0; y < h; y++) {
    var row = [];
    for (var x = 0; x < w; x++) {
      var cell = {
        color: COLOR_DEFAULT,
        blockType: -1,
      }
      row.push(cell);
    }
    cells.push(row);
  }
  return cells;
}

const makePlayerInfo = () => {
  var players = [];
  var colors = ['赤', '青', '黄', '緑'];
  var colors2 = [COLOR_RED, COLOR_BLUE, COLOR_GREEN, COLOR_YELLOW];
  for (var i = 0; i < 4; i++) {

    var blocks = [];
    for (var b = 0; b < BLOCK_SHAPE.length; b++) {
      var block = {
        type: b,
        isSet: false,
        color: colors2[i],
      }
      blocks.push(block);
    }

    var player = {
      name: i === 0 ? 'あなた' : 'CPU' + (i),
      color: colors2[i],
      blockZansu: 21,
      point: 0,
      pass: false,
      blocks
    }
    players.push(player);
  }
  return players;
}

var makeNexts = blocks => {
  var cells = makeCells(23,12);

  for (var i = 0; i < blocks.length; i++) {
    if (blocks[i].isSet === false) {
      drawNextBlock(blocks[i], cells, blocks[i].color)
    }
  }
  console.log('makeNexts...', cells);
  return cells;
}

/**
 * ブロック候補の表示
 */
var  drawNextBlock = (block, cells, color) => {
  var x = NEXT_POSITIONS[block.type][0];
  var y = NEXT_POSITIONS[block.type][1];
  for (var i = 0; i < BLOCK_SHAPE[block.type].length; i++) {
    var cell = cells[y + BLOCK_SHAPE[block.type][i][1]][x + BLOCK_SHAPE[block.type][i][0]];
    cell.color = color;
    cell.blockType = block.type;
  }
}

var makeNewGame = () => {
  var game = {
    date: new Date(),
    nowPlayer: 0,
    cells: makeCells(20, 20),
    players: makePlayerInfo(),
    isLoginUserNow: true,
    nowPlayerName: 'あなた',
  }
  game.tegoma = makeNexts(game.players[game.nowPlayer].blocks)
  return game;
}
/**
 * ブロックを置けるかどうかのチェック
 */
var checkBlock = (index, x, y, cells, color, angle, flip) => {
  var block = BLOCK_SHAPE[index];
  block = calcBlockShape(block, angle, flip);
  var isCheck = false;

  for (var i = 0; i < block.length; i++) {
    var newY = y + block[i][1];
    var newX = x + block[i][0];

    // はみ出てたらダメ！
    if (cells.length <= newY) {
      return false;
    }
    if (cells[newY].length <= newX) {
      return false;
    }

    // すでにあってもダメ！
    if (cells[newY][newX].color !== COLOR_DEFAULT) {
      return false;
    }

    // 右隣が同じ色ならダメ
    if (newX < cells[newY].length - 1 && cells[newY][newX + 1].color === color) {
      return false;
    }
    // 左隣が同じ色ならダメ
    if (newX > 0 && cells[newY][newX - 1].color === color) {
      return false;
    }
    // 下隣が同じ色ならダメ
    if (newY < cells.length - 1 && cells[newY + 1][newX].color === color) {
      return false;
    }
    // 上隣が同じ色ならダメ
    if (newY > 0 && cells[newY - 1][newX].color === color) {
      return false;
    }

    // 右上が同じ色ならOK
    if (newY > 0 && newX < cells[newY].length - 1 && cells[newY - 1][newX + 1].color === color) {
      isCheck = true;
    }

    // 左上が同じ色ならOK
    if (newY > 0 && newX > 0 && cells[newY - 1][newX - 1].color === color) {
      isCheck = true;
    }

    // 右下が同じ色ならOK
    if (newY < cells.length - 1 && newX < cells[newY].length - 1 && cells[newY + 1][newX + 1].color === color) {
      isCheck = true;
    }

    // 左下が同じ色ならOK
    if (newY < cells.length - 1 && newX > 0 && cells[newY + 1][newX - 1].color === color) {
      isCheck = true;
    }

    // 四角を踏んでてらOK
    if ((newX === 0 && newY === 0) || (newX === 0 && newY === cells[newY].length - 1)
        || (newX === cells.length - 1 && newY === 0) || (newX === cells.length - 1 && newY === cells[newY].length - 1)) {
      isCheck = true;
    }
  }
  return isCheck;
}

/**
 * ブロックの色表示
 */
var drawBlock = (index, x, y, cells, color, angle, flip) => {
  var block = BLOCK_SHAPE[index];
  block = calcBlockShape(block, angle, flip);

  drawBlock2(block, x, y, cells, color);
}

var drawBlock2 = (block, x, y, cells, color) => {
  for (var i = 0; i < block.length; i++) {
    var x2 = block[i][0];
    var y2 = block[i][1];
    cells[y + y2][x + x2].color = color;
  }
}


/***
 * ブロックを90度回転、反転させるメソッド
 *
 * @param oldShape 選択されたブロック
 * @param angle 角度
 * @param flip 反転するかどうか
 * @return 90度回転、もしくは反転したブロックの形
 */
var calcBlockShape = (oldShape, angle, flip) => {
  if (angle === 0 && flip === false) {
    return oldShape;
  }
  var cells = makeCells(5, 5);
  var cells2 = makeCells(5, 5);

  // まず、左上を始点として角度なしで描く
  drawBlock(oldShape, 0, 0, cells, "ZZZ");

  for (var a = 0; a < angle; a++) {
    // 90度回転
    for (var x = 0; x < 5; x++) {
      for (var y = 0; y < 5; y++) {
        cells2[y][x] = cells[5 - 1 - x][y];
      }
    }



    // cells2 -> cells
    cells = JSON.parse(JSON.stringify(cells2));
  }

  // 反転flgがあれば、反転させる
  if (flip) {
    for (let x = 0; x < 5; x++) {
      for (let y = 0; y < 5; y++) {
        cells2[y][x] = cells[y][4 - x];
      }
    }
    // cells2 -> cells
    cells = JSON.parse(JSON.stringify(cells2));
  }

  var shape = [];

  // ZZZ が入っている座標だけを抜き出す
  for (let y = 0; y < 5; y++) {
    for (let x = 0; x < 5; x++) {
      if (cells2[y][x].color != null && cells2[y][x].color === "ZZZ") {
        var temp = [x, y];
        shape.push(temp);
      }
    }
  }

  // x、yの最小値を調べる
  var minX = 99, minY = 99;
  for (var i = 0; i < oldShape.length; i++) {
    if (shape[i][0] < minX) {
      minX = shape[i][0];
    }
    if (shape[i][1] < minY) {
      minY = shape[i][1];
    }
  }
  // 最小値が０じゃない場合はずれてるので、最小値が０になるようずらす
  for (i = 0; i < oldShape.length; i++) {
    if (minX > 0) {
      shape[i][0] -= minX;
    }
    if (minY > 0) {
      shape[i][1] -= minY;
    }
  }


  return shape;
}
