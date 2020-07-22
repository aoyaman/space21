import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { Action } from "redux";

import { AllState } from "../entity/store";

import StartComponent from "../components/StartComponent";

import { startGame, onChangePlayerType } from "../actions";
import { PlayerType } from "../domain/GameInfo";

const mapStateToProps = (state: AllState) => ({
  app: state.app,
  start: state.start,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<AllState, undefined, Action>
) => ({
  onStart: () => dispatch(startGame()),
  onChangePlayerType: (index: number, type: PlayerType) =>
    dispatch(onChangePlayerType(index, type)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StartComponent);
