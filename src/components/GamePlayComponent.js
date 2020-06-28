import React from "react";
import PropTypes from "prop-types";

import MediaQuery from "react-responsive";

import GamePlayPhoneComponent from "./GamePlayPhoneComponent";
import GamePlayPcComponent from "./GamePlayPcComponent";


const GamePlayComponent = ({ game, board, players, tegoma, kouho, select, onSelectKouho, onRestart, onDecide, onRotate, onFlip }) => {

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

GamePlayComponent.propTypes = {
  game: PropTypes.shape({}).isRequired,
  board: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({}))).isRequired,
  players: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  tegoma: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({}))).isRequired,
  kouho: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  select: PropTypes.shape({}).isRequired,
  onSelectKouho: PropTypes.func.isRequired,
  onRestart: PropTypes.func.isRequired,
  onDecide: PropTypes.func.isRequired,
  onRotate: PropTypes.func.isRequired,
  onFlip: PropTypes.func.isRequired,
};

export default GamePlayComponent;
