import React from 'react'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import Container from '@material-ui/core/Container';

import GameIndexContainer from '../containers/GameIndexContainer';
import GameShowContainer from '../containers/GameShowContainer';
import GameKouhoContainer from '../containers/GameKouhoContainer';

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
}));

const AppComponent = ({ app }) => {
  const classes = useStyles();

  return (
    <Container fixed>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Space21
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>

      {app.page==="index" && <GameIndexContainer></GameIndexContainer>}
      {app.page==="show" && <GameShowContainer></GameShowContainer>}
      {app.page==="kouho" && <GameKouhoContainer></GameKouhoContainer>}
    </Container>
  );
};

AppComponent.propTypes = {
  app: PropTypes.shape({}).isRequired
}

export default AppComponent
