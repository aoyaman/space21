
import { Dispatch } from "redux";

import { GameInfo, CellInfo, PlayerInfo, KouhoInfo, BoardInfo } from '../entity/game';
import { makeNewGame, onSelectKouho, onRotate, onFlip, onDecide, CpuCallback, onPass, onWaitCpu } from './game';
import { AllState } from '../entity/store';

/**
 * ゲーム開始
 */
export const START_GAME = 'START_GAME';
interface ActionStartGame {
  type: typeof START_GAME
  game: GameInfo
}
export const startGame = () => (dispatch: Dispatch) => {
  dispatch({
    type: START_GAME,
    game: makeNewGame()
  });
}


/**
 * ゲーム終了
 */
export const END_GAME = 'END_GAME';
interface ActonEndGame {
  type: typeof END_GAME
  game: GameInfo
}

/**
 * CPUの手
 */
export const CPU_PUT = 'CPU_PUT';
interface ActionCpuPut {
  type: typeof CPU_PUT
  board: BoardInfo
  nowPlayer: number
  nextPlayer: number
  player: PlayerInfo[]
}

/**
 * 置くスペースを決定
 */
export const DECIDE_SPACE = 'DECIDE_SPACE';
export interface DecideSpaceInfo {
  board: BoardInfo
  nowPlayer: number
  nextPlayer: number
  player: PlayerInfo[]
  tegoma: CellInfo[][]
}
interface ActionDecideSpace extends DecideSpaceInfo{
  type: typeof DECIDE_SPACE
}
export const decideSpace = (x: number, y: number) => (dispatch: Dispatch, getState: () => AllState) => {
  const { game, select, board, player } = getState();

  // CPUの手を受け取るコールバック関数
  const callback:CpuCallback = (board: BoardInfo, player: PlayerInfo[], nowPlayer: number, nextPlayer: number) => {
    // Reducerに通知する
    dispatch({
      type: 'CPU_PUT',
      board,
      nowPlayer,
      nextPlayer,
      player,
    });
  }

  // 手の決定処理
  const result: DecideSpaceInfo = onDecide(x, y, game.nowPlayer, game.loginPlayer, select.blockType, select.angle, select.flip, board, player, callback);

  // Reducerに通知
  dispatch({
    type: DECIDE_SPACE,
    ...result,
  });

}


/**
 * パスする
 */
export const DECIDE_PASS = 'DECIDE_PASS';
export interface DecidePassInfo {
  nowPlayer: number
  nextPlayer: number
  player: PlayerInfo[]
}
interface ActionDecidePass extends DecidePassInfo{
  type: typeof DECIDE_PASS
}
export const decidePass = () => (dispatch: Dispatch, getState: () => AllState) => {
  const { game, player, board } = getState();

  // CPUの手を受け取るコールバック関数
  const callback:CpuCallback = (board: BoardInfo, player: PlayerInfo[], nowPlayer: number, nextPlayer: number) => {
    // Reducerに通知する
    dispatch({
      type: 'CPU_PUT',
      board,
      nowPlayer,
      nextPlayer,
      player,
    });
  }

  // パスの処理
  const result: DecidePassInfo = onPass(game.nowPlayer, game.loginPlayer, player, board, callback);

  // Reducerに通知
  dispatch({
    type: DECIDE_PASS,
    ...result,
  })
}



/**
 * CPUの順番どうぞ
 */
export const waitCpu = () => (dispatch: Dispatch, getState: () => AllState) => {
  const { game, player, board } = getState();

  // CPUの手を受け取るコールバック関数
  const callback:CpuCallback = (board: BoardInfo, player: PlayerInfo[], nowPlayer: number, nextPlayer: number) => {
    // Reducerに通知する
    dispatch({
      type: 'CPU_PUT',
      board,
      nowPlayer,
      nextPlayer,
      player,
    });
  }

  onWaitCpu(game.nowPlayer, game.loginPlayer, player, board, callback);
}


/**
 * 候補の選択をやめる
 */
export const NOT_SELECT_KOUHO = 'NOT_SELECT_KOUHO';
export interface ActionNotSelectKouho {
  type: typeof NOT_SELECT_KOUHO
}
export const notSelect = () => (dispatch: Dispatch) => {
  dispatch({
    type: NOT_SELECT_KOUHO,
  });
}



/**
 * 候補を選択
 */
export const SELECT_KOUHO = 'SELECT_KOUHO';
export interface SelectKouhoInfo {
  blockType: number
  tegoma: CellInfo[][]
  list: KouhoInfo[]
  cells: CellInfo[][]
  angle: number
  flip: boolean
}
export interface ActionSelectKouho extends SelectKouhoInfo {
  type: typeof SELECT_KOUHO
}
export const selectKouho = (blockType: number) => (dispatch: Dispatch, getState: () => AllState) => {
  const { game, player, board} = getState();
  const result:SelectKouhoInfo = onSelectKouho(blockType, game, player, board);
  dispatch({
    type: SELECT_KOUHO,
    ...result,
  })
}

/**
 * 右に回転する
 */
export const rotateSpace = () => (dispatch: Dispatch, getState: () => AllState) => {
  const {select, board, player, game} = getState();
  const result:SelectKouhoInfo = onRotate(board, select.blockType, player[game.loginPlayer].color, select.angle, select.flip);
  dispatch({
    type: 'SELECT_KOUHO',
    ...result,
  })
}
/**
 * 左右反転する
 */
export const flipSpace = () => (dispatch: Dispatch, getState: () => AllState) => {
  const {select, board, player, game} = getState();
  const result:SelectKouhoInfo = onFlip(board, select.blockType, player[game.loginPlayer].color, select.angle, select.flip);
  dispatch({
    type: 'SELECT_KOUHO',
    ...result,
  })
}


/**
 * 各ReducerのActionTypeを定義
 */
export type AppActionTypes = ActionStartGame | ActonEndGame;
export type BoardActionTypes = ActionStartGame | ActionDecideSpace | ActionCpuPut;
export type GameActionTypes = ActionStartGame | ActionDecideSpace | ActionCpuPut | ActionDecidePass;
export type KouhoActionTypes = ActionStartGame | ActionDecideSpace | ActionSelectKouho | ActionNotSelectKouho;
export type PlayerActionTypes = ActionStartGame | ActionDecideSpace | ActionCpuPut | ActionDecidePass;
export type SelectActionTypes = ActionStartGame | ActionDecideSpace | ActionSelectKouho | ActionNotSelectKouho;
export type TegomaActionTypes = ActionStartGame | ActionDecideSpace;






// 候補を決定する

// 回転する
export const doRotate = () => ({
  type: 'DO_ROTATE',
})


// 左右反転する
export const doFlip = () => ({
  type: 'DO_FLIP',
})
