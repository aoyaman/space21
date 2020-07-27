import React from "react";

import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";

import { makeStyles } from "@material-ui/core/styles";

import * as info from "../domain/GameInfo";

import GameHeaderComponent from "./GameHeaderComponent";
import GameBoardComponent from "./GameBoardComponent";
import CustomDragLayer from "./CustomDragLayer";
import PlayersContainer from "../containers/PlayersContainer";

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
    width: "auto",
    display: "inline-block",
  },
  celltable: {
    display: "inline-block",
    verticalAlign: "top",
  },
}));

type Props = {
  gameInfo: info.GameInfo;
  onRestart: () => void;
};

const GamePlayPcComponent: React.FC<Props> = ({ gameInfo, onRestart }) => {
  const classes = useStyles();

  return (
    <>
      <CssBaseline />

      <Container maxWidth="md">
        {/* ヘッダー部分 */}
        <GameHeaderComponent
          players={gameInfo.players}
          nowPlayer={gameInfo.nowPlayer}
          onRestart={onRestart}
        />

        <div>
          {gameInfo.nowPlayer === -1 && (
            <div>
              <h2>ゲーム終了です！</h2>
              <Button variant="contained" color="secondary" onClick={onRestart}>
                もう一度ゲームをする
              </Button>
            </div>
          )}

          {/* ゲーム版 */}
          <Paper className={classes.paper} elevation={3}>
            <GameBoardComponent board={gameInfo.board} width={300} />
          </Paper>
        </div>

        <PlayersContainer />
        <CustomDragLayer />
      </Container>
    </>
  );
};

export default GamePlayPcComponent;
