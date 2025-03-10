import { combineReducers } from 'redux'
import boardingHouseReducer from './boardinghouseReducer'
import roomReducer from './roomReducer'
import serviceReducer from './serviceReducer'
import guestReducer from './guestReducer'
import electricityMeterReducer from './electricityMeterReducer'
import waterMeterReducer from './waterMeterReducer'

const allReducers = combineReducers({
  boardingHouseReducer,
  roomReducer,
  serviceReducer,
  guestReducer,
  electricityMeterReducer,
  waterMeterReducer
})

export default allReducers