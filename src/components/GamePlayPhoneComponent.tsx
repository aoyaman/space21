import React from "react";
import PropTypes from "prop-types";

import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

import { makeStyles } from "@material-ui/core/styles";

import { GameState, BoardState, PlayerState, TegomaState, KouhoState, SelectState } from '../entity/store';
import GameHeaderComponent from "./GameHeaderComponent";
import GameBoardComponent from "./GameBoardComponent";
import SelectedSpaceComponent from "./SelectedSpaceComponent";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    marginBottom: "10px",
    textAlign: "center",
  },
  celltable: {
    display: 'inline-block',
    verticalAlign: 'top',
  }
}));


type Props = {
  game: GameState
  board: BoardState
  players: PlayerState
  tegoma: TegomaState
  kouho: KouhoState
  select: SelectState
  onSelectKouho: (blockType: number) => void
  onRestart: () => void
  onDecide: (x: number, y: number) => void
  onRotate: () => void
  onFlip: () => void
};


const GamePlayPhoneComponent: React.FC<Props> = ({ game, board, players, tegoma, kouho, select, onSelectKouho, onRestart, onDecide, onRotate, onFlip }) => {
  const classes = useStyles();

  return (
    <React.Fragment>

      {/* ヘッダー部分 */}
      <GameHeaderComponent players={players} onRestart={onRestart} />

      {/* コンテンツ部分 */}
      <Box m={2}>
        {/* ゲーム版　*/}
        <Paper className={classes.paper} elevation={3}>
          <GameBoardComponent board={board}/>
        </Paper>

        {/* 手持ちのスペース */}
        <Paper className={classes.paper} elevation={3}>
          <GameBoardComponent board={tegoma} onSelect={onSelectKouho}/>
        </Paper>

        {/* 選択したスペース  */}
        { select.cells.length > 0 &&
          <div>
          <Paper className={classes.paper} elevation={3}>
            <SelectedSpaceComponent select={select} onRotate={onRotate} onFlip={onFlip}/>
          </Paper>
          </div>
        }

        {/* 候補 */}
        {select.cells.length > 0 && kouho.map((kouhoItem, index) => (
            <Paper className={classes.paper} key={'x='+kouhoItem.x+',y='+kouhoItem.y} elevation={3}>
              <p>候補{index+1}</p>
              <GameBoardComponent board={kouhoItem.cells}/>
              <Box m={1}>
                <Button variant="contained" color="primary" onClick={() => { onDecide(kouhoItem.x, kouhoItem.y); }} >
                  この候補に決定
                </Button>
              </Box>
            </Paper>
        ))}

      </Box>
    </React.Fragment>
  );
};


export default GamePlayPhoneComponent;
