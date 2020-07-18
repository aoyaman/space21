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
  name: string
  playerType: PlayerType
}

/**
 * スタート画面
 */
export interface StartState {
  players: PlayerSelect[]
}
// /**
//  * ゲーム進行情報
//  */
// export interface GameState {
//   id: number | null;
//   date: Date | null;
//   nowPlayer: number;
//   loginPlayer: number;
// }

// /**
//  * ボードの表示データ
//  */
// export type BoardState = BoardInfo;

// /**
//  * プレイヤーの情報
//  */
// export type PlayerState = PlayerInfo[];

// /**
//  * 選択している候補の情報
//  */
// export type KouhoState = KouhoInfo[];

// /**
//  * 選択しているスペースの情報
//  */
// export interface SelectState {
//   blockType: number;
//   angle: number;
//   flip: boolean;
//   cells: CellInfo[][];
// }

// /**
//  * 手駒の情報
//  */
// export type TegomaState = TegomaInfo;

/**
 * 全てのstroe
 */
export interface AllState {
  app: AppState;
  gameInfo: GameInfoState;
}
