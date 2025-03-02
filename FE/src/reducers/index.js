import { combineReducers } from 'redux'
import boardingHouseReducer from './boardinghouseReducer'
import roomReducer from './roomReducer'

const allReducers = combineReducers({
  boardingHouseReducer,
  roomReducer
})

export default allReducers