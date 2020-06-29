import { connect } from 'react-redux'
import { selectKouho, startGame, rotateSpace, flipSpace, decideSpace, waitCpu, decidePass, notSelect } from '../actions/game'
import GamePlayComponent from '../components/GamePlayComponent'

const mapStateToProps = (state, ownProps) => ({
  game: state.game,
  board: state.board,
  players: state.player,
  tegoma: state.tegoma,
  kouho: state.kouho,
  select: state.select,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSelectKouho: blockType => dispatch(selectKouho(blockType)),
  onRestart: blockType => dispatch(startGame()),
  onRotate: () => dispatch(rotateSpace()),
  onFlip: () => dispatch(flipSpace()),
  onDecide: (x, y) => dispatch(decideSpace(x, y)),
  waitCpu: () => dispatch(waitCpu()),
  decidePass: () => dispatch(decidePass()),
  onNotSelect: () => dispatch(notSelect()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GamePlayComponent)
