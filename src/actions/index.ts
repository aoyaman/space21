
import { Dispatch } from "redux";

import { GameInfo, CellInfo, PlayerInfo, KouhoInfo, BoardInfo } from '../entity/game';
import { makeNewGame, onSelectKouho, onRotate, onFlip, onDecide } from './game';
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
  const result: DecideSpaceInfo = onDecide(x, y, game.nowPlayer, select.blockType, select.angle, select.flip, board, player);
  dispatch({
    type: DECIDE_SPACE,
    ...result,
  })
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
export type BoardActionTypes = ActionStartGame | ActionDecideSpace;
export type GameActionTypes = ActionStartGame | ActionDecideSpace;
export type KouhoActionTypes = ActionStartGame | ActionDecideSpace | ActionSelectKouho;
export type PlayerActionTypes = ActionStartGame | ActionDecideSpace;
export type SelectActionTypes = ActionStartGame | ActionDecideSpace | ActionSelectKouho;
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
