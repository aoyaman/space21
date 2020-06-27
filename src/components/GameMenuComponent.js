import React from "react";
import PropTypes from 'prop-types'

import IconButton from '@material-ui/core/IconButton';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MenuIcon from '@material-ui/icons/Menu';

const GameMenuComponent = ({onRestart}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <IconButton edge="start" color="inherit" aria-label="menu" onClick={e => { handleClick(e); }} >
        <MenuIcon />
      </IconButton>

      <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={() => { handleClose(); onRestart();}}>Restart</MenuItem>
      </Menu>
    </React.Fragment>
  );
};

GameMenuComponent.propTypes = {
    onRestart: PropTypes.func.isRequired,
  };

export default GameMenuComponent;
