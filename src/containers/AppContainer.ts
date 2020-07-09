import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import AppComponent from '../components/AppComponent'
import { AllState } from '../entity/store';

const mapStateToProps = (state: AllState) => ({
  app: state.app,
})

const mapDispatchToProps = (dispatch: ThunkDispatch<AllState, undefined, Action>) => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppComponent)
