import { GameInfoState } from "../entity/store";

export const START_GAME = "START_GAME";
export const CHANGE_GAME_INFO = "CHANGE_GAME_INFO";

/**
 * ゲーム情報の更新
 */
export interface ActionChangeGameInfo {
  type: typeof CHANGE_GAME_INFO;
  gameInfo: GameInfoState;
}

/**
 * ゲーム開始
 */
export interface ActionStartGame {
  type: typeof START_GAME;
  gameInfo: GameInfoState;
}
