import { BURGER } from '../helpers/actionTypes'

// create reducers
export const burgerReducer = (state = { burger : false }, action) => {
    switch(action.type) {
        case BURGER : 
            return {
                ...state, burger : action.payload
            }
        default : return state
    }
}