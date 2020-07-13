import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { Action } from "redux";

import { AllState } from "../entity/store";

import {
  selectKouho,
  startGame,
  rotateSpace,
  flip,
  decideSpace,
  notSelect,
} from "../actions";
import GamePlayComponent from "../components/GamePlayComponent";

const mapStateToProps = (state: AllState) => {
  console.log("GamePlayerContainers...", state);
  const value = {
    gameInfo: state.gameInfo,
  };
  return value;
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<AllState, undefined, Action>
) => ({
  onSelectKouho: (blockType: number) => dispatch(selectKouho(blockType)),
  onRestart: () => dispatch(startGame()),
  onRotate: () => dispatch(rotateSpace()),
  onFlip: () => dispatch(flip()),
  onDecide: (x: number, y: number) => dispatch(decideSpace(x, y)),
  onNotSelect: () => dispatch(notSelect()),
});

export default connect(mapStateToProps, mapDispatchToProps)(GamePlayComponent);
