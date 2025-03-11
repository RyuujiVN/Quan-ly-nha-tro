import { combineReducers } from 'redux'
import boardingHouseReducer from './boardinghouseReducer'
import roomReducer from './roomReducer'
import serviceReducer from './serviceReducer'
import guestReducer from './guestReducer'
import electricityMeterReducer from './electricityMeterReducer'
import waterMeterReducer from './waterMeterReducer'
import incurredCostReducer from './incurredCostReducer'
import invoiceReducer from './invoiceReducer'

const allReducers = combineReducers({
  boardingHouseReducer,
  roomReducer,
  serviceReducer,
  guestReducer,
  electricityMeterReducer,
  waterMeterReducer,
  incurredCostReducer,
  invoiceReducer
})

export default allReducers