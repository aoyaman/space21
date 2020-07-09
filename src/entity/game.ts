
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
  blocks: SpaceInfo[]
}

/**
 * ボード盤
 */
export type BoardInfo = CellInfo[][];

/**
 * 手駒の盤
 */
export type TegomaInfo = CellInfo[][];


/**
 * ゲーム情報
 */
export interface GameInfo {
  date: Date
  nowPlayer: number
  loginPlayer: number
  cells: BoardInfo
  players: PlayerInfo[]
  isLoginUserNow: boolean
  nowPlayerName: string
  tegoma: TegomaInfo
}

/**
 * 候補の情報
 */
export interface KouhoInfo {
  x: number
  y: number
  cells: CellInfo[][]
}
