// import combine reducer
import { combineReducers } from 'redux'

// import reducers
import { burgerReducer, avatarReducer } from './componentReducers'
import { userReducer, userProfileReducer } from './userReducer'
import { 
        carBrandReducrer, 
        carTypeReducer, 
        carBrandTotal, 
        carTypeTotal,
        motorBrandTotal, 
        motorBrandReducer, 
        motorTypeTotal, 
        motorTypeReducer,
        allBrands 
} from './vehicleReducer'
import { totalRating, ratingReducer } from './ratingReducer'
import { 
        historyTotal, 
        historyReducer, 
        onActiveTotal, 
        onActiveReducer 
} from './historyReducer'
import { 
        paymentTotalData, 
        paymentReducer,
        paymentStatus,
        paymentTypes 
} from './paymentReducer'
import { parkingReducer } from './parkingAreaReducer'
import { partnerReducer } from './partnerReducer'
import { companyReducer } from './companyReducer'

// 
import { memberReducer } from './memberReducers'

// combine all reducer
const allReducers = combineReducers({
    burgerReducer, 
    avatarReducer,
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
    parkingReducer,
    partnerReducer,
    allBrands,
    company : companyReducer,
        //     
    member : memberReducer
})

// export all reducers
export default allReducers