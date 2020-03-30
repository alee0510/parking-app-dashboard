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
import { 
        paymentTotalData, 
        paymentReducer,
        paymentStatus,
        paymentTypes 
} from './paymentReducer'
import { partnerReducer } from './partnerReducer'
import { companyReducer } from './companyReducer'

// 
import { memberReducer } from './memberReducers'
import { parkingReducer } from './parkingAreaReducer'
import { ratingReducer } from './ratingReducer'
import { historyReducer } from './historyReducer'

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
    paymentTotalData, 
    paymentReducer,
    paymentStatus,
    paymentTypes,
    partnerReducer,
    allBrands,
    company : companyReducer,
        //     
    member : memberReducer,
    parking : parkingReducer,
    rating : ratingReducer,
    history : historyReducer
})

// export all reducers
export default allReducers