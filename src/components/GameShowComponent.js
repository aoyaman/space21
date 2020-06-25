import React from 'react'
import PropTypes from 'prop-types'

const GameShowComponent = ({ game, onBack }) => (
  <div>
    <h2>game id:{game.id}</h2>

    <button
      onClick={onBack}
      style={{
        marginLeft: '4px',
      }}
    >
      戻る
    </button>
  </div>
)

GameShowComponent.propTypes = {
  game: PropTypes.shape({}).isRequired,
  onBack: PropTypes.func.isRequired,
}

export default GameShowComponent
