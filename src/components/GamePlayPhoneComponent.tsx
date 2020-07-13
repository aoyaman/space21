import React from "react";

import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

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
    marginBottom: "10px",
    textAlign: "center",
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
  onNotSelect: () => void;
};

const GamePlayPhoneComponent: React.FC<Props> = ({
  gameInfo,
  onSelectKouho,
  onRestart,
  onDecide,
  onRotate,
  onFlip,
  onNotSelect,
}) => {
  const classes = useStyles();

  return (
    <>
      {/* ヘッダー部分 */}
      <GameHeaderComponent
        players={gameInfo.players}
        nowPlayer={gameInfo.nowPlayer}
        onRestart={onRestart}
      />

      {/* コンテンツ部分 */}
      <Box m={1}>
        {gameInfo.nowPlayer === -1 && (
          <div>
            <h2>ゲーム終了です！</h2>
            <Button variant="contained" color="secondary" onClick={onRestart}>
              もう一度ゲームをする
            </Button>
          </div>
        )}

        {/* ゲーム版 */}
        {!gameInfo.players[gameInfo.loginPlayer].selectInfo && (
          <Paper className={classes.paper} elevation={3}>
            <GameBoardComponent board={gameInfo.board} />
          </Paper>
        )}

        {/* 手持ちのスペース */}

        <Paper className={classes.paper} elevation={3}>
          <GameTegomaComponent
            board={gameInfo.players[gameInfo.loginPlayer].tegoma}
            onSelect={onSelectKouho}
          />
        </Paper>

        {/* 候補の表示をやめる  */}
        {gameInfo.players[gameInfo.loginPlayer].selectInfo && (
          <Box p={1}>
            <Button variant="contained" color="primary" onClick={onNotSelect}>
              戻る
            </Button>
          </Box>
        )}

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
        {gameInfo.players[gameInfo.loginPlayer].selectInfo &&
          gameInfo.players[gameInfo.loginPlayer].selectInfo?.kouhoList.map(
            (kouhoItem) => (
              <Paper
                className={classes.paper}
                key={`x=${kouhoItem.x},y=${kouhoItem.y}`}
                elevation={3}
              >
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
                <GameBoardComponent board={kouhoItem.cells} />
              </Paper>
            )
          )}
      </Box>
    </>
  );
};

export default GamePlayPhoneComponent;
