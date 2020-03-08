import { GET_HISTORY, GET_HISTORY_TOTAL, GET_ON_ACTIVE, GET_ON_ACTIVE_TOTAL} from '../helpers/actionTypes'

// history
export const historyTotal = (state = { total : 0 }, action) => {
    switch(action.type) {
        case GET_HISTORY_TOTAL :
            return { total : action.payload }
        default : return state
    }
}
export const historyReducer = (state = { data : [] }, action) => {
    switch(action.type) {
        case GET_HISTORY :
            return { data : action.payload }
        default : return state
    }
}

// on active
export const onActiveTotal = (state = { total : 0 }, action) => {
    switch(action.type) {
        case GET_ON_ACTIVE_TOTAL :
            return { total : action.payload }
        default : return state
    }
}
export const onActiveReducer = (state = { data : [] }, action) => {
    switch(action.type) {
        case GET_ON_ACTIVE :
            return { data : action.payload }
        default : return state
    }
}