import { TOTAL_USER, GET_USER, NEXT_USER, PREV_USER } from '../helpers/actionTypes'

export const getTotalUserReducer = (state = { userTotal : 0}, action) => {
    switch(action.type) {
        case TOTAL_USER :
            return {
                ...state, userTotal : action.payload
            }
        default : return state
    }
}

export const getUserReducer = (state = { user : [] }, action) => {
    switch(action.type) {
        case GET_USER :
            return {
                ...state, user : action.payload
            }
        case NEXT_USER :
            return {
                ...state, user : action.payload
            }
        case PREV_USER :
            return {
                ...state, user : action.payload.reverse()
            }
        default : return state
    }
}