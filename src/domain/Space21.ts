import * as ift from "./GameInfo";
import * as define from "./define";

export default class Space21 {
  private gameInfo: ift.GameInfo;
  constructor(gameInfo: ift.GameInfo|null) {
    if (gameInfo === null) {
      this.gameInfo = this.makeNewGame();
    } else {
      this.gameInfo = JSON.parse(JSON.stringify(gameInfo));
    }
  }

  public getInfo = (): ift.GameInfo => {
    return this.gameInfo;
  }

  getNowPlayerInfo = (): ift.PlayerInfo => {
    return this.gameInfo.players[this.gameInfo.nowPlayer];
  };

  getNowPlayerSpaces = (): ift.SpaceInfo[] => {
    return this.getNowPlayerInfo().spaces;
  };


  public makeNewGame = ():ift.GameInfo => {
    const players: ift.PlayerInfo[] = this.makePlayerInfo();
    const nowPlayer = 0;
    var game: ift.GameInfo = {
      date: new Date(),
      nowPlayer,
      loginPlayer: 0,
      cells: this.makeCells(20, 20),
      players,
      tegoma: this.makeNexts(players[nowPlayer].spaces)
    }
    return game;
  }

  /**
   * 未設定のスペースの中から１つ選ぶ
   * @param spaceType: SpaceType      スペースの種類
   * @param playerIndex: PlayerIndex  対象となるプレイヤー
   * @return SelectInfo
   */
  onSelectSpace = (spaceType: ift.SpaceType, playerIndex: ift.PlayerIndex): ift.SelectInfo => {
    var kouhoList = [];

    var angleDefault = 0;
    var flipDefault = false;

    var playerInfo = this.gameInfo.players[playerIndex];
    playerInfo.spaces[spaceType].color = define.COLOR_SELECT;
    var tegoma = this.makeNexts(playerInfo.spaces);

    let board: ift.BoardInfo = this.gameInfo.cells;

    // 置ける場所の候補リスト
    for (var y = 0; y < board.length; y++) {
      for (var x = 0; x < board[y].length; x++) {
        if (this.checkBlock(spaceType, x, y, board, playerInfo.color, angleDefault, flipDefault)) {
          // 候補用の色を取得
          var color = define.COLOR_SELECT;

          // ここに置いた場合の絵を書く
          var cells2 = JSON.parse(JSON.stringify(board));
          this.drawBlock(spaceType, x, y, cells2, color, angleDefault, flipDefault);

          // 候補をリストに追加
          var kouhoItem = {
            x,
            y,
            cells: cells2,
          };
          kouhoList.push(kouhoItem);
        }
      }
    }



    var selectBoard: ift.SelectBoard = this.makeCells(5, 5);
    this.drawBlock(spaceType, 0, 0, board, define.COLOR_SELECT, 0, false);

    return {
      spaceType,
      kouhoList,
      board: selectBoard,
      angle: angleDefault,
      flip: flipDefault,
    };
  };


  // 右に回転する
  public onRotate = (board: ift.BoardInfo, blockType: number, color: string, angle: number, flip: boolean):ift.SelectInfo => {
    angle = angle + 1;
    if (angle >= 4) {
      angle = 0;
    }
    return this.makeKouho(board, blockType, color, angle, flip);
  }


  // 左右反転する
  public onFlip = (board: ift.BoardInfo, blockType: number, color: string, angle: number, flip: boolean):ift.SelectInfo => {
    return this.makeKouho(board, blockType, color, angle, !flip);
  }

  // 決定する
  public onDecide = (x: number, y: number, cpuCallback: ift.CpuCallback):ift.DecideSpaceInfo => {

    var selectInfo = this.gameInfo.selectInfo;
    var p = this.getNowPlayerInfo();;
    var spaceInfo = p.spaces[selectInfo.spaceType];
    spaceInfo.x = x;
    spaceInfo.y = y;
    spaceInfo.angle = selectInfo.angle;
    spaceInfo.flip = selectInfo.flip;
    spaceInfo.isSet = true;
    console.log('decideSpace()... change spaceInfo', spaceInfo);

    // ボードにスペースを書き込む
    this.drawBlock(selectInfo.spaceType, x, y, this.gameInfo.board, p.color, selectInfo.angle, selectInfo.flip);

    // ポイントを追加
    p.point += define.BLOCK_SHAPE[selectInfo.spaceType].length;
    p.blockZansu--;

    this.gameInfo.tegoma = this.makeNexts(p.spaces);

    // 次のプレイヤー
    this.gameInfo.nowPlayer = this.calcNextPlayer();
    console.log('nextPlayer=' + this.gameInfo.nowPlayer);

    const timeoutId = setTimeout(() => {
      clearTimeout(timeoutId);
      this.goNext(cpuCallback);
    }, define.CPU_TIMER_MSEC);

    cpuCallback(this.gameInfo);
  }


  // パスする
  public onPass = (nowPlayer: number, loginPlayer: number, player: ift.PlayerInfo[], board: ift.BoardInfo, cpuCallback: ift.CpuCallback):ift.DecidePassInfo => {
    var p = player[nowPlayer];
    p.pass = true;

    // 次のプレイヤー
    var nextPlayer = this.calcNextPlayer(nowPlayer, player);


    // ２秒待つ
    const timeoutId = setTimeout(() => {
      clearTimeout(timeoutId);
      this.goNext(board, player, nowPlayer, loginPlayer, cpuCallback);
    }, define.CPU_TIMER_MSEC);

    return {
      nowPlayer: nowPlayer,
      nextPlayer,
      player,
    };
  }

  // CPUの順番スタート
  public onWaitCpu = (nowPlayer: number, loginPlayer: number, player: ift.PlayerInfo[], board: ift.BoardInfo, cpuCallback: ift.CpuCallback) => {

    // ２秒待つ
    const timeoutId = setTimeout(() => {
      clearTimeout(timeoutId);
      this.goNext(board, player, nowPlayer, loginPlayer, cpuCallback);
    }, define.CPU_TIMER_MSEC);

  }

  private makeNexts = (blocks: ift.SpaceInfo[]): ift.BoardInfo => {
    var cells: ift.TegomaInfo = this.makeCells(20, 12);

    for (var i = 0; i < blocks.length; i++) {
      if (blocks[i].isSet === false) {
        this.drawNextBlock(blocks[i], cells, blocks[i].color);
      }
    }
    console.log("makeNexts...", cells);
    return cells;
  };

  private makeCells = (w: number, h: number) => {
    var cells = [];
    for (var y = 0; y < h; y++) {
      var row = [];
      for (var x = 0; x < w; x++) {
        let cell = {
          color: define.COLOR_DEFAULT,
          blockType: -1,
          isSet: false,
        };
        row.push(cell);
      }
      cells.push(row);
    }
    return cells;
  };


  private makePlayerInfo = (): ift.PlayerInfo[] => {
    var players: ift.PlayerInfo[] = [];
    var colors2 = define.COLORS;
    for (var i = 0; i < 4; i++) {

      var spaces: ift.SpaceInfo[] = [];
      for (var b = 0; b < define.BLOCK_SHAPE.length; b++) {
        var block: ift.SpaceInfo = {
          type: b,
          isSet: false,
          color: colors2[i],
          x: undefined,
          y: undefined,
          angle: undefined,
          flip: undefined,
        }
        spaces.push(block);
      }

      var player: ift.PlayerInfo = {
        name: i === 0 ? 'あなた' : 'CPU' + (i),
        color: colors2[i],
        blockZansu: 21,
        point: 0,
        pass: false,
        spaces,
      }
      players.push(player);
    }
    return players;
  }

  /**
   * ブロック候補の表示
   */
  private drawNextBlock = (block: ift.SpaceInfo, cells: ift.TegomaInfo, color: string) => {
    var x = define.NEXT_POSITIONS[block.type][0];
    var y = define.NEXT_POSITIONS[block.type][1];
    for (var i = 0; i < define.BLOCK_SHAPE[block.type].length; i++) {
      var cell = cells[y + define.BLOCK_SHAPE[block.type][i][1]][x + define.BLOCK_SHAPE[block.type][i][0]];
      cell.color = color;
      cell.blockType = block.type;
    }
  };


  /**
   * ブロックの色表示
   */
  private drawBlock = (index: number, x: number, y: number, cells: ift.BoardInfo, color: string, angle: number, flip: boolean) => {
    var block: number[][] = define.BLOCK_SHAPE[index];
    block = this.calcBlockShape(index, block, angle, flip);

    this.drawBlock2(index, block, x, y, cells, color);
  }

  private drawBlock2 = (blockType: number, block: number[][], x: number, y: number, cells: ift.BoardInfo, color: string) => {
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
  private calcBlockShape = (blockType: number, oldShape: number[][], angle: number, flip: boolean) => {
    if (angle === 0 && flip === false) {
      return oldShape;
    }
    var cells = this.makeCells(5, 5);
    var cells2 = this.makeCells(5, 5);

    // まず、左上を始点として角度なしで描く
    this.drawBlock2(blockType, oldShape, 0, 0, cells, "ZZZ");

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


  /**
   * ブロックを置けるかどうかのチェック
   */
  private checkBlock = (index: number, x: number, y: number, cells: ift.BoardInfo, color: string, angle: number, flip: boolean) => {
    var block = define.BLOCK_SHAPE[index];
    block = this.calcBlockShape(index, block, angle, flip);
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
      if (cells[newY][newX].color !== define.COLOR_DEFAULT) {
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


private makeKouho = (board: ift.BoardInfo, spaceType: number, color: string, angle: number, flip: boolean): ift.SelectInfo => {
  var kouhoList:ift.KouhoInfo[] = [];

  console.log('makeKouho()...', spaceType, color, angle, flip);

  // var blocks = JSON.parse(JSON.stringify(player[game.nowPlayer].blocks));
  // blocks[spaceType].color = COLOR_SELECT;
  // var tegoma = makeNexts(blocks);


  // 置ける場所の候補リスト
  for (var y = 0; y < board.length; y++) {
    for (var x = 0; x < board[y].length; x++) {
      if (this.checkBlock(spaceType, x, y, board, color, angle, flip)) {

        // 候補用の色を取得
        var selectedColor = define.COLOR_SELECT;

        // ここに置いた場合の絵を書く
        var cells2 = JSON.parse(JSON.stringify(board));
        this.drawBlock(spaceType, x, y, cells2, selectedColor, angle, flip);

        // 候補をリストに追加
        var kouhoItem = {
          x,
          y,
          cells: cells2,
        }
        kouhoList.push(kouhoItem);
      }
    }
  }

  var cells = this.makeCells(5,5);
  this.drawBlock(spaceType, 0, 0, cells, define.COLOR_SELECT, angle, flip);


  return {
    spaceType,
    kouhoList,
    board: cells,
    angle,
    flip,
  };
}

/**
 * 次へ進む
 */
private goNext = (cpuCallback: ift.CpuCallback) => {

  // ゲーム終了している場合は何もしない
  if (this.gameInfo.nowPlayer < 0) {
    return;
  }
  console.log('CPU START: this.gameInfo=' + this.gameInfo);


  var p = this.gameInfo.players[this.gameInfo.nowPlayer];

  // セットしていないスペースのリストを作る
  var notSetSpaces = [];
  for (var i = 0; i < p.spaces.length; i++) {
    if (p.spaces[i].isSet === false) {
      notSetSpaces.push(p.spaces[i]);
    }
  }

  // ブロック数が多い順に並べる
  notSetSpaces.sort((a, b) => {
    return define.BLOCK_SHAPE[b.type].length - define.BLOCK_SHAPE[a.type].length;
  });


  for (var b = 0; b < notSetSpaces.length; b++) {
    var space = notSetSpaces[b];
    // 全部のセルをチェックしていく
    for (var y = 0; y < this.gameInfo.board.length; y++) {
      for (var x = 0; x < this.gameInfo.board[y].length; x++) {

        // 回転させてチェックする
        for (var angle = 0; angle < 4; angle++) {
          for (i = 0; i < 2; i++) {
            // チェック
            if (this.checkBlock(space.type, x, y, this.gameInfo.board, p.color, angle, (i === 1))) {
              // CPUの場合
              if (this.gameInfo.nowPlayer !== this.gameInfo.loginPlayer) {
                var block = p.spaces[space.type];
                block.x = x;
                block.y = y;
                block.angle = angle;
                block.flip = i === 1;
                block.isSet = true;
                console.log('decideSpace()... change block', block);

                // ボードにスペースを書き込む
                this.drawBlock(space.type, x, y, this.gameInfo.board, p.color, block.angle, block.flip);

                // ポイントを追加
                p.point += define.BLOCK_SHAPE[space.type].length;
                p.blockZansu--;

                // 次のプレイヤー
                this.gameInfo.nowPlayer = this.calcNextPlayer();

                // 通知
                cpuCallback(this.gameInfo);

              } else {
                console.log('login user is not pass');
                return;
              }
              console.log('CPU END');

              if (this.gameInfo.nowPlayer === this.gameInfo.loginPlayer) {
                this.goNext(cpuCallback);
              } else {
                // ２秒待つ
                const timeoutId = setTimeout(() => {
                  clearTimeout(timeoutId);
                  this.goNext(cpuCallback);
                }, define.CPU_TIMER_MSEC);
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
  this.gameInfo.nowPlayer = this.calcNextPlayer();

  // 通知
  cpuCallback(this.gameInfo);
  console.log('CPU END2');

  if (this.gameInfo.nowPlayer === this.gameInfo.loginPlayer) {
    this.goNext(cpuCallback);
  } else {
    // ２秒待つ
    const timeoutId = setTimeout(() => {
      clearTimeout(timeoutId);
      this.goNext(cpuCallback);
    }, define.CPU_TIMER_MSEC);
  }
};

private calcNextPlayer = () => {

  var next = this.gameInfo.nowPlayer;
  for (var i = 0; i < this.gameInfo.players.length; i++) {
    next++;
    if (next >= 4) {
      next = 0;
    }
    if (this.gameInfo.players[next].pass === false) {
      return next;
    }

  }
  return -1;
};
}
