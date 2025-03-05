import { combineReducers } from 'redux'
import boardingHouseReducer from './boardinghouseReducer'
import roomReducer from './roomReducer'
import serviceReducer from './serviceReducer'

const allReducers = combineReducers({
  boardingHouseReducer,
  roomReducer,
  serviceReducer
})

export default allReducers