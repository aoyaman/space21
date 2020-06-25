

// ゲーム画面から一覧に戻る
export const backToTheIndex = () => ({
  type: 'BACK_TO_THE_INDEX',
})


// 候補画面からShow画面に戻る
export const backToTheShow = () => ({
  type: 'BACK_TO_THE_SHOW',
})


// ゲームを表示する
export const showGame = index => ({
  type: 'SHOW_GAME',
  index,
})



// 候補を決定する
export const decideKouho = kouhoIndex => ({
  type: 'DECIDE_KOUHO',
  kouhoIndex,
})

// 回転する
export const doRotate = () => ({
  type: 'DO_ROTATE',
})


// 左右反転する
export const doFlip = () => ({
  type: 'DO_FLIP',
})
