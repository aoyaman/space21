import { connect } from 'react-redux'
import StartComponent from '../components/StartComponent'

import { startGame } from '../actions/game'

const mapStateToProps = (state, ownProps) => ({
  app: state.app,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onStart: () => dispatch(startGame()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StartComponent)
