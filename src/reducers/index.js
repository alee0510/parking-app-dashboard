// import combine reducer
import { combineReducers } from 'redux'

// import reducers
import { burgerReducer, avatarReducer } from './componentReducers'
import { getTotalUserReducer, getUserReducer } from './memberReducers'

// combine all reducer
const allReducers = combineReducers({
    burgerReducer, avatarReducer,
    totalAccount : getTotalUserReducer, account : getUserReducer
})

// export all reducers
export default allReducers