import { LOG_IN, LOG_OUT, STAY_LOGIN } from '../helpers/actionTypes'

const INITIAL_STATE = {
    data : []
}

export const userReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case LOG_IN : 
            return {
                ...state, data : action.payload
            }
        case LOG_OUT : 
            return {
                ...state, data : []
            }
        case STAY_LOGIN :
            return {
                ...state, data : action.payload
            }
        default : return state
    }
}