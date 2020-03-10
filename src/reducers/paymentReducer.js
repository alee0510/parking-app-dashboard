import { GET_TRANSACTION_HISTORY_TOTAL, 
        GET_TRANSACTION_HISTORY,
        GET_TRANSACTION_HISTORY_STATUS,
        GET_TRANSACTION_HISTORY_TYPE } from '../helpers/actionTypes'

// payment reducer
export const paymentTotalData = (state = { total : 0}, action) => {
    switch(action.type) {
        case GET_TRANSACTION_HISTORY_TOTAL :
            return { total : action.payload }
        default : return state
    }
}

export const paymentReducer = (state = { data : [] }, action) => {
    switch(action.type) {
        case GET_TRANSACTION_HISTORY :
            return { data : action.payload }
        default : return state
    }
}

export const paymentStatus = (state = { data : [] }, action) => {
    switch(action.type) {
        case GET_TRANSACTION_HISTORY_STATUS :
            return { data : action.payload }
        default : return state
    }
}
export const paymentTypes = (state = { data : [] }, action) => {
    switch(action.type) {
        case GET_TRANSACTION_HISTORY_TYPE :
            return { data : action.payload }
        default : return state
    }
}