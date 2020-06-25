import { connect } from 'react-redux'
import { backToTheShow, decideKouho, doRotate, doFlip } from '../actions';
import { selectKouho } from '../actions/game'
import GameKouhoComponent from '../components/GameKouhoComponent'

const mapStateToProps = (state, ownProps) => ({
  nexts: state.kouho.nexts,
  list: state.kouho.list,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onBack: () => dispatch(backToTheShow(ownProps.filter)),
  onSelectKouho: blockType => dispatch(selectKouho(blockType)),
  onDecide: kouhoIndex => dispatch(decideKouho(kouhoIndex)),
  onRotate: () => dispatch(doRotate()),
  onFlip: () => dispatch(doFlip()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameKouhoComponent)
