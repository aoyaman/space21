/**
 * space type
 */

/**
 * スペースの形の１ビットの値定義
 */
export type SpaceShapeBit = 0 | 1;

/**
 * スペースの形
 */
export type SpaceShape = [
  [
    SpaceShapeBit,
    SpaceShapeBit,
    SpaceShapeBit,
    SpaceShapeBit,
    SpaceShapeBit,
    SpaceShapeBit
  ],
  [
    SpaceShapeBit,
    SpaceShapeBit,
    SpaceShapeBit,
    SpaceShapeBit,
    SpaceShapeBit,
    SpaceShapeBit
  ],
  [
    SpaceShapeBit,
    SpaceShapeBit,
    SpaceShapeBit,
    SpaceShapeBit,
    SpaceShapeBit,
    SpaceShapeBit
  ],
  [
    SpaceShapeBit,
    SpaceShapeBit,
    SpaceShapeBit,
    SpaceShapeBit,
    SpaceShapeBit,
    SpaceShapeBit
  ],
  [
    SpaceShapeBit,
    SpaceShapeBit,
    SpaceShapeBit,
    SpaceShapeBit,
    SpaceShapeBit,
    SpaceShapeBit
  ],
  [
    SpaceShapeBit,
    SpaceShapeBit,
    SpaceShapeBit,
    SpaceShapeBit,
    SpaceShapeBit,
    SpaceShapeBit
  ]
];

/**
 * スペースの配置情報
 */
export interface SpacePosition {
  x: number;
  y: number;
}

/**
 * スペースの定義
 */
export interface SpaceType {
  name: string;
  index: number;
  point: number;
  tegomaPosition: SpacePosition;
  shapes: SpaceShape[];
}

/**
 * Tohu
 */
export const TOHU: SpaceType = {
  name: "Tohu",
  index: 0,
  point: 6,
  tegomaPosition: { x: 0, y: 0 },
  shapes: [
    [
      // angle:0, flip:0
      [1, 1, 1, 0, 0, 0],
      [1, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:0, flip:1
      [1, 1, 1, 0, 0, 0],
      [1, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:1, flip:0
      [1, 1, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:1, flip:1
      [1, 1, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:2, flip:0
      [1, 1, 1, 0, 0, 0],
      [1, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:2, flip:1
      [1, 1, 1, 0, 0, 0],
      [1, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:3, flip:0
      [1, 1, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:3, flip:1
      [1, 1, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
  ],
};

/**
 * Bean
 */
export const BEAN: SpaceType = {
  name: "Bean",
  index: 0,
  point: 1,
  tegomaPosition: { x: 4, y: 0 },
  shapes: [
    [
      // angle:0, flip:0
      [1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:0, flip:1
      [1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:1, flip:0
      [1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:1, flip:1
      [1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:2, flip:0
      [1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:2, flip:1
      [1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:3, flip:0
      [1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:3, flip:1
      [1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
  ],
};

/**
 * 2 Bar
 */
export const BAR2: SpaceType = {
  name: "2 Bar",
  index: 0,
  point: 2,
  tegomaPosition: { x: 6, y: 0 },
  shapes: [
    [
      // angle:0, flip:0
      [1, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:0, flip:1
      [1, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:1, flip:0
      [1, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:1, flip:1
      [1, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:2, flip:0
      [1, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:2, flip:1
      [1, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:3, flip:0
      [1, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:3, flip:1
      [1, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
  ],
};

/**
 * 3BAR
 */
export const BAR3: SpaceType = {
  name: "3 Bar",
  index: 0,
  point: 3,
  tegomaPosition: { x: 9, y: 0 },
  shapes: [
    [
      // angle:0, flip:0
      [1, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:0, flip:1
      [1, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:1, flip:0
      [1, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:1, flip:1
      [1, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:2, flip:0
      [1, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:2, flip:1
      [1, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:3, flip:0
      [1, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:3, flip:1
      [1, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
  ],
};

/**
 * 4BAR
 */
export const BAR4: SpaceType = {
  name: "4 Bar",
  index: 0,
  point: 4,
  tegomaPosition: { x: 13, y: 0 },
  shapes: [
    [
      // angle:0, flip:0
      [1, 1, 1, 1, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:0, flip:1
      [1, 1, 1, 1, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:1, flip:0
      [1, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:1, flip:1
      [1, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:2, flip:0
      [1, 1, 1, 1, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:2, flip:1
      [1, 1, 1, 1, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:3, flip:0
      [1, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:3, flip:1
      [1, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
  ],
};

/**
 * Mountain
 */
export const MOUNT: SpaceType = {
  name: "Mountain",
  index: 0,
  point: 4,
  tegomaPosition: { x: 18, y: 0 },
  shapes: [
    [
      // angle:0, flip:0
      [0, 1, 0, 0, 0, 0],
      [1, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:0, flip:1
      [0, 1, 0, 0, 0, 0],
      [1, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:1, flip:0
      [1, 0, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:1, flip:1
      [0, 1, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:2, flip:0
      [1, 1, 1, 0, 0, 0],
      [0, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:2, flip:1
      [1, 1, 1, 0, 0, 0],
      [0, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:3, flip:0
      [0, 1, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:3, flip:1
      [1, 0, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
  ],
};

/**
 * 6BAR
 */
export const BAR6: SpaceType = {
  name: "6 Bar",
  index: 0,
  point: 6,
  tegomaPosition: { x: 0, y: 4 },
  shapes: [
    [
      // angle:0, flip:0
      [1, 1, 1, 1, 1, 1],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:0, flip:1
      [1, 1, 1, 1, 1, 1],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:1, flip:0
      [1, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0],
    ],
    [
      // angle:1, flip:1
      [1, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0],
    ],
    [
      // angle:2, flip:0
      [1, 1, 1, 1, 1, 1],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:2, flip:1
      [1, 1, 1, 1, 1, 1],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:3, flip:0
      [1, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0],
    ],
    [
      // angle:3, flip:1
      [1, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0],
    ],
  ],
};

/**
 * Big Hook
 */
export const HOOK_BIG: SpaceType = {
  name: "Big Hook",
  index: 0,
  point: 6,
  tegomaPosition: { x: 7, y: 3 },
  shapes: [
    [
      // angle:0, flip:0
      [0, 0, 0, 0, 1, 0],
      [1, 1, 1, 1, 1, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:0, flip:1
      [1, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:1, flip:0
      [1, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:1, flip:1
      [0, 1, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:2, flip:0
      [1, 1, 1, 1, 1, 0],
      [1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:2, flip:1
      [1, 1, 1, 1, 1, 0],
      [0, 0, 0, 0, 1, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:2, flip:0
      [1, 1, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:2, flip:1
      [1, 1, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
  ],
};

/**
 * Hook
 */
export const HOOK: SpaceType = {
  name: "Hook",
  index: 0,
  point: 4,
  tegomaPosition: { x: 13, y: 3 },
  shapes: [
    [
      // angle:0, flip:0
      [0, 0, 1, 0, 0, 0],
      [1, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:0, flip:1
      [1, 0, 0, 0, 0, 0],
      [1, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:1, flip:0
      [1, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:1, flip:0
      [0, 1, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:2, flip:0
      [1, 1, 1, 0, 0, 0],
      [1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:2, flip:1
      [1, 1, 1, 0, 0, 0],
      [0, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:3, flip:0
      [1, 1, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:3, flip:1
      [1, 1, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
  ],
};

/**
 * Wide Mountain
 */
export const MOUNT_WIDE: SpaceType = {
  name: "Wide Mountain",
  index: 0,
  point: 5,
  tegomaPosition: { x: 17, y: 3 },
  shapes: [
    [
      // angle:0, flip:0
      [0, 0, 1, 0, 0, 0],
      [1, 1, 1, 1, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:0, flip:1
      [0, 1, 0, 0, 0, 0],
      [1, 1, 1, 1, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:1, flip:0
      [1, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:1, flip:1
      [0, 1, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:2, flip:0
      [1, 1, 1, 1, 0, 0],
      [0, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:2, flip:1
      [1, 1, 1, 1, 0, 0],
      [0, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:3, flip:0
      [0, 1, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:3, flip:1
      [1, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
  ],
};

/**
 * T
 */
export const T: SpaceType = {
  name: "T",
  index: 0,
  point: 6,
  tegomaPosition: { x: 0, y: 6 },
  shapes: [
    [
      // angle:0, flip:0
      [1, 1, 1, 0, 0, 0],
      [0, 1, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:0, flip:1
      [1, 1, 1, 0, 0, 0],
      [0, 1, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:1, flip:0
      [0, 0, 0, 1, 0, 0],
      [1, 1, 1, 1, 0, 0],
      [0, 0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:1, flip:1
      [1, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 0, 0],
      [1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:2, flip:0
      [0, 1, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0],
      [1, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:2, flip:1
      [0, 1, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0],
      [1, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:3, flip:0
      [1, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 0, 0],
      [1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:3, flip:1
      [0, 0, 0, 1, 0, 0],
      [1, 1, 1, 1, 0, 0],
      [0, 0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
  ],
};

/**
 * Step
 */
export const STEP: SpaceType = {
  name: "Step",
  index: 0,
  point: 4,
  tegomaPosition: { x: 4, y: 6 },
  shapes: [
    [
      // angle:0, flip:0
      [0, 1, 1, 0, 0, 0],
      [1, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:0, flip:1
      [1, 1, 0, 0, 0, 0],
      [0, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:1, flip:0
      [1, 0, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:1, flip:1
      [0, 1, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:2, flip:0
      [1, 1, 0, 0, 0, 0],
      [0, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:2, flip:1
      [0, 1, 1, 0, 0, 0],
      [1, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:3, flip:0
      [0, 1, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:3, flip:1
      [1, 0, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
  ],
};

/**
 * Tall Step
 */
export const STEP_TALL: SpaceType = {
  name: "Tall Step",
  index: 0,
  point: 5,
  tegomaPosition: { x: 7, y: 6 },
  shapes: [
    [
      // angle:0, flip:0
      [0, 1, 1, 0, 0, 0],
      [0, 1, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:0, flip:1
      [1, 1, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0],
      [0, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:1, flip:0
      [1, 0, 0, 0, 0, 0],
      [1, 1, 1, 0, 0, 0],
      [0, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:1, flip:1
      [0, 0, 1, 0, 0, 0],
      [1, 1, 1, 0, 0, 0],
      [1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:2, flip:0
      [0, 1, 1, 0, 0, 0],
      [0, 1, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:2, flip:1
      [1, 1, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0],
      [0, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:3, flip:0
      [1, 0, 0, 0, 0, 0],
      [1, 1, 1, 0, 0, 0],
      [0, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:3, flip:1
      [0, 0, 1, 0, 0, 0],
      [1, 1, 1, 0, 0, 0],
      [1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
  ],
};

/**
 * Wide Step
 */
export const STEP_WIDE: SpaceType = {
  name: "Wide Step",
  index: 0,
  point: 5,
  tegomaPosition: { x: 10, y: 7 },
  shapes: [
    [
      // angle:0, flip:0
      [0, 0, 1, 1, 0, 0],
      [1, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:0, flip:1
      [1, 1, 0, 0, 0, 0],
      [0, 1, 1, 1, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:1, flip:0
      [1, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:1, flip:1
      [0, 1, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:2, flip:0
      [0, 1, 1, 1, 0, 0],
      [1, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:2, flip:0
      [1, 1, 1, 0, 0, 0],
      [0, 0, 1, 1, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:3, flip:0
      [1, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:3, flip:1
      [0, 1, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
  ],
};

/**
 * Strange
 */
export const STRANGE: SpaceType = {
  name: "Strange",
  index: 0,
  point: 6,
  tegomaPosition: { x: 15, y: 6 },
  shapes: [
    [
      // angle:0, flip:0
      [0, 0, 1, 0, 0, 0],
      [0, 1, 1, 0, 0, 0],
      [1, 1, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:0, flip:1
      [1, 0, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0],
      [0, 1, 1, 0, 0, 0],
      [0, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:1, flip:0
      [0, 1, 0, 0, 0, 0],
      [1, 1, 1, 0, 0, 0],
      [0, 0, 1, 1, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:1, flip:1
      [0, 0, 1, 0, 0, 0],
      [0, 1, 1, 1, 0, 0],
      [1, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:2, flip:0
      [0, 1, 0, 0, 0, 0],
      [0, 1, 1, 0, 0, 0],
      [1, 1, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:2, flip:1
      [0, 1, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0],
      [0, 1, 1, 0, 0, 0],
      [0, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:3, flip:0
      [1, 1, 0, 0, 0, 0],
      [0, 1, 1, 1, 0, 0],
      [0, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:3, flip:1
      [0, 0, 1, 1, 0, 0],
      [1, 1, 1, 0, 0, 0],
      [0, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
  ],
};

/**
 * Corner
 */
export const CORNER: SpaceType = {
  name: "Corner",
  index: 0,
  point: 3,
  tegomaPosition: { x: 19, y: 7 },
  shapes: [
    [
      // angle:0, flip:0
      [1, 0, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:0, flip:1
      [0, 1, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:1, flip:0
      [1, 1, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:1, flip:1
      [1, 1, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:2, flip:0
      [0, 1, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:2, flip:1
      [1, 0, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:3, flip:0
      [1, 0, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:3, flip:1
      [0, 1, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
  ],
};

/**
 * Knife
 */
export const KNIFE: SpaceType = {
  name: "Knife",
  index: 0,
  point: 7,
  tegomaPosition: { x: 0, y: 11 },
  shapes: [
    [
      // angle:0, flip:0
      [1, 1, 1, 1, 0, 0],
      [1, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:0, flip:1
      [1, 1, 1, 1, 0, 0],
      [0, 1, 1, 1, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:1, flip:0
      [1, 1, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:1, flip:1
      [1, 1, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:2, flip:0
      [0, 1, 1, 1, 0, 0],
      [1, 1, 1, 1, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:2, flip:1
      [1, 1, 1, 0, 0, 0],
      [1, 1, 1, 1, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:3, flip:0
      [1, 0, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:3, flip:1
      [0, 1, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
  ],
};

/**
 * C
 */
export const C: SpaceType = {
  name: "C",
  index: 0,
  point: 5,
  tegomaPosition: { x: 5, y: 11 },
  shapes: [
    [
      // angle:0, flip:0
      [1, 1, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:0, flip:1
      [1, 1, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:1, flip:0
      [1, 1, 1, 0, 0, 0],
      [1, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:1, flip:1
      [1, 1, 1, 0, 0, 0],
      [1, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:2, flip:0
      [1, 1, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:2, flip:1
      [1, 1, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:3, flip:0
      [1, 0, 1, 0, 0, 0],
      [1, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:3, flip:1
      [1, 0, 1, 0, 0, 0],
      [1, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
  ],
};

/**
 * Stairs
 */
export const STAIRS: SpaceType = {
  name: "Stairs",
  index: 0,
  point: 7,
  tegomaPosition: { x: 8, y: 10 },
  shapes: [
    [
      // angle:0, flip:0
      [0, 0, 0, 1, 0, 0],
      [0, 0, 1, 1, 0, 0],
      [0, 1, 1, 0, 0, 0],
      [1, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:0, flip:1
      [1, 0, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0],
      [0, 1, 1, 0, 0, 0],
      [0, 0, 1, 1, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:1, flip:0
      [1, 0, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0],
      [0, 1, 1, 0, 0, 0],
      [0, 0, 1, 1, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:1, flip:1
      [0, 0, 0, 1, 0, 0],
      [0, 0, 1, 1, 0, 0],
      [0, 1, 1, 0, 0, 0],
      [1, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:2, flip:0
      [0, 0, 1, 1, 0, 0],
      [0, 1, 1, 0, 0, 0],
      [1, 1, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:2, flip:1
      [1, 1, 0, 0, 0, 0],
      [0, 1, 1, 0, 0, 0],
      [0, 0, 1, 1, 0, 0],
      [0, 0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:3, flip:0
      [1, 1, 0, 0, 0, 0],
      [0, 1, 1, 0, 0, 0],
      [0, 0, 1, 1, 0, 0],
      [0, 0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:3, flip:1
      [0, 0, 1, 1, 0, 0],
      [0, 1, 1, 0, 0, 0],
      [1, 1, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
  ],
};

/**
 * L
 */
export const L: SpaceType = {
  name: "L",
  index: 0,
  point: 5,
  tegomaPosition: { x: 13, y: 11 },
  shapes: [
    [
      // angle:0, flip:0
      [1, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0],
      [1, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:0, flip:1
      [0, 0, 1, 0, 0, 0],
      [0, 0, 1, 0, 0, 0],
      [1, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:1, flip:0
      [1, 1, 1, 0, 0, 0],
      [1, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:1, flip:1
      [1, 1, 1, 0, 0, 0],
      [0, 0, 1, 0, 0, 0],
      [0, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:2, flip:0
      [1, 1, 1, 0, 0, 0],
      [0, 0, 1, 0, 0, 0],
      [0, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:2, flip:1
      [1, 1, 1, 0, 0, 0],
      [1, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:3, flip:0
      [0, 0, 1, 0, 0, 0],
      [0, 0, 1, 0, 0, 0],
      [1, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:3, flip:1
      [1, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0],
      [1, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
  ],
};

/**
 * CROSS
 */
export const CROSS: SpaceType = {
  name: "CROSS",
  index: 0,
  point: 6,
  tegomaPosition: { x: 17, y: 10 },
  shapes: [
    [
      // angle:0, flip:0
      [0, 1, 0, 0, 0, 0],
      [1, 1, 1, 0, 0, 0],
      [0, 1, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:0, flip:1
      [0, 1, 0, 0, 0, 0],
      [1, 1, 1, 0, 0, 0],
      [0, 1, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:1, flip:0
      [0, 0, 1, 0, 0, 0],
      [1, 1, 1, 1, 0, 0],
      [0, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:1, flip:1
      [0, 1, 0, 0, 0, 0],
      [1, 1, 1, 1, 0, 0],
      [0, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:2, flip:0
      [0, 1, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0],
      [1, 1, 1, 0, 0, 0],
      [0, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:2, flip:1
      [0, 1, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0],
      [1, 1, 1, 0, 0, 0],
      [0, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:3, flip:0
      [0, 1, 0, 0, 0, 0],
      [1, 1, 1, 1, 0, 0],
      [0, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      // angle:3, flip:1
      [0, 0, 1, 0, 0, 0],
      [1, 1, 1, 1, 0, 0],
      [0, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
  ],
};

/**
 * スペースの全種別の配列
 */
export const SpaceArray: SpaceType[] = [
  TOHU,
  BEAN,
  BAR2,
  BAR3,
  BAR4,
  MOUNT,
  BAR6,
  HOOK_BIG,
  HOOK,
  MOUNT_WIDE,
  T,
  STEP,
  STEP_TALL,
  STEP_WIDE,
  STRANGE,
  CORNER,
  KNIFE,
  C,
  STAIRS,
  L,
  CROSS,
];

/**
 * angleとflipからshapeを取得
 *
 * @param spaceType
 * @param angle
 * @param flip
 */
export const getShape = (
  spaceType: SpaceType,
  angle: number,
  flip: boolean
): SpaceShape => {
  // 0 = angle: 0, flip: false
  // 1 = angle: 0, flip: true
  // 2 = angle: 1, flip: false
  // 3 = angle: 1, flip: true
  // 4 = angle: 2, flip: false
  // 5 = angle: 2, flip: true
  // 6 = angle: 3, flip: false
  // 7 = angle: 3, flip: true
  const index = angle * 2 + (flip ? 1 : 0);
  return spaceType.shapes[index];
};
