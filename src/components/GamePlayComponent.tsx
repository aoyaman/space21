import React from "react";

import MediaQuery from "react-responsive";

import { GameState, BoardState, PlayerState, TegomaState, KouhoState, SelectState } from '../entity/store';
import GamePlayPhoneComponent from "./GamePlayPhoneComponent";
import GamePlayPcComponent from "./GamePlayPcComponent";


type Props = {
  game: GameState
  board: BoardState
  players: PlayerState
  tegoma: TegomaState
  kouho: KouhoState
  select: SelectState
  onSelectKouho: (blockType: number) => void
  onRestart: () => void
  onDecide: (x: number, y: number) => void
  onRotate: () => void
  onFlip: () => void
};

const GamePlayComponent: React.FC<Props> = ({ game, board, players, tegoma, kouho, select, onSelectKouho, onRestart, onDecide, onRotate, onFlip }) => {

  return (
    <React.Fragment>

      {/* スマホ用レイアウト */}
      <MediaQuery query="(max-width: 480px)">
        <GamePlayPhoneComponent
          game={game}
          board={board}
          players={players}
          tegoma={tegoma}
          kouho={kouho}
          select={select}
          onSelectKouho={onSelectKouho}
          onRestart={onRestart}
          onDecide={onDecide}
          onRotate={onRotate}
          onFlip={onFlip}
          />
      </MediaQuery>

      <MediaQuery query="(min-width: 481px)">
          <GamePlayPcComponent
            game={game}
            board={board}
            players={players}
            tegoma={tegoma}
            kouho={kouho}
            select={select}
            onSelectKouho={onSelectKouho}
            onRestart={onRestart}
            onDecide={onDecide}
            onRotate={onRotate}
            onFlip={onFlip}
            />
      </MediaQuery>

    </React.Fragment>
  );
};


export default GamePlayComponent;
