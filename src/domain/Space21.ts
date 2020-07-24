import * as info from "./GameInfo";
import * as COLOR from "./color";
import * as type from "./SpaceType";

const CPU_TIMER_MSEC = 3000;

export default class Space21 {
  private gameInfo: info.GameInfo;

  /**
   * コンストラクタ
   * @param gameInfo
   */
  constructor(gameInfo?: info.GameInfo, playerTypes?: info.PlayerType[]) {
    if (gameInfo !== undefined) {
      this.gameInfo = JSON.parse(JSON.stringify(gameInfo));
    } else if (playerTypes !== undefined) {
      this.gameInfo = this.makeNewGame(playerTypes);
    } else {
      throw new Error("引数が指定されていません");
    }
  }

  /**
   * GameInfoの初期値を返す
   */
  public static getInitializeGameInfo = (): info.GameInfo => {
    return {
      status: info.GameStatus.NONE,
      date: new Date(),
      nowPlayer: 0,
      loginPlayer: 0,
      board: [],
      players: [],
      cpuWaitMsec: 2000,
    };
  };

  /**
   * ゲーム情報を返す
   * @return GemInfo
   */
  public getInfo = (): info.GameInfo => {
    return this.gameInfo;
  };

  /**
   * 未設定のスペースの中から１つ選ぶ
   *
   * @param spaceIndex: number      スペースのindex
   * @param playerIndex: PlayerIndex  対象となるプレイヤー
   * @return SelectInfo
   */
  public onSelectSpace = (
    spaceType: type.SpaceType,
    playerIndex: info.PlayerIndex
  ): Promise<info.GameInfo> => {
    const promise = new Promise<info.GameInfo>((resolve, reject) => {
      const kouhoList = [];

      const angleDefault = 0;
      const flipDefault = false;

      const playerInfo = this.gameInfo.players[playerIndex];
      // if (playerInfo.playerType !== info.PlayerType.HUMAN) {
      //   reject(new Error("onSelectSpace() HUMANではありません"));
      //   return;
      // }

      if (playerInfo.spaces[spaceType.index].isSet === true) {
        reject(new Error("onSelectSpace() 既にセットされています"));
        return;
      }

      // playerInfo.spaces[spaceType].color = COLOR.SELECT;
      // playerInfo.tegoma = this.makeNexts(playerInfo.spaces);

      const { board } = this.gameInfo;

      // 置ける場所の候補リスト
      for (let y = 0; y < board.length; y += 1) {
        for (let x = 0; x < board[y].length; x += 1) {
          if (
            this.checkBlock(
              spaceType,
              x,
              y,
              board,
              playerInfo.color,
              angleDefault,
              flipDefault
            )
          ) {
            // 候補用の色を取得
            const color = COLOR.SELECT;

            // ここに置いた場合の絵を書く
            const cells2 = JSON.parse(JSON.stringify(board));
            this.drawBlock(
              spaceType,
              x,
              y,
              cells2,
              color,
              angleDefault,
              flipDefault
            );

            // 候補をリストに追加
            const kouhoItem = {
              x,
              y,
              cells: cells2,
            };
            kouhoList.push(kouhoItem);
          }
        }
      }

      const selectBoard: info.SelectBoard = this.makeCells(6, 6);
      this.drawBlock(spaceType, 0, 0, selectBoard, COLOR.SELECT, 0, false);

      playerInfo.selectInfo = {
        spaceType,
        kouhoList,
        board: selectBoard,
        angle: angleDefault,
        flip: flipDefault,
      };

      resolve(this.gameInfo);
    });
    return promise;
  };

  // 右に回転する
  public rotate = (playerIndex: info.PlayerIndex): Promise<info.GameInfo> => {
    const promise = new Promise<info.GameInfo>((resolve, reject) => {
      const p = this.gameInfo.players[playerIndex];
      if (p.playerType !== info.PlayerType.HUMAN) {
        reject(new Error("onDecide() HUMANではありません"));
      }

      const { selectInfo } = p;
      if (selectInfo === null) {
        reject(new Error("スペースが選択されていません"));
        return;
      }

      selectInfo.angle += 1;
      if (selectInfo.angle >= 4) {
        selectInfo.angle = 0;
      }
      const selectBoard: info.SelectBoard = this.makeCells(6, 6);
      this.drawBlock(
        selectInfo.spaceType,
        0,
        0,
        selectBoard,
        COLOR.SELECT,
        selectInfo.angle,
        selectInfo.flip
      );
      selectInfo.board = selectBoard;

      selectInfo.kouhoList = this.makeKouho(
        selectInfo.spaceType,
        p.color,
        selectInfo.angle,
        selectInfo.flip
      );
      resolve(this.gameInfo);
    });
    return promise;
  };

  // 左右反転する
  public flip = (playerIndex: info.PlayerIndex): Promise<info.GameInfo> => {
    const promise = new Promise<info.GameInfo>((resolve, reject) => {
      const p = this.gameInfo.players[playerIndex];
      if (p.playerType !== info.PlayerType.HUMAN) {
        reject(new Error("onDecide() HUMANではありません"));
      }

      const { selectInfo } = p;
      if (selectInfo === null) {
        reject(new Error("スペースが選択されていません"));
        return;
      }

      selectInfo.flip = !selectInfo.flip;

      const selectBoard: info.SelectBoard = this.makeCells(6, 6);
      this.drawBlock(
        selectInfo.spaceType,
        0,
        0,
        selectBoard,
        COLOR.SELECT,
        selectInfo.angle,
        selectInfo.flip
      );
      selectInfo.board = selectBoard;

      selectInfo.kouhoList = this.makeKouho(
        selectInfo.spaceType,
        p.color,
        selectInfo.angle,
        selectInfo.flip
      );
      resolve(this.gameInfo);
    });
    return promise;
  };

  /**
   * 手の決定
   *
   * @param x
   * @param y
   */
  public onDecide = (x: number, y: number): Promise<info.GameInfo> => {
    const promise = new Promise<info.GameInfo>((resolve, reject) => {
      const p = this.getNowPlayerInfo();
      if (p.playerType !== info.PlayerType.HUMAN) {
        reject(new Error("onDecide() HUMANではありません"));
      }

      const { selectInfo } = p;
      if (selectInfo === null) {
        reject(new Error("スペースが選択されていません"));
        return;
      }

      const spaceInfo = p.spaces[selectInfo.spaceType.index];
      spaceInfo.x = x;
      spaceInfo.y = y;
      spaceInfo.angle = selectInfo.angle;
      spaceInfo.flip = selectInfo.flip;
      spaceInfo.isSet = true;
      console.log("decideSpace()... change spaceInfo", spaceInfo);

      // ボードにスペースを書き込む
      this.drawBlock(
        selectInfo.spaceType,
        x,
        y,
        this.gameInfo.board,
        p.color,
        selectInfo.angle,
        selectInfo.flip
      );

      // ポイントを追加
      p.point += selectInfo.spaceType.point;
      p.blockZansu -= 1;

      // 手駒リストを修正
      p.tegoma = this.makeNexts(p.spaces);

      // 残りの手があるかどうかを調べる
      p.pass = this.calcHands(this.gameInfo.nowPlayer, false).length === 0;

      // 選択状態を解除
      p.selectInfo = null;

      // 次のプレイヤー
      this.gameInfo.nowPlayer = this.calcNextPlayer();
      console.log(`nextPlayer=${this.gameInfo.nowPlayer}`);

      // ゲームの状態
      if (this.gameInfo.nowPlayer < 0) {
        this.gameInfo.status = info.GameStatus.END;
      } else if (this.getNowPlayerInfo().playerType === info.PlayerType.HUMAN) {
        this.gameInfo.status = info.GameStatus.WAIT_USER;
      } else {
        this.gameInfo.status = info.GameStatus.WAIT_CPU;
      }

      // 通知
      resolve(this.gameInfo);
    });

    return promise;
  };

  // // パスする
  // public onPass = (
  //   nowPlayer: number,
  //   loginPlayer: number,
  //   player: info.PlayerInfo[],
  //   board: info.BoardInfo,
  //   cpuCallback: info.CpuCallback
  // ): info.DecidePassInfo => {
  //   var p = player[nowPlayer];
  //   p.pass = true;

  //   // 次のプレイヤー
  //   var nextPlayer = this.calcNextPlayer(nowPlayer, player);

  //   // ２秒待つ
  //   const timeoutId = setTimeout(() => {
  //     clearTimeout(timeoutId);
  //     this.goNext(board, player, nowPlayer, loginPlayer, cpuCallback);
  //   }, define.CPU_TIMER_MSEC);

  //   return {
  //     nowPlayer: nowPlayer,
  //     nextPlayer,
  //     player,
  //   };
  // };

  // CPUの順番スタート
  public goCpu = (): Promise<info.GameInfo> => {
    const promise = new Promise<info.GameInfo>((resolve, reject) => {
      const p = this.getNowPlayerInfo();
      if (p.playerType !== info.PlayerType.CPU) {
        reject(new Error("onDecide() CPUではありません"));
      }

      const hands: info.Hand[] = this.calcHands(this.gameInfo.nowPlayer, false);
      if (hands.length === 0) {
        p.pass = true;
      } else {
        const hand = hands[0];
        const space = p.spaces[hand.spaceIndex];
        space.x = hand.x;
        space.y = hand.y;
        space.angle = hand.angle;
        space.flip = hand.flip;
        space.isSet = true;
        console.log("decideSpace()... change space", space);

        // ボードにスペースを書き込む
        this.drawBlock(
          space.type,
          space.x,
          space.y,
          this.gameInfo.board,
          p.color,
          space.angle,
          space.flip
        );

        // ポイントを追加
        p.point += space.type.point;
        p.blockZansu -= 1;

        // 手駒リストを修正
        p.tegoma = this.makeNexts(p.spaces);

        // 残りの手があるかどうかを調べる
        p.pass = this.calcHands(this.gameInfo.nowPlayer, false).length === 0;
      }
      // 次のプレイヤー
      this.gameInfo.nowPlayer = this.calcNextPlayer();
      console.log(`nextPlayer=${this.gameInfo.nowPlayer}`);

      // ゲームの状態
      if (this.gameInfo.nowPlayer < 0) {
        this.gameInfo.status = info.GameStatus.END;
      } else if (this.getNowPlayerInfo().playerType === info.PlayerType.HUMAN) {
        this.gameInfo.status = info.GameStatus.WAIT_USER;
      } else {
        this.gameInfo.status = info.GameStatus.WAIT_CPU;
      }

      // 通知
      resolve(this.gameInfo);
    });
    return promise;
  };

  // ----------------------------------------------------------------------------
  // private methods
  // ----------------------------------------------------------------------------

  private getNowPlayerInfo = (): info.PlayerInfo => {
    return this.gameInfo.players[this.gameInfo.nowPlayer];
  };

  private getNowPlayerSpaces = (): info.SpaceInfo[] => {
    return this.getNowPlayerInfo().spaces;
  };

  private makeNewGame = (playerTypes: info.PlayerType[]): info.GameInfo => {
    // プレイヤー情報を作る
    const players: info.PlayerInfo[] = this.makePlayerInfo(playerTypes);

    const nowPlayer = 0;
    const gameInfo: info.GameInfo = {
      status:
        players[0].playerType === info.PlayerType.HUMAN
          ? info.GameStatus.WAIT_USER
          : info.GameStatus.WAIT_CPU,
      date: new Date(),
      nowPlayer,
      loginPlayer: 0,
      board: this.makeCells(info.BOARD_WIDTH, info.BOARD_HEIGHT),
      players,
      cpuWaitMsec: 2000,
    };
    console.log("startGame...", gameInfo);
    return gameInfo;
  };

  /**
   * ブロック候補の表示
   */
  private drawNextBlock = (
    space: info.SpaceInfo,
    cells: info.TegomaInfo,
    color: string
  ) => {
    const shape = space.type.shapes[0];
    const position = space.type.tegomaPosition;
    for (let y = 0; y < shape.length; y += 1) {
      for (let x = 0; x < shape[y].length; x += 1) {
        if (shape[y][x] === 1) {
          const cell = cells[y + position.y][x + position.x];
          cell.color = color;
          cell.spaceType = space.type;
        }
      }
    }
  };

  /**
   * ブロックの色表示
   */
  private drawBlock = (
    spaceType: type.SpaceType,
    targetX: number,
    targetY: number,
    cells: info.BoardInfo | info.SelectBoard,
    color: string,
    angle: number,
    flip: boolean
  ) => {
    const shape = type.getShape(spaceType, angle, flip);

    for (let y = 0; y < shape.length; y += 1) {
      for (let x = 0; x < shape[y].length; x += 1) {
        if (shape[y][x] === 1) {
          const cell = cells[y + targetY][x + targetX];
          cell.color = color;
          cell.spaceType = spaceType;
          cell.isSet = true;
        }
      }
    }
  };

  /**
   * ブロックを置けるかどうかのチェック
   */
  private checkBlock = (
    spaceType: type.SpaceType,
    targetX: number,
    targetY: number,
    cells: info.BoardInfo,
    color: string,
    angle: number,
    flip: boolean
  ) => {
    const shape = type.getShape(spaceType, angle, flip);
    let isCheck = false;

    for (let y = 0; y < shape.length; y += 1) {
      for (let x = 0; x < shape[y].length; x += 1) {
        if (shape[y][x] === 1) {
          const newY = y + targetY;
          const newX = x + targetX;

          // はみ出てたらダメ！
          if (cells.length <= newY) {
            return false;
          }
          if (cells[newY].length <= newX) {
            return false;
          }

          // すでにあってもダメ！
          if (cells[newY][newX].color !== COLOR.DEFAULT) {
            return false;
          }

          // 右隣が同じ色ならダメ
          if (
            newX < cells[newY].length - 1 &&
            cells[newY][newX + 1].color === color
          ) {
            return false;
          }
          // 左隣が同じ色ならダメ
          if (newX > 0 && cells[newY][newX - 1].color === color) {
            return false;
          }
          // 下隣が同じ色ならダメ
          if (
            newY < cells.length - 1 &&
            cells[newY + 1][newX].color === color
          ) {
            return false;
          }
          // 上隣が同じ色ならダメ
          if (newY > 0 && cells[newY - 1][newX].color === color) {
            return false;
          }

          // 右上が同じ色ならOK
          if (
            newY > 0 &&
            newX < cells[newY].length - 1 &&
            cells[newY - 1][newX + 1].color === color
          ) {
            isCheck = true;
          }

          // 左上が同じ色ならOK
          if (
            newY > 0 &&
            newX > 0 &&
            cells[newY - 1][newX - 1].color === color
          ) {
            isCheck = true;
          }

          // 右下が同じ色ならOK
          if (
            newY < cells.length - 1 &&
            newX < cells[newY].length - 1 &&
            cells[newY + 1][newX + 1].color === color
          ) {
            isCheck = true;
          }

          // 左下が同じ色ならOK
          if (
            newY < cells.length - 1 &&
            newX > 0 &&
            cells[newY + 1][newX - 1].color === color
          ) {
            isCheck = true;
          }

          // 四角を踏んでたらOK
          if (
            (newX === 0 && newY === 0) ||
            (newX === 0 && newY === cells[newY].length - 1) ||
            (newX === cells.length - 1 && newY === 0) ||
            (newX === cells.length - 1 && newY === cells[newY].length - 1)
          ) {
            isCheck = true;
          }
        }
      }
    }
    return isCheck;
  };

  private makeKouho = (
    spaceType: type.SpaceType,
    color: string,
    angle: number,
    flip: boolean
  ): info.KouhoInfo[] => {
    const kouhoList: info.KouhoInfo[] = [];
    const { board } = this.gameInfo;

    // 置ける場所の候補リスト
    for (let y = 0; y < board.length; y += 1) {
      for (let x = 0; x < board[y].length; x += 1) {
        if (this.checkBlock(spaceType, x, y, board, color, angle, flip)) {
          // 候補用の色を取得
          const color2 = COLOR.SELECT;

          // ここに置いた場合の絵を書く
          const cells2 = JSON.parse(JSON.stringify(board));
          this.drawBlock(spaceType, x, y, cells2, color2, angle, flip);

          // 候補をリストに追加
          const kouhoItem = {
            x,
            y,
            cells: cells2,
          };
          kouhoList.push(kouhoItem);
        }
      }
    }
    return kouhoList;
  };

  /**
   * 指定したプレイヤーの手を計算する
   *
   * @param playerIndex プレイヤー番号を指定
   * @param isAll       trueであれば全ての手を計算、falseであれば１だけ探す
   */
  private calcHands = (
    playerIndex: info.PlayerIndex,
    isAll: boolean
  ): info.Hand[] => {
    const handList: info.Hand[] = [];

    const p = this.gameInfo.players[this.gameInfo.nowPlayer];

    // セットしていないスペースのリストを作る
    const notSetSpaces: info.SpaceInfo[] = [];
    for (let i = 0; i < p.spaces.length; i += 1) {
      if (p.spaces[i].isSet === false) {
        notSetSpaces.push(p.spaces[i]);
      }
    }

    // ブロック数が多い順に並べる
    notSetSpaces.sort((a: info.SpaceInfo, b: info.SpaceInfo) => {
      return b.type.point - a.type.point;
    });

    for (let b = 0; b < notSetSpaces.length; b += 1) {
      const space = notSetSpaces[b];
      // 全部のセルをチェックしていく
      for (let y = 0; y < this.gameInfo.board.length; y += 1) {
        for (let x = 0; x < this.gameInfo.board[y].length; x += 1) {
          // 回転させてチェックする
          for (let angle = 0; angle < 4; angle += 1) {
            for (let i = 0; i < 2; i += 1) {
              // チェック
              if (
                this.checkBlock(
                  space.type,
                  x,
                  y,
                  this.gameInfo.board,
                  p.color,
                  angle,
                  i === 1
                )
              ) {
                const hand: info.Hand = {
                  spaceIndex: space.type.index,
                  x,
                  y,
                  angle,
                  flip: i === 1,
                };
                handList.push(hand);
                if (isAll === false) {
                  return handList;
                }
              }
            }
          }
        }
      }
    }

    return handList;
  };

  /**
   * 次へ進む
   */
  private goNext = (cpuCallback: info.CpuCallback) => {
    // ゲーム終了している場合は何もしない
    if (this.gameInfo.nowPlayer < 0) {
      return;
    }
    console.log(`CPU START: this.gameInfo=${this.gameInfo}`);

    const p = this.gameInfo.players[this.gameInfo.nowPlayer];

    // セットしていないスペースのリストを作る
    const notSetSpaces: info.SpaceInfo[] = [];
    for (let i = 0; i < p.spaces.length; i += 1) {
      if (p.spaces[i].isSet === false) {
        notSetSpaces.push(p.spaces[i]);
      }
    }

    // ブロック数が多い順に並べる
    notSetSpaces.sort((a: info.SpaceInfo, b: info.SpaceInfo) => {
      return b.type.point - a.type.point;
    });

    for (let b = 0; b < notSetSpaces.length; b += 1) {
      const space = notSetSpaces[b];
      // 全部のセルをチェックしていく
      for (let y = 0; y < this.gameInfo.board.length; y += 1) {
        for (let x = 0; x < this.gameInfo.board[y].length; x += 1) {
          // 回転させてチェックする
          for (let angle = 0; angle < 4; angle += 1) {
            for (let i = 0; i < 2; i += 1) {
              // チェック
              if (
                this.checkBlock(
                  space.type,
                  x,
                  y,
                  this.gameInfo.board,
                  p.color,
                  angle,
                  i === 1
                )
              ) {
                // CPUの場合
                if (this.gameInfo.nowPlayer !== this.gameInfo.loginPlayer) {
                  space.x = x;
                  space.y = y;
                  space.angle = angle;
                  space.flip = i === 1;
                  space.isSet = true;
                  console.log("decideSpace()... change space", space);

                  // ボードにスペースを書き込む
                  this.drawBlock(
                    space.type,
                    x,
                    y,
                    this.gameInfo.board,
                    p.color,
                    space.angle,
                    space.flip
                  );

                  // ポイントを追加
                  p.point += space.type.point;
                  p.blockZansu -= 1;

                  // 次のプレイヤー
                  this.gameInfo.nowPlayer = this.calcNextPlayer();

                  // 通知
                  cpuCallback(this.gameInfo);
                } else {
                  console.log("login user is not pass");
                  return;
                }
                console.log("CPU END");

                if (this.gameInfo.nowPlayer === this.gameInfo.loginPlayer) {
                  this.goNext(cpuCallback);
                } else {
                  // ２秒待つ
                  const timeoutId = setTimeout(() => {
                    clearTimeout(timeoutId);
                    this.goNext(cpuCallback);
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
    this.gameInfo.nowPlayer = this.calcNextPlayer();

    // 通知
    cpuCallback(this.gameInfo);
    console.log("CPU END2");

    if (this.gameInfo.nowPlayer === this.gameInfo.loginPlayer) {
      this.goNext(cpuCallback);
    } else {
      // ２秒待つ
      const timeoutId = setTimeout(() => {
        clearTimeout(timeoutId);
        this.goNext(cpuCallback);
      }, CPU_TIMER_MSEC);
    }
  };

  private calcNextPlayer = () => {
    let next = this.gameInfo.nowPlayer;
    for (let i = 0; i < this.gameInfo.players.length; i += 1) {
      next += 1;
      if (next >= 4) {
        next = 0;
      }
      if (this.gameInfo.players[next].pass === false) {
        return next;
      }
    }
    return -1;
  };

  private makeNexts = (blocks: info.SpaceInfo[]): info.BoardInfo => {
    const cells: info.TegomaInfo = this.makeCells(21, 14);

    for (let i = 0; i < blocks.length; i += 1) {
      if (blocks[i].isSet === false) {
        this.drawNextBlock(blocks[i], cells, blocks[i].color);
      }
    }
    console.log("makeNexts...", cells);
    return cells;
  };

  private makeCells = (w: number, h: number) => {
    const cells = [];
    for (let y = 0; y < h; y += 1) {
      const row = [];
      for (let x = 0; x < w; x += 1) {
        const cell = {
          color: COLOR.DEFAULT,
          spaceType: null,
          isSet: false,
        };
        row.push(cell);
      }
      cells.push(row);
    }
    return cells;
  };

  /**
   * プレイヤーの初期情報を作成
   * @param playerTypes プレイヤー種別の配列
   */
  private makePlayerInfo = (
    playerTypes: info.PlayerType[]
  ): info.PlayerInfo[] => {
    const players: info.PlayerInfo[] = [];
    const colors2 = COLOR.COLORS;
    let userCount = 0;
    let cpuCount = 0;
    for (let i = 0; i < 4; i += 1) {
      const spaces: info.SpaceInfo[] = [];

      for (let b = 0; b < type.SpaceArray.length; b += 1) {
        // Spaceのindexを保持しておく
        type.SpaceArray[b].index = b;

        // Space情報を作成
        const space: info.SpaceInfo = {
          type: type.SpaceArray[b],
          isSet: false,
          color: colors2[i],
          x: -1,
          y: -1,
          angle: 0,
          flip: false,
        };
        spaces.push(space);
      }

      let name: string;
      if (playerTypes[i] === info.PlayerType.HUMAN) {
        userCount += 1;
        name = `USER${userCount}`;
      } else {
        cpuCount += 1;
        name = `CPU${cpuCount}`;
      }

      const player: info.PlayerInfo = {
        name,
        playerType: playerTypes[i],
        color: colors2[i],
        blockZansu: 21,
        point: 0,
        pass: false,
        spaces,
        tegoma: this.makeNexts(spaces),
        selectInfo: null,
      };
      players.push(player);
    }
    return players;
  };
}
