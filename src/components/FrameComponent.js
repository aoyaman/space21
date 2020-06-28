import React from "react";
import PropTypes from 'prop-types'
import Container from "@material-ui/core/Container";
import MediaQuery from "react-responsive";

const FrameComponent = ({children}) => (
  <React.Fragment>
      <MediaQuery query="(max-width: 767px)">
        { children }
      </MediaQuery>

      <MediaQuery query="(min-width: 768px)">
        <Container maxWidth="sm">
          { children }
        </Container>
      </MediaQuery>
  </React.Fragment>
);

FrameComponent.propTypes = {
  children: PropTypes.node.isRequired,
}

export default FrameComponent;
