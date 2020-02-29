// import combine reducer
import { combineReducers } from 'redux'

// import reducers
import { burgerReducer } from './componentReducers'

// combine all reducer
const allReducers = combineReducers({
    burgerReducer
})

// export all reducers
export default allReducers