import React from 'react'
import PropTypes from 'prop-types'

const GameIndexComponent = ({ games, onStart, onShowGame }) => (
  <div>
    <button
      onClick={onStart}
      style={{
        marginLeft: '4px',
      }}
    >
      ゲーム開始！
    </button>

    <ul>
      {games.map((game, index) => {
        return (
          <li key={game.id} onClick={() => {onShowGame(index);}}>
            {game.id}:{game.date.getFullYear()}/{game.date.getMonth()+1}/{game.date.getDate()} {game.date.getHours()}:{game.date.getMinutes()}
          </li>
        );
      })}
    </ul>
  </div>
)

GameIndexComponent.propTypes = {
  games: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onStart: PropTypes.func.isRequired,
  onShowGame: PropTypes.func.isRequired
}

export default GameIndexComponent
