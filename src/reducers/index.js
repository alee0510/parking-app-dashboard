// import combine reducer
import { combineReducers } from 'redux'

// import reducers
import { burgerReducer, avatarReducer } from './componentReducers'
import { getTotalUserReducer, getUserReducer, getProfileReducer, getUserRoleReducer } from './memberReducers'
import { userReducer, userProfileReducer } from './userReducer'

// combine all reducer
const allReducers = combineReducers({
    burgerReducer, avatarReducer,
    totalAccount : getTotalUserReducer, 
    account : getUserReducer,
    profile : getProfileReducer,
    roles : getUserRoleReducer, 
    user : userReducer,
    userProfile : userProfileReducer
})

// export all reducers
export default allReducers