import { connect } from "react-redux";
import AppComponent from "../components/AppComponent";
import { AllState } from "../entity/store";

const mapStateToProps = (state: AllState) => ({
  app: state.app,
});

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(AppComponent);
