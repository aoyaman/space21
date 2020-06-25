import React from 'react'
import PropTypes from 'prop-types'

import GameIndexContainer from '../containers/GameIndexContainer';
import GameShowContainer from '../containers/GameShowContainer';
import GameKouhoContainer from '../containers/GameKouhoContainer';

const AppComponent = ({ app }) => (
  <div>
    {app.page==="index" && <GameIndexContainer></GameIndexContainer>}
    {app.page==="show" && <GameShowContainer></GameShowContainer>}
    {app.page==="kouho" && <GameKouhoContainer></GameKouhoContainer>}
  </div>
)

AppComponent.propTypes = {
  app: PropTypes.shape({}).isRequired
}

export default AppComponent
