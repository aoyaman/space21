import React from "react";

import MediaQuery from "react-responsive";

import * as info from "../domain/GameInfo";
import GamePlayPhoneComponent from "./GamePlayPhoneComponent";
import GamePlayPcComponent from "./GamePlayPcComponent";

type Props = {
  gameInfo: info.GameInfo;
  onSelectKouho: (blockType: number) => void;
  onRestart: () => void;
  onDecide: (x: number, y: number) => void;
  onRotate: () => void;
  onFlip: () => void;
  onNotSelect: () => void;
};

const GamePlayComponent: React.FC<Props> = ({
  gameInfo,
  onSelectKouho,
  onRestart,
  onDecide,
  onRotate,
  onFlip,
  onNotSelect,
}) => {
  return (
    <>
      {/* スマホ用レイアウト */}
      <MediaQuery query="(max-width: 480px)">
        <GamePlayPhoneComponent
          gameInfo={gameInfo}
          onSelectKouho={onSelectKouho}
          onRestart={onRestart}
          onDecide={onDecide}
          onRotate={onRotate}
          onFlip={onFlip}
          onNotSelect={onNotSelect}
        />
      </MediaQuery>

      <MediaQuery query="(min-width: 481px)">
        <GamePlayPcComponent
          gameInfo={gameInfo}
          onSelectKouho={onSelectKouho}
          onRestart={onRestart}
          onDecide={onDecide}
          onRotate={onRotate}
          onFlip={onFlip}
        />
      </MediaQuery>
    </>
  );
};

export default GamePlayComponent;
