import React from 'react'
import PropTypes from 'prop-types'


import StartContainer from '../containers/StartContainer';
import GamePlayContainer from '../containers/GamePlayContainer';


const AppComponent = ({ app }) => {

  return (
    <div>
      {app.page==="start" && <StartContainer></StartContainer>}
      {app.page==="game" && <GamePlayContainer></GamePlayContainer>}
    </div>
  );
};

AppComponent.propTypes = {
  app: PropTypes.shape({}).isRequired
}

export default AppComponent
