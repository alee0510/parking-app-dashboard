import { LOG_IN, LOG_OUT, STAY_LOGIN, LOG_IN_ERROR, CLEAR_ERROR } from '../helpers/actionTypes'

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