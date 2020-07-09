import React from "react";

import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import CssBaseline from '@material-ui/core/CssBaseline';

import { makeStyles } from "@material-ui/core/styles";

import { GameState, BoardState, PlayerState, TegomaState, KouhoState, SelectState } from '../entity/store';
import GameHeaderComponent from "./GameHeaderComponent";
import GameBoardComponent from "./GameBoardComponent";
import SelectedSpaceComponent from "./SelectedSpaceComponent";
import GameTegomaComponent from "./GameTegomaComponent";

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
    margin: theme.spacing(1),
    textAlign: "center",
    width : "auto",
    display: "inline-block",
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
  waitCpu: () => void
  decidePass: () => void
};

const GamePlayPcComponent: React.FC<Props> = ({ game, board, players, tegoma, kouho, select, onSelectKouho, onRestart, onDecide, onRotate, onFlip, waitCpu, decidePass }) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />

      <Container maxWidth="md">


        {/* ヘッダー部分 */}
        <GameHeaderComponent players={players} nowPlayer={game.nowPlayer} onRestart={onRestart} waitCpu={waitCpu} decidePass={decidePass} />

        <div>

          {game.nowPlayer === -1 && <div><h2>ゲーム終了です！</h2><Button variant="contained"  color="secondary" onClick={onRestart}>もう一度ゲームをする</Button></div>}

          {/* ゲーム版　*/}
          <Paper className={classes.paper} elevation={3}>
            <GameBoardComponent board={board} width={300} />
          </Paper>

          {/* 手持ちのスペース */}
          <Paper className={classes.paper} elevation={3}>
            <GameTegomaComponent board={tegoma} onSelect={onSelectKouho} width={300} />
          </Paper>

        </div>


        {/* 選択したスペース  */}
        { select.cells.length > 0 &&
          <div>
          <Paper className={classes.paper} elevation={3}>
            <SelectedSpaceComponent select={select} onRotate={onRotate} onFlip={onFlip}/>
          </Paper>
          </div>
        }

        {/* 候補 */}
        <div>
          {select.cells.length > 0 && kouho.map((kouhoItem, index) => (
            <Paper className={classes.paper} key={'x='+kouhoItem.x+',y='+kouhoItem.y} elevation={3}>
              <p>候補{index+1}</p>
              <GameBoardComponent board={kouhoItem.cells} width={180} />
              {game.nowPlayer === game.loginPlayer &&
                <Box m={1}>
                  <Button variant="contained" color="primary" onClick={() => { onDecide(kouhoItem.x, kouhoItem.y); }} >
                    この候補に決定
                  </Button>
                </Box>
              }
            </Paper>
          ))}
        </div>


      </Container>
    </React.Fragment>
  );
};


export default GamePlayPcComponent;
