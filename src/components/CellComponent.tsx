import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDrop } from "react-dnd";

import { ItemTypes } from "../dnd/Constants";

const useStyles = makeStyles(() => ({
  cell: {
    height: "4vw",
    width: "4vw",
    maxHeight: "25px",
    maxWidth: "25px",
    border: "1px solid gray",
  },
}));

type Props = {
  backgroundColor: string;
  width: string;
  height: string;
  maxWidth: string;
  maxHeight: string;
  onClick: () => void;
};

const CellComponent: React.FC<Props> = ({
  backgroundColor,
  width,
  height,
  maxWidth,
  maxHeight,
  onClick,
}) => {
  const classes = useStyles();

  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.SPACE,
    // canDrop: () => canMoveKnight(x, y),
    // drop: () => moveKnight(x, y),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  let bgcolor: string = backgroundColor;
  if (isOver) {
    bgcolor = "#FFFFFF";
  }

  return (
    <>
      <div
        ref={drop}
        className={classes.cell}
        style={{
          backgroundColor: bgcolor,
          width,
          height,
          maxWidth,
          maxHeight,
        }}
        onClick={(e) => {
          console.log(e);
        }}
        onKeyUp={onClick}
        role="button"
        tabIndex={0}
      />
    </>
  );
};

export default CellComponent;
