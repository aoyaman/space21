import { GameInfoState } from "../entity/store";
import { PlayerType } from "../domain/GameInfo";

export const START_GAME = "START_GAME";
export const CHANGE_GAME_INFO = "CHANGE_GAME_INFO";
export const CHANGE_PLAYER_SELECT = "CHANGE_PLAYER_SELECT";

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

/**
 * ゲーム開始時のプレイヤー種別選択
 */
export interface ActionChangePlayerSelect {
  type: typeof CHANGE_PLAYER_SELECT;
  index: number;
  playerType: PlayerType;
}
