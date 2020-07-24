import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import * as info from "../domain/GameInfo";
import { SpaceType } from "../domain/SpaceType";

const BOARD_MAX_WIDTH = 500;

const useStyles = makeStyles(() => ({
  root: {
    margin: "0 auto",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "spaceArround",
    alignItems: "center",
    alignContent: "space-around",

    height: "80vw",
    width: "80vw",
    maxHeight: `${BOARD_MAX_WIDTH}px`,
    maxWidth: `${BOARD_MAX_WIDTH}px`,
    background: "lightgrey",
  },
  cell: {
    height: "4vw",
    width: "4vw",
    maxHeight: "25px",
    maxWidth: "25px",
    border: "1px solid gray",
  },
}));

type Props = {
  board: info.BoardInfo;
  onSelect?: ((spaceType: SpaceType) => void) | undefined;
  width?: number | undefined;
};

const GameBoardComponent: React.FC<Props> = ({ board, onSelect, width }) => {
  const classes = useStyles();

  const makeList = () => {
    const list = [];
    for (let y = 0; y < board.length; y += 1) {
      for (let x = 0; x < board[y].length; x += 1) {
        const cell = board[y][x];
        list.push(
          <React.Fragment key={`x${x}y${y}`}>
            <div
              className={classes.cell}
              style={{
                backgroundColor: `#${cell.color}`,
                width: width ? `${width / 20}px` : "4vw",
                height: width ? `${width / 20}px` : "4vw",
                maxWidth: width
                  ? `${width / 20}px`
                  : `${BOARD_MAX_WIDTH / board[y].length}px`,
                maxHeight: width
                  ? `${width / 20}px`
                  : `${BOARD_MAX_WIDTH / board[y].length}px`,
              }}
              onClick={(e) => {
                console.log(e);
              }}
              onKeyUp={() => {
                if (cell.spaceType != null && onSelect)
                  onSelect(cell.spaceType);
              }}
              role="button"
              tabIndex={0}
            />
          </React.Fragment>
        );
      }
    }
    return list;
  };

  return (
    <div
      className={classes.root}
      style={{
        width: width ? `${width}px` : "80vw",
        height: width ? `${width}px` : "80vm",
      }}
    >
      {makeList()}
    </div>
  );
};

export default GameBoardComponent;
