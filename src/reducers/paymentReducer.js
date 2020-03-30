import {
    GET_PAYMENT,
    GET_PAYMENT_TOTAL,
    GET_PAYMENT_TYPE,
    GET_PAYMENT_STATUS,
    GET_PAYMENT_START,
    GET_PAYMENT_END
} from '../actions'

const INITIAL_STATE = {
    total : 0,
    data : [],
    type : [],
    status : [],
    loading : false
}

export const paymentReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case GET_PAYMENT :
            return { ...state, data : action.payload }
        case GET_PAYMENT_TOTAL : 
            return { ...state, total : action.payload }
        case GET_PAYMENT_TYPE :
            return { ...state, type : action.payload }
        case GET_PAYMENT_STATUS :
            return { ...state, status : action.payload }
        case GET_PAYMENT_START :
            return { ...state, loading : true }
        case GET_PAYMENT_END :
            return { ...state, loading : false }
        default : return state
    }
}