import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { Action } from "redux";

import { AllState } from "../entity/store";

import {
  onSelectPlayerTab,
  selectKouho,
  decideSpace,
  rotateSpace,
  flip,
} from "../actions";
import PlayersComponent from "../components/PlayersComponent";
import { SpaceType } from "../domain/SpaceType";

const mapStateToProps = (state: AllState) => ({
  players: state.gameInfo.players,
  tabIndex: state.playertab.tabIndex,
  nowPlayer: state.gameInfo.nowPlayer,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<AllState, undefined, Action>
) => ({
  onSelectPlayerTab: (index: number) => dispatch(onSelectPlayerTab(index)),
  onSelectKouho: (spaceType: SpaceType) => dispatch(selectKouho(spaceType)),
  onDecide: (x: number, y: number) => dispatch(decideSpace(x, y)),
  onRotate: () => dispatch(rotateSpace()),
  onFlip: () => dispatch(flip()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayersComponent);
