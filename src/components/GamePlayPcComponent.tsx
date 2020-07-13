import React from "react";

import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";

import { makeStyles } from "@material-ui/core/styles";

import * as info from "../domain/GameInfo";
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
  onSelectKouho: (blockType: number) => void;
  onRestart: () => void;
  onDecide: (x: number, y: number) => void;
  onRotate: () => void;
  onFlip: () => void;
};

const GamePlayPcComponent: React.FC<Props> = ({
  gameInfo,
  onSelectKouho,
  onRestart,
  onDecide,
  onRotate,
  onFlip,
}) => {
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

          {/* 手持ちのスペース */}
          <Paper className={classes.paper} elevation={3}>
            <GameTegomaComponent
              board={gameInfo.players[gameInfo.loginPlayer].tegoma}
              onSelect={onSelectKouho}
              width={300}
            />
          </Paper>
        </div>

        {/* 選択したスペース  */}
        {gameInfo.players[gameInfo.loginPlayer].selectInfo && (
          <div>
            <Paper className={classes.paper} elevation={3}>
              <SelectedSpaceComponent
                select={gameInfo.players[gameInfo.loginPlayer].selectInfo}
                onRotate={onRotate}
                onFlip={onFlip}
              />
            </Paper>
          </div>
        )}

        {/* 候補 */}
        <div>
          {gameInfo.players[gameInfo.loginPlayer].selectInfo &&
            gameInfo.players[gameInfo.loginPlayer].selectInfo?.kouhoList.map(
              (kouhoItem, index) => (
                <Paper
                  className={classes.paper}
                  key={`x=${kouhoItem.x},y=${kouhoItem.y}`}
                  elevation={3}
                >
                  <p>候補{index + 1}</p>
                  <GameBoardComponent board={kouhoItem.cells} width={180} />
                  {gameInfo.nowPlayer === gameInfo.loginPlayer && (
                    <Box m={1}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          onDecide(kouhoItem.x, kouhoItem.y);
                        }}
                      >
                        この候補に決定
                      </Button>
                    </Box>
                  )}
                </Paper>
              )
            )}
        </div>
      </Container>
    </>
  );
};

export default GamePlayPcComponent;
