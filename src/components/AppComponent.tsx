import React from "react";

import { AppState } from "../entity/store";
import StartContainer from "../containers/StartContainer";
import GamePlayContainer from "../containers/GamePlayContainer";

type Props = {
  app?: AppState;
};

const AppComponent: React.FC<Props> = ({ app }) => {
  if (!app) {
    return <div>now loading...</div>;
  }
  return (
    <div>
      {app.page === "start" && <StartContainer />}
      {app.page === "game" && <GamePlayContainer />}
    </div>
  );
};

export default AppComponent;
