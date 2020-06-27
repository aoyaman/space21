import { connect } from 'react-redux'
import { backToTheIndex } from '../actions'
import { selectKouho, startGame } from '../actions/game'
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
  onBack: () => dispatch(backToTheIndex(ownProps.filter)),
  onSelectKouho: blockType => dispatch(selectKouho(blockType)),
  onRestart: blockType => dispatch(startGame()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GamePlayComponent)
