import React from "react";
import PropTypes from "prop-types";

import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

import { makeStyles } from "@material-ui/core/styles";

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
    display: 'inline-block',
    verticalAlign: 'top',
  }
}));

const GamePlayPhoneComponent = ({ game, board, players, tegoma, kouho, select, onSelectKouho, onRestart, onDecide, onRotate, onFlip, waitCpu, decidePass, onNotSelect }) => {
  const classes = useStyles();

  return (
    <React.Fragment>

      {/* ヘッダー部分 */}
      <GameHeaderComponent players={players} nowPlayer={game.nowPlayer}  onRestart={onRestart} waitCpu={waitCpu} decidePass={decidePass} />

      {/* コンテンツ部分 */}
      <Box m={1}>

        {game.nowPlayer === -1 && <div><h2>ゲーム終了です！</h2><Button variant="contained"  color="secondary" onClick={onRestart}>もう一度ゲームをする</Button></div>}

        {/* ゲーム版　*/}
        {select.cells.length <= 0 &&
          <Paper className={classes.paper} elevation={3}>
            <GameBoardComponent board={board}/>
          </Paper>
        }

        {/* 手持ちのスペース */}
        {select.cells.length <= 0 &&
          <Paper className={classes.paper} elevation={3}>
            <GameTegomaComponent board={tegoma} onSelect={onSelectKouho}/>
          </Paper>
        }

        {/* 候補の表示をやめる  */}
        { select.cells.length > 0 &&
          <Box p={1}>
            <Button variant="contained"  color="primary" onClick={onNotSelect}>戻る</Button>
          </Box >
        }

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

        <div>
          {/* メッセージ */}
          {game.isLoginUserNow && <p>あなたの番です。置きたいブロックを選択してください。</p>}
          {game.isLoginUserNow === false && <p>「{game.nowPlayerName}」の番です。お待ちください。</p>}
        </div>

      </Box>
    </React.Fragment>
  );
};

GamePlayPhoneComponent.propTypes = {
  game: PropTypes.shape({}).isRequired,
  board: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({}))).isRequired,
  players: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  tegoma: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({}))).isRequired,
  kouho: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  select: PropTypes.shape({}).isRequired,
  onSelectKouho: PropTypes.func.isRequired,
  onRestart: PropTypes.func.isRequired,
  onDecide: PropTypes.func.isRequired,
  onRotate: PropTypes.func.isRequired,
  onFlip: PropTypes.func.isRequired,
  waitCpu: PropTypes.func.isRequired,
  decidePass: PropTypes.func.isRequired,
  onNotSelect: PropTypes.func.isRequired,
};

export default GamePlayPhoneComponent;
