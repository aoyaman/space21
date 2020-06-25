import { connect } from 'react-redux'
import { backToTheIndex } from '../actions'
import { selectKouho } from '../actions/game'
import GameShowComponent from '../components/GameShowComponent'

const mapStateToProps = (state, ownProps) => ({
  game: state.games[state.app.selectedGame >= 0 ? state.app.selectedGame : state.games.length - 1 ],
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onBack: () => dispatch(backToTheIndex(ownProps.filter)),
  onSelectKouho: blockType => dispatch(selectKouho(blockType)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameShowComponent)
