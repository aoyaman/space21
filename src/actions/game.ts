
import { SelectKouhoInfo, DecideSpaceInfo, DecidePassInfo } from '../actions';
import { GameInfo, BoardInfo, CellInfo, PlayerInfo, SpaceInfo, TegomaInfo } from '../entity/game';
import { GameState } from '../entity/store';

/**
 * ゲームの処理に対するアクション
 */




// 候補を選択する
export const onSelectKouho = (blockType: number, game: GameState, player: PlayerInfo[], board: CellInfo[][]):SelectKouhoInfo => {
  var list = [];

  var angleDefault = 0;
  var flipDefault = false;

  var blocks: SpaceInfo[] = JSON.parse(JSON.stringify(player[game.loginPlayer].blocks));
  blocks[blockType].color = COLOR_SELECT;
  var tegoma = makeNexts(blocks);

  // 置ける場所の候補リスト
  for (var y = 0; y < board.length; y++) {
    for (var x = 0; x < board[y].length; x++) {
      if (checkBlock(blockType, x, y, board, player[game.loginPlayer].color, angleDefault, flipDefault)) {

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


  return {
    blockType,
    tegoma,
    list,
    cells,
    angle: angleDefault,
    flip: flipDefault,
  };
}

// 右に回転する
export const onRotate = (board: BoardInfo, blockType: number, color: string, angle: number, flip: boolean):SelectKouhoInfo => {
  angle = angle + 1;
  if (angle >= 4) {
    angle = 0;
  }
  return makeKouho(board, blockType, color, angle, flip);
}


// 左右反転する
export const onFlip = (board: BoardInfo, blockType: number, color: string, angle: number, flip: boolean):SelectKouhoInfo => {
  return makeKouho(board, blockType, color, angle, !flip);
}

// 決定する
export const onDecide = (x: number, y: number, nowPlayer: number, loginPlayer: number, blockType: number, angle: number, flip: boolean, board: BoardInfo, player: PlayerInfo[], cpuCallback: CpuCallback):DecideSpaceInfo => {

  var p = player[nowPlayer];
  var block = p.blocks[blockType];
  block.x = x;
  block.y = y;
  block.angle = angle;
  block.flip = flip;
  block.isSet = true;
  console.log('decideSpace()... change block', block);

  // ボードにスペースを書き込む
  drawBlock(blockType, x, y, board, p.color, angle, flip);

  // ポイントを追加
  p.point += BLOCK_SHAPE[blockType].length;
  p.blockZansu--;

  var tegoma = makeNexts(p.blocks);

  // 次のプレイヤー
  var nextPlayer: number = calcNextPlayer(nowPlayer, player);
  console.log('nextPlayer=' + nextPlayer);

  const timeoutId = setTimeout(() => {
    clearTimeout(timeoutId);
    goNext(board, player, nextPlayer, loginPlayer, cpuCallback);
  }, CPU_TIMER_MSEC);


  return {
    board,
    nowPlayer: nowPlayer,
    nextPlayer,
    player,
    tegoma
  };
}


// パスする
export const onPass = (nowPlayer: number, loginPlayer: number, player: PlayerInfo[], board: BoardInfo, cpuCallback: CpuCallback):DecidePassInfo => {
  var p = player[nowPlayer];
  p.pass = true;

  // 次のプレイヤー
  var nextPlayer = calcNextPlayer(nowPlayer, player);


  // ２秒待つ
  const timeoutId = setTimeout(() => {
    clearTimeout(timeoutId);
    goNext(board, player, nowPlayer, loginPlayer, cpuCallback);
  }, CPU_TIMER_MSEC);

  return {
    nowPlayer: nowPlayer,
    nextPlayer,
    player,
  };
}

// CPUの順番スタート
export const onWaitCpu = (nowPlayer: number, loginPlayer: number, player: PlayerInfo[], board: BoardInfo, cpuCallback: CpuCallback) => {

  // ２秒待つ
  const timeoutId = setTimeout(() => {
    clearTimeout(timeoutId);
    goNext(board, player, nowPlayer, loginPlayer, cpuCallback);
  }, CPU_TIMER_MSEC);

}
// -----------------------------------------------------

const COLOR_DEFAULT = 'd3d3d3';
const COLOR_RED = 'FF3366';
const COLOR_BLUE = '0000ff';
const COLOR_GREEN = '006400';
const COLOR_YELLOW = 'ffa500';
const COLOR_SELECT = 'c71585'; // mediumvioletred

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

  [ 0, 1 ], // 四角
  [ 3, 0 ], // １小竹の
  [ 4, 1 ], // 逆T(短かい方)
  [ 7, 0 ], // ２連続
  [ 8, 2 ], // ４連続
  [ 12, 0 ], // 「の３個
  [ 15, 2 ], // 「の４個
  [ 17, 0 ], // ３連続
  // [ 20, 2 ], // 半分卍(４個)
  [ 1, 7 ], // 半分卍(４個)

  [ 0, 4 ], // 寝てるやつ
  [ 5, 4 ], // 逆T(長い方)
  [ 9, 5 ], // L(５個)
  [ 13, 6 ], // 半分卍(４個)
  // [ 18, 5 ], // Z
  // [ 22, 5 ], // ５連続
  [ 11, 3 ], // Z
  [ 19, 3 ], // ５連続

  [ 0, 9 ], // 下半身太
  [ 3, 9 ], // Wみたいなの
  [ 7, 9 ], // コの逆
  [ 10, 9 ], // 手裏剣風
  [ 13, 9 ], // 十字架
  // [ 19, 10 ], // トンファー
  [ 16, 10 ], // トンファー
];
const CPU_TIMER_MSEC = 3000;

const makeCells = (w: number, h: number) => {
  var cells  = [];
  for (var y = 0; y < h; y++) {
    var row = [];
    for (var x = 0; x < w; x++) {
      var cell = {
        color: COLOR_DEFAULT,
        blockType: -1,
        isSet: false,
      }
      row.push(cell);
    }
    cells.push(row);
  }
  return cells;
}

const makePlayerInfo = (): PlayerInfo[] => {
  var players: PlayerInfo[] = [];
  var colors2 = [COLOR_RED, COLOR_BLUE, COLOR_GREEN, COLOR_YELLOW];
  for (var i = 0; i < 4; i++) {

    var blocks: SpaceInfo[] = [];
    for (var b = 0; b < BLOCK_SHAPE.length; b++) {
      var block: SpaceInfo = {
        type: b,
        isSet: false,
        color: colors2[i],
        x: undefined,
        y: undefined,
        angle: undefined,
        flip: undefined,
      }
      blocks.push(block);
    }

    var player: PlayerInfo = {
      name: i === 0 ? 'あなた' : 'CPU' + (i),
      color: colors2[i],
      blockZansu: 21,
      point: 0,
      pass: false,
      blocks,
    }
    players.push(player);
  }
  return players;
}

var makeNexts = (blocks: SpaceInfo[]): TegomaInfo => {
  var cells: TegomaInfo = makeCells(20,12);

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
var  drawNextBlock = (block: SpaceInfo, cells: TegomaInfo, color: string) => {
  var x = NEXT_POSITIONS[block.type][0];
  var y = NEXT_POSITIONS[block.type][1];
  for (var i = 0; i < BLOCK_SHAPE[block.type].length; i++) {
    var cell = cells[y + BLOCK_SHAPE[block.type][i][1]][x + BLOCK_SHAPE[block.type][i][0]];
    cell.color = color;
    cell.blockType = block.type;
  }
}

export const makeNewGame = ():GameInfo => {
  const players: PlayerInfo[] = makePlayerInfo();
  const nowPlayer = 0;
  var game: GameInfo = {
    date: new Date(),
    nowPlayer,
    loginPlayer: 0,
    cells: makeCells(20, 20),
    players,
    isLoginUserNow: true,
    nowPlayerName: 'あなた',
    tegoma: makeNexts(players[nowPlayer].blocks)
  }
  return game;
}
/**
 * ブロックを置けるかどうかのチェック
 */
var checkBlock = (index: number, x: number, y: number, cells: CellInfo[][], color: string, angle: number, flip: boolean) => {
  var block = BLOCK_SHAPE[index];
  block = calcBlockShape(index, block, angle, flip);
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
var drawBlock = (index: number, x: number, y: number, cells: CellInfo[][], color: string, angle: number, flip: boolean) => {
  var block: number[][] = BLOCK_SHAPE[index];
  block = calcBlockShape(index, block, angle, flip);

  drawBlock2(index, block, x, y, cells, color);
}

var drawBlock2 = (blockType: number, block: number[][], x: number, y: number, cells: CellInfo[][], color: string) => {
  for (var i = 0; i < block.length; i++) {
    var x2 = block[i][0];
    var y2 = block[i][1];
    cells[y + y2][x + x2].color = color;
    cells[y + y2][x + x2].blockType = blockType;
    cells[y + y2][x + x2].isSet = true;
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
var calcBlockShape = (blockType: number, oldShape: number[][], angle: number, flip: boolean) => {
  if (angle === 0 && flip === false) {
    return oldShape;
  }
  var cells = makeCells(5, 5);
  var cells2 = makeCells(5, 5);

  // まず、左上を始点として角度なしで描く
  drawBlock2(blockType, oldShape, 0, 0, cells, "ZZZ");

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

const makeKouho = (board: BoardInfo, blockType: number, color: string, angle: number, flip: boolean): SelectKouhoInfo => {
  var list = [];

  console.log('makeKouho()...', blockType, color, angle, flip);

  // var blocks = JSON.parse(JSON.stringify(player[game.nowPlayer].blocks));
  // blocks[blockType].color = COLOR_SELECT;
  // var tegoma = makeNexts(blocks);


  // 置ける場所の候補リスト
  for (var y = 0; y < board.length; y++) {
    for (var x = 0; x < board[y].length; x++) {
      if (checkBlock(blockType, x, y, board, color, angle, flip)) {

        // 候補用の色を取得
        var selectedColor = COLOR_SELECT;

        // ここに置いた場合の絵を書く
        var cells2 = JSON.parse(JSON.stringify(board));
        drawBlock(blockType, x, y, cells2, selectedColor, angle, flip);

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
  drawBlock(blockType, 0, 0, cells, COLOR_SELECT, angle, flip);


  return {
    blockType,
    list,
    cells,
    angle,
    flip,
    tegoma: []
  };
}

export type CpuCallback = (oard: BoardInfo, player: PlayerInfo[], nowPlayer: number, nextPlayer: number) => void;

/**
 * 次へ進む
 */
export const goNext = (board: BoardInfo, player: PlayerInfo[], nowPlayer: number, loginPlayer: number, cpuCallback: CpuCallback) => {

  // ゲーム終了している場合は何もしない
  if (nowPlayer < 0) {
    return;
  }
  console.log('CPU START: nowPlayer=' + nowPlayer + ', loginPlayer=' + loginPlayer);


  var p = player[nowPlayer];

  // セットしていないスペースのリストを作る
  var notSetSpaces = [];
  for (var i = 0; i < p.blocks.length; i++) {
    if (p.blocks[i].isSet === false) {
      notSetSpaces.push(p.blocks[i]);
    }
  }

  // ブロック数が多い順に並べる
  notSetSpaces.sort((a, b) => {
    return BLOCK_SHAPE[b.type].length - BLOCK_SHAPE[a.type].length;
  });

  var nextPlayer = -1;

  for (var b = 0; b < notSetSpaces.length; b++) {
    var space = notSetSpaces[b];
    // 全部のセルをチェックしていく
    for (var y = 0; y < board.length; y++) {
      for (var x = 0; x < board[y].length; x++) {

        // 回転させてチェックする
        for (var angle = 0; angle < 4; angle++) {
          for (i = 0; i < 2; i++) {
            // チェック
            if (checkBlock(space.type, x, y, board, p.color, angle, (i === 1))) {
              // CPUの場合
              if (nowPlayer !== loginPlayer) {
                var block = p.blocks[space.type];
                block.x = x;
                block.y = y;
                block.angle = angle;
                block.flip = i === 1;
                block.isSet = true;
                console.log('decideSpace()... change block', block);

                // ボードにスペースを書き込む
                drawBlock(space.type, x, y, board, p.color, block.angle, block.flip);

                // ポイントを追加
                p.point += BLOCK_SHAPE[space.type].length;
                p.blockZansu--;

                // 次のプレイヤー
                nextPlayer = calcNextPlayer(nowPlayer, player);

                // 通知
                cpuCallback(board, player, nowPlayer, nextPlayer);

                // 次の処理のために進めておく
                nowPlayer = nextPlayer;

              } else {
                console.log('login user is not pass');
                return;
              }
              console.log('CPU END');

              if (nextPlayer === loginPlayer) {
                goNext(board, player, nowPlayer, loginPlayer, cpuCallback);
              } else {
                // ２秒待つ
                const timeoutId = setTimeout(() => {
                  clearTimeout(timeoutId);
                  goNext(board, player, nowPlayer, loginPlayer, cpuCallback);
                }, CPU_TIMER_MSEC);
              }
              return;
            }
          }
        }
      }
    }
  }

  // パス
  p.pass = true;

  // 次のプレイヤー
  nextPlayer = calcNextPlayer(nowPlayer, player);

  // 通知
  cpuCallback(board, player, nowPlayer, nextPlayer);
  console.log('CPU END2');

  // 次の処理のために進めておく
  nowPlayer = nextPlayer;

  if (nextPlayer === loginPlayer) {
    goNext(board, player, nowPlayer, loginPlayer, cpuCallback);
  } else {
    // ２秒待つ
    const timeoutId = setTimeout(() => {
      clearTimeout(timeoutId);
      goNext(board, player, nowPlayer, loginPlayer, cpuCallback);
    }, CPU_TIMER_MSEC);
  }
};

const calcNextPlayer = (nowPlayer: number, players: PlayerInfo[]) => {

  var next = nowPlayer;
  for (var i = 0; i < players.length; i++) {
    next++;
    if (next >= 4) {
      next = 0;
    }
    if (players[next].pass === false) {
      return next;
    }

  }
  return -1;
};
