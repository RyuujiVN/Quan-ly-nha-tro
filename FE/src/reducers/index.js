import { combineReducers } from 'redux'
import boardingHouseReducer from './boardinghouseReducer'
import roomReducer from './roomReducer'
import serviceReducer from './serviceReducer'
import guestReducer from './guestReducer'

const allReducers = combineReducers({
  boardingHouseReducer,
  roomReducer,
  serviceReducer,
  guestReducer
})

export default allReducers