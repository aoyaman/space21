import { combineReducers } from 'redux'
import app from './app'
import game from './game'
import board from './board'
import player from './player'
import tegoma from './tegoma'
import kouho from './kouho'
import select from './select'

export default combineReducers({
  app,
  game,
  board,
  player,
  tegoma,
  kouho,
  select
})
