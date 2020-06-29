import React from "react";
import PropTypes from "prop-types";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import PersonIcon from "@material-ui/icons/Person";
import MediaQuery from "react-responsive";
import CircularProgress from '@material-ui/core/CircularProgress';

import { makeStyles } from "@material-ui/core/styles";

import GameMenuComponent from "./GameMenuComponent";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  toolbar: {
    height: '10px',
  },
}));

const GameHeaderComponent = ({ players, nowPlayer, onRestart, waitCpu, decidePass }) => {
  const classes = useStyles();

  const drawPoint = (index, point) => {
    if (index === nowPlayer) {
      return <React.Fragment><CircularProgress size="1.3em" onClick={waitCpu} /></React.Fragment>;
    }
    return <React.Fragment>{point}</React.Fragment>;
  }

  return (
    <React.Fragment>
      <AppBar position="relative" color="transparent">
        <Toolbar>
          <GameMenuComponent onRestart={onRestart} decidePass={decidePass} className={classes.menuButton} />

          <Typography variant="h6" className={classes.title}>
            <MediaQuery query="(min-width: 768px)">
              Space21
            </MediaQuery>
          </Typography>

          <Box borderRadius="5px" p={1}>
            {players.map((player, index) => (
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
                {drawPoint(index, player.point)}
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

GameHeaderComponent.propTypes = {
  players: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  nowPlayer: PropTypes.number.isRequired,
  onRestart: PropTypes.func.isRequired,
  waitCpu: PropTypes.func.isRequired,
  decidePass: PropTypes.func.isRequired,
};

export default GameHeaderComponent;
