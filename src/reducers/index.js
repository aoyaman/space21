import { combineReducers } from 'redux'
import app from './app'
import games from './games'

export default combineReducers({
  app,
  games
})
