
// ゲーム開始
export const startGame = text => ({
  type: 'START_GAME'
})

// ゲーム画面から一覧に戻る
export const backToTheShow = () => ({
  type: 'BACK_TO_THE_SHOW',
})


// ゲームを表示する
export const showGame = index => ({
  type: 'SHOW_GAME',
  index,
})
