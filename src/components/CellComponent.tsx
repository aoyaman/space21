import React from "react";
import PropTypes from "prop-types";

type Props = {
  color: string,
};


const CellComponent: React.FC<Props> = ({ color }) => (
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

export default CellComponent;
