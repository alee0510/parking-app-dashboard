import { LOG_IN, LOG_OUT, STAY_LOGIN, LOG_IN_ERROR } from '../helpers/actionTypes'

const INITIAL_STATE = {
    data : [],
    error : false,
    msg : ''
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
        case LOG_IN_ERROR :
            return  {
                ...state, data : [], error : true, msg : action.payload
            }
        case STAY_LOGIN :
            return {
                ...state, data : action.payload
            }
        default : return state
    }
}