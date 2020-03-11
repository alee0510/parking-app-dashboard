// import combine reducer
import { combineReducers } from 'redux'

// import reducers
import { burgerReducer, avatarReducer } from './componentReducers'
import { getTotalUserReducer, 
        getUserReducer, 
        getProfileReducer, 
        getUserRoleReducer } from './memberReducers'
import { userReducer, userProfileReducer } from './userReducer'
import { carBrandReducrer, 
        carTypeReducer, 
        carBrandTotal, 
        carTypeTotal,
        motorBrandTotal, 
        motorBrandReducer, 
        motorTypeTotal, 
        motorTypeReducer } from './vehicleReducer'
import { totalRating, ratingReducer } from './ratingReducer'
import { historyTotal, 
        historyReducer, 
        onActiveTotal, 
        onActiveReducer } from './historyReducer'
import { paymentTotalData, 
        paymentReducer,
        paymentStatus,
        paymentTypes } from './paymentReducer'
import { parkingReducer } from './parkingAreaReducer'

// combine all reducer
const allReducers = combineReducers({
    burgerReducer, 
    avatarReducer,
    totalAccount : getTotalUserReducer, 
    account : getUserReducer,
    profile : getProfileReducer,
    roles : getUserRoleReducer, 
    user : userReducer,
    userProfile : userProfileReducer,
    carBrands : carBrandReducrer,
    carTypes : carTypeReducer,
    carBrandTotal, 
    carTypeTotal,
    motorBrandTotal, 
    motorTypeTotal,
    motorBrands : motorBrandReducer,
    motorTypes : motorTypeReducer,
    totalRating,
    ratingReducer,
    historyTotal,
    historyReducer,
    onActiveTotal,
    onActiveReducer,
    paymentTotalData, 
    paymentReducer,
    paymentStatus,
    paymentTypes,
    parkingReducer
})

// export all reducers
export default allReducers