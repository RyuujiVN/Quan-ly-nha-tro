import { combineReducers } from 'redux'
import boardingHouseReducer from './boardinghouseReducer'
import roomReducer from './roomReducer'
import serviceReducer from './serviceReducer'
import guestReducer from './guestReducer'
import electricityMeterReducer from './electricityMeterReducer'
import waterMeterReducer from './waterMeterReducer'
import incurredCostReducer from './incurredCostReducer'

const allReducers = combineReducers({
  boardingHouseReducer,
  roomReducer,
  serviceReducer,
  guestReducer,
  electricityMeterReducer,
  waterMeterReducer,
  incurredCostReducer
})

export default allReducers