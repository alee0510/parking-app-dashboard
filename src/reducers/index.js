// import combine reducer
import { combineReducers } from 'redux'

// import reducers
import { burgerReducer, avatarReducer } from './componentReducers'

// combine all reducer
const allReducers = combineReducers({
    burgerReducer, avatarReducer
})

// export all reducers
export default allReducers