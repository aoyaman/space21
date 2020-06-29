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

const GameTegomaComponent = ({ board, onSelect, width }) => {
  const classes = useStyles();

  return (
    <div
      className={classes.root}
      style={{
        width: width ? width + "px":  "80vw",
        height: width ? (width / 80 * 56) + "px" :  "56vw",
      }}>
      {board.map((row, y) => (
        <React.Fragment key={"y:" + y}>
          {row.map((cell, x) => {
            return (
              <div
                className={classes.cell}
                style={{
                  backgroundColor: "#" + cell.color,
                  width: width ? (width/20) + "px" :  "4vw",
                  height: width ? (width/20)  + "px" :  "4vw",
                  maxWidth: width ? (width/20)  + "px" : (BOARD_MAX_WIDTH / row.length)  + "px",
                  maxHeight: width ? (width/20)  + "px" : (BOARD_MAX_WIDTH / row.length)  + "px",
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

GameTegomaComponent.propTypes = {
  board: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({}))).isRequired,
  onSelect: PropTypes.func.isRequired,
  width: PropTypes.number,
};

export default GameTegomaComponent;
