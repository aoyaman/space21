import { connect } from 'react-redux'
import AppComponent from '../components/AppComponent'

const mapStateToProps = (state, ownProps) => ({
  app: state.app,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppComponent)
