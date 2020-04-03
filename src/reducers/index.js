// import combine reducer
import { combineReducers } from 'redux'

// import reducers
import { burgerReducer, avatarReducer } from './componentReducers'
import { partnerReducer } from './partnerReducer'
import { companyReducer } from './companyReducer'

// 
import { memberReducer } from './memberReducers'
import { parkingReducer } from './parkingAreaReducer'
import { ratingReducer } from './ratingReducer'
import { historyReducer } from './historyReducer'
import { paymentReducer } from './paymentReducer'
import { vehicleReducer } from './vehicleReducer'
import { userReducer } from './userReducer'

// combine all reducer
const allReducers = combineReducers({
    burgerReducer, 
    avatarReducer,
    partnerReducer,
    company : companyReducer,
    //     
    member : memberReducer,
    parking : parkingReducer,
    rating : ratingReducer,
    history : historyReducer,
    payment : paymentReducer,
    vehicle : vehicleReducer,
    user : userReducer,
})

// export all reducers
export default allReducers