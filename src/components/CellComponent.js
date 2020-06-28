import React from "react";
import PropTypes from "prop-types";

const CellComponent = ({ color }) => (
  <div
    style={{
      backgroundColor: color,
      width: "20px",
      height: "20px",
      border: "1px solid black",
    }}
  >

  </div>
);

CellComponent.propTypes = {
  color: PropTypes.string.isRequired,
};

export default CellComponent;
