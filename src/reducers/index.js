import { combineReducers } from 'redux'
import app from './app'
import games from './games'
import kouho from './kouho'

export default combineReducers({
  app,
  games,
  kouho
})
