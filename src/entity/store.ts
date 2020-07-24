import { GameInfo, PlayerType } from "../domain/GameInfo";

/**
 * アプリの制御用データ
 */
export interface AppState {
  page: string;
}

/**
 * 現在のゲームの情報
 */
export type GameInfoState = GameInfo;

/**
 * プレイヤー種別選択用
 */
export interface PlayerSelect {
  name: string;
  playerType: PlayerType;
}

/**
 * スタート画面
 */
export interface StartState {
  players: PlayerSelect[];
}

/**
 * プレイヤータブ
 */
export interface PlayerTabState {
  tabIndex: number;
}

/**
 * 全てのstroe
 */
export interface AllState {
  app: AppState;
  gameInfo: GameInfoState;
  start: StartState;
  playertab: PlayerTabState;
}
