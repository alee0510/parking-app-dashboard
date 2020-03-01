import { TOTAL_USER, GET_USER, NEXT_USER, PREV_USER, 
    GET_PROFILE, NEXT_PROFILE, PREV_PROFILE 
} from '../helpers/actionTypes'

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

export const getProfileReducer = (state = { profile : [] }, action) => {
    switch(action.type) {
        case GET_PROFILE :
            return {
                ...state, profile : action.payload
            }
        case NEXT_PROFILE :
            return {
                ...state, profile : action.payload
            }
        case PREV_PROFILE :
            return {
                ...state, profile : action.payload.reverse()
            }
        default : return state
    }
}