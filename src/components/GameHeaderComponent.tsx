import React from "react";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import PersonIcon from "@material-ui/icons/Person";
import MediaQuery from "react-responsive";

import { Theme } from "@material-ui/core";
import { makeStyles, withStyles, WithStyles, createStyles } from "@material-ui/core/styles";

import { GameState, BoardState, PlayerState, TegomaState, KouhoState, SelectState } from '../entity/store';
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
  onRestart: () => void
}

const GameHeaderComponent: React.FC<Props> = ({ classes, players, onRestart }) => {

  return (
    <React.Fragment>
      <AppBar position="relative" color="transparent">
        <Toolbar>
          <GameMenuComponent onRestart={onRestart} />

          <Typography variant="h6" className={classes.title}>
            <MediaQuery query="(min-width: 768px)">
              Space21
            </MediaQuery>
          </Typography>

          <Box borderRadius="5px" p={1}>
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

      {/* AppBarと下のコンテンツが重ならないように余白を開ける */}
      <div className={classes.toolbar} />
    </React.Fragment>
  );
};

export default withStyles(styles)(GameHeaderComponent);
