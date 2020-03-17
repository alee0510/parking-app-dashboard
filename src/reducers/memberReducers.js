import { 
    TOTAL_USER, 
    GET_USER, 
    GET_USER_START,
    GET_USER_END,
    GET_PROFILE,
    GET_PROFILE_START,
    GET_PROFILE_END,
    GET_ROLES,
} from '../helpers/actionTypes'

export const getTotalUserReducer = (state = { userTotal : 0}, action) => {
    switch(action.type) {
        case TOTAL_USER :
            return { userTotal : action.payload }
        default : return state
    }
}

export const getUserReducer = (state = { user : [], loading : false }, action) => {
    switch(action.type) {
        case GET_USER :
            return { ...state, user : action.payload }
        case GET_USER_START : 
            return { ...state, loading : true }
        case GET_USER_END :
            return { ...state, loading : false }
        default : return state
    }
}

export const getProfileReducer = (state = { profile : [], loading : false }, action) => {
    switch(action.type) {
        case GET_PROFILE :
            return { profile : action.payload }
        case GET_PROFILE_START :
            return { ...state, loading : true }
        case GET_PROFILE_END :
            return { ...state, loading : false }
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