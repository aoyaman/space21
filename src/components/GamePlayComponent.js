import React from "react";
import PropTypes from "prop-types";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import PersonIcon from "@material-ui/icons/Person";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

import { makeStyles } from "@material-ui/core/styles";

import GameMenuComponent from "./GameMenuComponent";
import kouho from "../reducers/kouho";

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

const GamePlayComponent = ({ game, board, players, tegoma, kouho, select, onSelectKouho, onRestart, onDecide }) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Container maxWidth="sm">
        {/* ヘッダー部分 */}
        <AppBar position="static" style={{ backgroundColor: "#d3d3d3", color: "black" }}>
          <Toolbar>
            <GameMenuComponent onRestart={onRestart} className={classes.menuButton} />

            <Typography variant="h6" className={classes.title}>
              Space21
            </Typography>

            <Box bgcolor="#d3d3d3" borderRadius="5px" p={1}>
              {players.map((player) => (
                <Box
                  key={player.color}
                  component="span"
                  color={"#" + player.color}
                  border="1px solid"
                  borderColor={"#" + player.color}
                  borderRadius="5px"
                  m={1}
                  p={1}
                >
                  <PersonIcon />
                  {player.point}
                </Box>
              ))}
            </Box>
          </Toolbar>
        </AppBar>

        {/* コンテンツ部分 */}
        <Box m={2}>
          {/* ゲーム版　*/}
          <Paper className={classes.paper} elevation={3}>
            <table className={classes.celltable}>
              <tbody>
                {board.map((row, y) => {
                  return (
                    <tr key={"y:" + y}>
                      {row.map((cell, x) => {
                        return (
                          <td
                            style={{
                              backgroundColor: "#" + cell.color,
                              width: "20px",
                              height: "20px",
                              border: "1px solid black",
                            }}
                            key={"x" + x + "y" + y}
                          ></td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Paper>

          {/* 手持ちのスペース */}
          <Paper className={classes.paper} elevation={3}>
            <table className={classes.celltable}>
              <tbody>
                {tegoma.map((row, y) => {
                  return (
                    <tr key={"y:" + y}>
                      {row.map((cell, x) => {
                        return (
                          <td
                            style={{
                              backgroundColor: "#" + cell.color,
                              width: "20px",
                              height: "20px",
                              border: "1px solid black",
                            }}
                            onClick={() => {
                              onSelectKouho(cell.blockType);
                            }}
                            key={"x" + x + "y" + y}
                          ></td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
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


          {/* 候補 */}
          {select.cells.length > 0 && kouho.map((kouhoItem, index) => (
              <Paper className={classes.paper} key={'x='+kouhoItem.x+',y='+kouhoItem.y} elevation={3}>
                <p>候補{index+1}</p>
                <table className={classes.celltable}>
                  <tbody>
                    {kouhoItem.cells.map((row, y) => {
                      return (
                        <tr key={"y:" + y}>
                          {row.map((cell, x) => {
                            return (
                              <td
                                style={{
                                  backgroundColor: "#" + cell.color,
                                  width: "15px",
                                  height: "15px",
                                  border: "1px solid black",
                                }}
                                onClick={() => {
                                  onSelectKouho(cell.blockType);
                                }}
                                key={"x" + x + "y" + y}
                              ></td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <Box m={1}>
                  <Button variant="contained" color="primary" onClick={() => { onDecide(kouhoItem); }} >
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
      </Container>
    </React.Fragment>
  );
};

GamePlayComponent.propTypes = {
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

export default GamePlayComponent;
