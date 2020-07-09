import React from "react";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import PersonIcon from "@material-ui/icons/Person";
import MediaQuery from "react-responsive";
import CircularProgress from '@material-ui/core/CircularProgress';

import { Theme } from "@material-ui/core";
import { withStyles, WithStyles, createStyles } from "@material-ui/core/styles";

import { PlayerState } from '../entity/store';
import GameMenuComponent from "./GameMenuComponent";

const styles = ({ palette, spacing }: Theme) => createStyles({
  menuButton: {
    marginRight: spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  toolbar: {
    height: '10px',
  },
});

interface Props extends WithStyles<typeof styles> {
  players: PlayerState
  nowPlayer: number
  onRestart: () => void
  waitCpu: () => void
  decidePass: () => void
}

const GameHeaderComponent: React.FC<Props> = ({ classes, players, nowPlayer, onRestart, waitCpu, decidePass }) => {

  const drawPoint = (index: number, point: number) => {
    if (index === nowPlayer && index !== 0) {
      return <React.Fragment><CircularProgress size="1.3em" color="inherit" onClick={waitCpu} /></React.Fragment>;
    }
    return <React.Fragment>{point}</React.Fragment>;
  }

  return (
    <React.Fragment>
      <AppBar position="relative" color="transparent">
        <Toolbar>
          <GameMenuComponent onRestart={onRestart} decidePass={decidePass} />

          <Typography variant="h6" className={classes.title}>
            <MediaQuery query="(min-width: 768px)">
              Space21
            </MediaQuery>
          </Typography>

          <Box >
            {players.map((player, index) => (
              <React.Fragment key={player.color}>
                <MediaQuery query="(max-width: 480px)">
                  <Box

                    component="span"
                    color={"#" + (index === nowPlayer ? "ffffff" : player.color)}
                    bgcolor={"#" + (index !== nowPlayer ? (player.pass === true ? "dddddd" : "ffffff") : player.color)}
                    border="1px solid"
                    borderColor={"#" + player.color}
                    borderRadius="5px"
                    fontSize="small"
                    margin="5px"
                    padding="5px"
                  >
                    <PersonIcon />
                    {drawPoint(index, player.point)}
                  </Box>
                </MediaQuery>
                <MediaQuery query="(min-width: 481px)">
                  <Box
                    component="span"
                    color={"#" + (index === nowPlayer ? "ffffff" : player.color)}
                    bgcolor={"#" + (index !== nowPlayer ? (player.pass === true ? "dddddd" : "ffffff") : player.color)}
                    border="1px solid"
                    borderColor={"#" + player.color}
                    borderRadius="5px"
                    m={1}
                    p={1}
                  >
                    <PersonIcon />
                    {drawPoint(index, player.point)}
                  </Box>
                </MediaQuery>

              </React.Fragment>
            ))}
          </Box>
        </Toolbar>
      </AppBar>

      {/* AppBarと下のコンテンツが重ならないように余白を開ける */}
      <div className={classes.toolbar} />
    </React.Fragment>
  );
};

export default withStyles(styles)(GameHeaderComponent);
