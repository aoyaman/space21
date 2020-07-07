import React from 'react'

import { AppState } from '../entity/store';
import StartContainer from '../containers/StartContainer';
import GamePlayContainer from '../containers/GamePlayContainer';

type Props = {
  app: AppState
}

const AppComponent: React.FC<Props> = ({ app }) => {

  return (
    <div>
      {app.page==="start" && <StartContainer></StartContainer>}
      {app.page==="game" && <GamePlayContainer></GamePlayContainer>}
    </div>
  );
};

export default AppComponent
