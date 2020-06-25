import { connect } from 'react-redux'
import { backToTheShow } from '../actions'
import GameShowComponent from '../components/GameShowComponent'

const mapStateToProps = (state, ownProps) => ({
  game: state.games[state.app.selectedGame >= 0 ? state.app.selectedGame : state.games.length - 1 ],
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onBack: () => dispatch(backToTheShow(ownProps.filter))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameShowComponent)
