import { LOG_IN, LOG_OUT, STAY_LOGIN, LOG_IN_ERROR, CLEAR_ERROR, GET_USER_PROFILE, GET_PROFILE_ERROR } from '../helpers/actionTypes'

const INITIAL_STATE = {
    data : [],
    error : false,
    msg : ''
}

export const userReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case LOG_IN : 
            return {
                ...state, data : action.payload, error : false, msg : ''
            }
        case LOG_OUT : 
            return {
                ...state, data : [], error : false, msg : ''
            }
        case LOG_IN_ERROR :
            return  {
                ...state, data : [], error : true, msg : action.payload
            }
        case CLEAR_ERROR : return INITIAL_STATE
        case STAY_LOGIN :
            return {
                ...state, data : action.payload, error : false, msg : ''
            }
        default : return state
    }
}

export const userProfileReducer = (state = { data : [] }, action) => {
    switch(action.type) {
        case GET_USER_PROFILE :
            return {
                ...state, data : action.payload
            }
        case GET_PROFILE_ERROR :
            return {
                ...state, data : []
            }
        default : return state
    }
}