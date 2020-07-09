import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';

import { AllState } from '../entity/store';


import StartComponent from '../components/StartComponent'

import { startGame } from '../actions'

const mapStateToProps = (state: AllState) => ({
  app: state.app,
})

const mapDispatchToProps = (dispatch: ThunkDispatch<AllState, undefined, Action>) => ({
  onStart: () => dispatch(startGame()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StartComponent)
