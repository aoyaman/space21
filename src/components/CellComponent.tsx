import React from "react";

type Props = {
  color: string;
};

const CellComponent: React.FC<Props> = ({ color }) => (
  <>
    <div
      style={{
        backgroundColor: color,
        width: "20px",
        height: "20px",
        border: "1px solid black",
      }}
    />
  </>
);

export default CellComponent;
