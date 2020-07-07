import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';

import { AllState } from '../entity/store';

import { selectKouho, startGame, rotateSpace, flipSpace, decideSpace } from '../actions'
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
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GamePlayComponent)
