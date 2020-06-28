import React from "react";
import PropTypes from "prop-types";

import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import CssBaseline from '@material-ui/core/CssBaseline';

import { makeStyles } from "@material-ui/core/styles";

import GameHeaderComponent from "./GameHeaderComponent";
import GameBoardComponent from "./GameBoardComponent";

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

const GamePlayPcComponent = ({ game, board, players, tegoma, kouho, select, onSelectKouho, onRestart, onDecide }) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />

      <Container maxWidth="md">


        {/* ヘッダー部分 */}
        <GameHeaderComponent players={players} onRestart={onRestart} />

        <div>

          {/* ゲーム版　*/}
          <Paper className={classes.paper} elevation={3}>
            <GameBoardComponent board={board} width="300"/>
          </Paper>

          {/* 手持ちのスペース */}
          <Paper className={classes.paper} elevation={3}>
            <GameBoardComponent board={tegoma} onSelect={onSelectKouho} width="300"/>
          </Paper>

          {/* 選択したスペース  */}
          { select.cells.length > 0 &&
            <Paper className={classes.paper} elevation={3}>
              <table className={classes.celltable}>
                <p>選択したスペース</p>
                <tbody>
                  {select.cells && select.cells.map((row, y) => {
                    return (
                      <tr key={"selct_cells_y:" + y}>
                        {row.map((cell, x) => {
                          return (
                            <td
                              style={{
                                backgroundColor: "#" + cell.color,
                                width: "15px",
                                height: "15px",
                                border: "1px solid black",
                              }}
                              key={"selct_cells_x" + x + "y" + y}
                            ></td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </Paper>
          }
        </div>

        {/* 候補 */}
        <div>
          {select.cells.length > 0 && kouho.map((kouhoItem, index) => (
            <Paper className={classes.paper} key={'x='+kouhoItem.x+',y='+kouhoItem.y} elevation={3}>
              <p>候補{index+1}</p>
              <GameBoardComponent board={kouhoItem.cells} width="180" />
              <Box m={1}>
                <Button variant="contained" color="primary" onClick={() => { onDecide(kouhoItem); }} >
                  この候補に決定
                </Button>
              </Box>
            </Paper>
          ))}
        </div>

        <div>
          {/* メッセージ */}
          {game.isLoginUserNow && <p>あなたの番です。置きたいブロックを選択してください。</p>}
          {game.isLoginUserNow === false && <p>「{game.nowPlayerName}」の番です。お待ちください。</p>}
        </div>

      </Container>
    </React.Fragment>
  );
};

GamePlayPcComponent.propTypes = {
  game: PropTypes.shape({}).isRequired,
  board: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({}))).isRequired,
  players: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  tegoma: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({}))).isRequired,
  kouho: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({}))).isRequired,
  select: PropTypes.shape({}).isRequired,
  onBack: PropTypes.func.isRequired,
  onSelectKouho: PropTypes.func.isRequired,
  onRestart: PropTypes.func.isRequired,
  onDecide: PropTypes.func.isRequired,
};

export default GamePlayPcComponent;
