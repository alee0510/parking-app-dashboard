import {
    LOG_IN,
    LOG_OUT,
    STAY_LOG_IN,
    ERROR_LOG_IN,
    CLEAR_ERROR_LOG_IN
} from '../actions'

const INITIAL_STATE = {
    account : [],
    profile : [],
    error : false,
    msg : ''
}

export const userReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case LOG_IN :
            return { ...state, account : action.payload.account, profile : action.payload.profile, error : false, msg : '' }
        case LOG_OUT :
            return INITIAL_STATE
        case STAY_LOG_IN :
            return { ...state, account : action.payload.account, profile : action.payload.profile }
        case ERROR_LOG_IN :
            return { ...state, error : true, msg : action.payload }
        case CLEAR_ERROR_LOG_IN :
            return { ...state, error : false, msg : '' }
        default : return state
    }
}