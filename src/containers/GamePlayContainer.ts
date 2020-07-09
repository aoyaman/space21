import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';

import { AllState } from '../entity/store';

import { selectKouho, startGame, rotateSpace, flipSpace, decideSpace, waitCpu, decidePass, notSelect } from '../actions'
import GamePlayComponent from '../components/GamePlayComponent'

const mapStateToProps = (state: AllState) => ({
  game: state.game,
  board: state.board,
  players: state.player,
  tegoma: state.tegoma,
  kouho: state.kouho,
  select: state.select,
})

const mapDispatchToProps = (dispatch: ThunkDispatch<AllState, undefined, Action>) => ({
  onSelectKouho: (blockType: number) => dispatch(selectKouho(blockType)),
  onRestart: () => dispatch(startGame()),
  onRotate: () => dispatch(rotateSpace()),
  onFlip: () => dispatch(flipSpace()),
  onDecide: (x: number, y: number) => dispatch(decideSpace(x, y)),
  waitCpu: () => dispatch(waitCpu()),
  decidePass: () => dispatch(decidePass()),
  onNotSelect: () => dispatch(notSelect()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GamePlayComponent)
