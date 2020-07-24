import { SpaceType } from "./SpaceType";

/**
 * セル情報
 */
export interface CellInfo {
  color: string;
  spaceType: SpaceType | null;
  isSet: boolean;
}

/**
 * スペース情報
 */
export interface SpaceInfo {
  type: SpaceType;
  isSet: boolean;
  color: string;
  x: number;
  y: number;
  angle: number;
  flip: boolean;
}

/**
 * プレイヤー情報
 */
export interface PlayerInfo {
  name: string;
  playerType: PlayerType;
  color: string;
  blockZansu: number;
  point: number;
  pass: boolean;
  spaces: SpaceInfo[];

  tegoma: TegomaInfo;
  selectInfo: SelectInfo | null;
}

/**
 * ボード盤
 */
export type BoardInfo = CellInfo[][];

/**
 * 手駒の盤
 */
export type TegomaInfo = BoardInfo;

export type PlayerIndex = number;
// export type SpaceType = number;
export type AngleType = number;
export type FlipType = boolean;

/**
 * ゲームの状態
 */
export enum GameStatus {
  NONE = 0,
  WAIT_USER, // ユーザの操作待ち
  WAIT_CPU, // CPUの操作待ち
  END, // ゲーム終了
}

/**
 * プレイヤータイプ
 */
export enum PlayerType {
  CPU = 0,
  HUMAN,
}

/**
 * ゲーム情報
 */
export interface GameInfo {
  status: GameStatus;
  date: Date;
  nowPlayer: PlayerIndex;
  loginPlayer: PlayerIndex;
  board: BoardInfo;
  players: PlayerInfo[];
  cpuWaitMsec: number;
}

/**
 * 候補の情報
 */
export interface KouhoInfo {
  x: number;
  y: number;
  cells: CellInfo[][];
}

/**
 * メインのボード
 */
export type MainBoard = BoardInfo;

/**
 * 選択候補表示用ボード
 */
export type SelectBoard = BoardInfo;

/**
 * 選択状態
 */
export interface SelectInfo {
  spaceType: SpaceType;
  angle: AngleType;
  flip: FlipType;
  board: SelectBoard;
  kouhoList: KouhoInfo[];
}

/**
 * 手
 */
export interface Hand {
  spaceIndex: number;
  x: number;
  y: number;
  angle: AngleType;
  flip: FlipType;
}

export interface DecidePassInfo {
  nowPlayer: number;
  nextPlayer: number;
  player: PlayerInfo[];
}

export type CpuCallback = (gameInfo: GameInfo) => void;

export interface DecideSpaceInfo {
  board: BoardInfo;
  nowPlayer: number;
  nextPlayer: number;
  player: PlayerInfo[];
  tegoma: CellInfo[][];
}

export const BOARD_WIDTH = 21;
export const BOARD_HEIGHT = 21;
