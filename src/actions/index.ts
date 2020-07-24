import { Dispatch } from "redux";

import { GameInfo } from "../domain/GameInfo";
import Space21 from "../domain/Space21";
import * as info from "../domain/GameInfo";
import { AllState } from "../entity/store";
import * as types from "./types";
import { SpaceType } from "../domain/SpaceType";

/**
 * Space21からのGameInfoを受け取った時の処理
 *
 * @param dispatch
 * @param space21
 * @param gameInfo
 */
const onRecvGameInfo = (
  dispatch: Dispatch,
  space21: Space21,
  gameInfo: GameInfo
) => {
  dispatch({
    type: types.CHANGE_GAME_INFO,
    gameInfo,
  });

  if (gameInfo.status === info.GameStatus.WAIT_CPU) {
    const timeoutId = setTimeout(() => {
      clearTimeout(timeoutId);

      space21.goCpu().then((gameInfo2: info.GameInfo): void => {
        onRecvGameInfo(dispatch, space21, gameInfo2);
      });
    }, gameInfo.cpuWaitMsec);
  }
};

/**
 * ゲーム開始
 */
export const startGame = () => (
  dispatch: Dispatch,
  getState: () => AllState
): void => {
  const { start } = getState();
  const playerTypes: info.PlayerType[] = [
    start.players[0].playerType,
    start.players[1].playerType,
    start.players[2].playerType,
    start.players[3].playerType,
  ];
  const space21: Space21 = new Space21(undefined, playerTypes);
  dispatch({
    type: types.START_GAME,
    gameInfo: space21.getInfo(),
  });
  if (space21.getInfo().status === info.GameStatus.WAIT_CPU) {
    const timeoutId = setTimeout(() => {
      clearTimeout(timeoutId);

      space21.goCpu().then((gameInfo2: info.GameInfo): void => {
        onRecvGameInfo(dispatch, space21, gameInfo2);
      });
    }, space21.getInfo().cpuWaitMsec);
  }
};

/**
 * 置くスペースを決定
 */
export const decideSpace = (x: number, y: number) => (
  dispatch: Dispatch,
  getState: () => AllState
): void => {
  const { gameInfo } = getState();
  const space21: Space21 = new Space21(gameInfo);
  space21.onDecide(x, y).then((gameInfo2: info.GameInfo): void => {
    onRecvGameInfo(dispatch, space21, gameInfo2);
  });
};

/**
 * 候補の選択をやめる
 */
export const NOT_SELECT_KOUHO = "NOT_SELECT_KOUHO";
export interface ActionNotSelectKouho {
  type: typeof NOT_SELECT_KOUHO;
}
export const notSelect = () => (dispatch: Dispatch): void => {
  dispatch({
    type: NOT_SELECT_KOUHO,
  });
};

/**
 * 候補を選択
 */
export const selectKouho = (spaceType: SpaceType) => (
  dispatch: Dispatch,
  getState: () => AllState
): void => {
  const { gameInfo } = getState();
  const space21: Space21 = new Space21(gameInfo);
  space21
    .onSelectSpace(spaceType, gameInfo.loginPlayer)
    .then((gameInfo2: info.GameInfo): void => {
      dispatch({
        type: types.CHANGE_GAME_INFO,
        gameInfo: gameInfo2,
      });
    });
};

/**
 * 右に回転する
 */
export const rotateSpace = () => (
  dispatch: Dispatch,
  getState: () => AllState
): void => {
  const { gameInfo } = getState();
  const space21: Space21 = new Space21(gameInfo);
  space21.rotate(gameInfo.loginPlayer).then((gameInfo2: info.GameInfo) => {
    dispatch({
      type: types.CHANGE_GAME_INFO,
      gameInfo: gameInfo2,
    });
  });
};
/**
 * 左右反転する
 */
export const flip = () => (
  dispatch: Dispatch,
  getState: () => AllState
): void => {
  const { gameInfo } = getState();
  const space21: Space21 = new Space21(gameInfo);
  space21.rotate(gameInfo.loginPlayer).then((gameInfo2: info.GameInfo) => {
    dispatch({
      type: types.CHANGE_GAME_INFO,
      gameInfo: gameInfo2,
    });
  });
};

export const onChangePlayerType = (
  index: number,
  playerType: info.PlayerType
) => (dispatch: Dispatch): void => {
  dispatch({
    type: types.CHANGE_PLAYER_SELECT,
    index,
    playerType,
  });
};
