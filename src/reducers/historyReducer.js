import {
    GET_HISTORY,
    GET_HISTORY_ACTIVE,
    GET_HISTORY_TOTAL,
    GET_HISTORY_ACTIVE_TOTAL,
    GET_HISTORY_START,
    GET_HISTORY_END
} from '../actions'

const INITIAL_STATE = {
    total : 0,
    data : [],
    active_total : 0,
    active : [],
    loading : false
}

export const historyReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case GET_HISTORY :
            return { ...state, data : action.payload }
        case GET_HISTORY_ACTIVE :
            return { ...state, active : action.payload }
        case GET_HISTORY_TOTAL :
            return { ...state, total : action.payload }
        case GET_HISTORY_ACTIVE_TOTAL :
            return { ...state, active_total : action.payload }
        case GET_HISTORY_START :
            return { ...state, loading : true }
        case GET_HISTORY_END :
            return { ...state, loading : false }
        default : return state
    }
}