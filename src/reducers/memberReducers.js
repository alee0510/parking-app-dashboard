import { 
    TOTAL_USER, 
    GET_USER, 
    GET_PROFILE,
    GET_ROLES,
} from '../helpers/actionTypes'

export const getTotalUserReducer = (state = { userTotal : 0}, action) => {
    switch(action.type) {
        case TOTAL_USER :
            return { userTotal : action.payload }
        default : return state
    }
}

export const getUserReducer = (state = { user : [] }, action) => {
    switch(action.type) {
        case GET_USER :
            return { user : action.payload }
        default : return state
    }
}

export const getProfileReducer = (state = { profile : [] }, action) => {
    switch(action.type) {
        case GET_PROFILE :
            return { profile : action.payload }
        default : return state
    }
}

export const getUserRoleReducer = (state = { roles : [] }, action) => {
    switch(action.type) {
        case GET_ROLES :
            return { roles : action.payload }
        default : return state
    }
}