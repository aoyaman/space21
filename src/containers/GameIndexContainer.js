import { connect } from 'react-redux'
import { startGame, showGame } from '../actions'
import GameIndexComponent from '../components/GameIndexComponent'

const mapStateToProps = (state, ownProps) => ({
  games: state.games,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onStart: () => dispatch(startGame(ownProps.filter)),
  onShowGame: index => dispatch(showGame(index))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameIndexComponent)
