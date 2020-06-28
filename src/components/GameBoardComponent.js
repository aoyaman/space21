import React from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";

const BOARD_MAX_WIDTH = 500;

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'spaceArround',
    alignItems: 'center',
    alignContent: 'space-around',

    height: '80vw',
    width: '80vw',
    maxHeight: BOARD_MAX_WIDTH + 'px',
    maxWidth: BOARD_MAX_WIDTH + 'px',
    background: 'lightgrey',
  },
  cell: {
    height: '4vw',
    width: '4vw',
    maxHeight: '25px',
    maxWidth: '25px',
    border: '1px solid gray',
  }
}));

const GameBoardComponent = ({ board, onSelect }) => {
  const classes = useStyles();

  return (
    <div
      className={classes.root}
      style={{
        width: "80vw",
        height: (4 * board.length) + "vw",
      }}>
      {board.map((row, y) => (
        <React.Fragment key={"y:" + y}>
          {row.map((cell, x) => {
            return (
              <div
                className={classes.cell}
                style={{
                  backgroundColor: "#" + cell.color,
                  width: (80 / row.length) + "vw",
                  height: (80 / row.length) + "vw",
                  maxWidth: (BOARD_MAX_WIDTH / row.length)  + "px",
                  maxHeight: (BOARD_MAX_WIDTH / row.length)  + "px",
                }}
                onClick={() => {if (cell.blockType >= 0 && onSelect) onSelect(cell.blockType)}}
                key={"x" + x + "y" + y}
              ></div>
            );
          })}
        </React.Fragment>
      ))}
    </div>
  );
};

GameBoardComponent.propTypes = {
  board: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({}))).isRequired,
  onSelect: PropTypes.func,
};

export default GameBoardComponent;
