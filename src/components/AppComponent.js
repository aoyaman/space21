import React from 'react'
import PropTypes from 'prop-types'


import StartContainer from '../containers/StartContainer';
import GamePlayContainer from '../containers/GamePlayContainer';
import GameKouhoContainer from '../containers/GameKouhoContainer';


const AppComponent = ({ app }) => {

  return (
    <div>
      {app.page==="start" && <StartContainer></StartContainer>}
      {app.page==="game" && <GamePlayContainer></GamePlayContainer>}
      {app.page==="kouho" && <GameKouhoContainer></GameKouhoContainer>}
    </div>
  );
};

AppComponent.propTypes = {
  app: PropTypes.shape({}).isRequired
}

export default AppComponent
