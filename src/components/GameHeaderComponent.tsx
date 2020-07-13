import React from "react";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import PersonIcon from "@material-ui/icons/Person";
import MediaQuery from "react-responsive";
import CircularProgress from "@material-ui/core/CircularProgress";

import { Theme } from "@material-ui/core";
import { withStyles, WithStyles, createStyles } from "@material-ui/core/styles";

import * as info from "../domain/GameInfo";
import GameMenuComponent from "./GameMenuComponent";

const styles = ({ spacing }: Theme) =>
  createStyles({
    menuButton: {
      marginRight: spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    toolbar: {
      height: "10px",
    },
  });

interface Props extends WithStyles<typeof styles> {
  players: info.PlayerInfo[];
  nowPlayer: number;
  onRestart: () => void;
}

const GameHeaderComponent: React.FC<Props> = ({
  classes,
  players,
  nowPlayer,
  onRestart,
}) => {
  const drawPoint = (index: number, point: number) => {
    if (index === nowPlayer && index !== 0) {
      return (
        <>
          <CircularProgress size="1.3em" color="inherit" />
        </>
      );
    }
    return <>{point}</>;
  };

  const calcColor = (index: number, player: info.PlayerInfo) => {
    if (index !== nowPlayer) {
      return player.pass ? "dddddd" : "ffffff";
    }
    return player.color;
  };

  return (
    <>
      <AppBar position="relative" color="transparent">
        <Toolbar>
          <GameMenuComponent onRestart={onRestart} />

          <Typography variant="h6" className={classes.title}>
            <MediaQuery query="(min-width: 768px)">Space21</MediaQuery>
          </Typography>

          <Box>
            {players.map((player, index) => (
              <React.Fragment key={player.color}>
                <MediaQuery query="(max-width: 480px)">
                  <Box
                    component="span"
                    color={`#${index === nowPlayer ? "ffffff" : player.color}`}
                    bgcolor={`#${calcColor(index, player)}`}
                    border="1px solid"
                    borderColor={`#${player.color}`}
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
                    color={`#${index === nowPlayer ? "ffffff" : player.color}`}
                    bgcolor={`#${calcColor(index, player)}`}
                    border="1px solid"
                    borderColor={`#${player.color}`}
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
    </>
  );
};

export default withStyles(styles)(GameHeaderComponent);
