import { connect } from 'react-redux'
import { showGame } from '../actions'
import { startGame } from '../actions/game'
import GameIndexComponent from '../components/GameIndexComponent'

const mapStateToProps = (state, ownProps) => ({
  games: state.games,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onStart: () => dispatch(startGame()),
  onShowGame: index => dispatch(showGame(index))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameIndexComponent)
