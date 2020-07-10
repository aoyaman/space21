
 /**
  * セル情報
  */
 export interface CellInfo {
  color: string
  blockType: number
  isSet: boolean
}

/**
 * スペース情報
 */
export interface SpaceInfo {
  type: number
  isSet: boolean
  color: string
  x: number | undefined
  y: number | undefined
  angle: number | undefined
  flip: boolean | undefined
}

/**
 * プレイヤー情報
 */
export interface PlayerInfo {
  name: string
  color: string
  blockZansu: number
  point: number
  pass: boolean
  spaces: SpaceInfo[]
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
export type SpaceType = number;
export type AngleType = number;
export type FlipType = boolean;


/**
 * ゲーム情報
 */
export interface GameInfo {
  date: Date
  nowPlayer: PlayerIndex
  loginPlayer: PlayerIndex
  board: BoardInfo
  players: PlayerInfo[]
  tegoma: TegomaInfo
  selectInfo: SelectInfo
}

/**
 * 候補の情報
 */
export interface KouhoInfo {
  x: number
  y: number
  cells: CellInfo[][]
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
  spaceType: SpaceType
  angle: AngleType
  flip: FlipType
  board: SelectBoard
  kouhoList: KouhoInfo[]
}


export interface DecidePassInfo {
  nowPlayer: number
  nextPlayer: number
  player: PlayerInfo[]
}

export type CpuCallback = (gameInfo: GameInfo) => void;


export interface DecideSpaceInfo {
  board: BoardInfo
  nowPlayer: number
  nextPlayer: number
  player: PlayerInfo[]
  tegoma: CellInfo[][]
}
