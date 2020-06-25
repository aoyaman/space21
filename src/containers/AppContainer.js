import { connect } from 'react-redux'
import { startGame } from '../actions'
import AppComponent from '../components/AppComponent'

const mapStateToProps = (state, ownProps) => ({
  app: state.app,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onStart: () => dispatch(startGame(ownProps.filter))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppComponent)
