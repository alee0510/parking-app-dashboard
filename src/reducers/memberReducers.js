import { 
    GET_MEMBER_ACCOUNT, 
    GET_MEMBER_PROFILE, 
    GET_MEMBER_ROLE, 
    GET_MEMBER_TOTAL,
    GET_MEMBER_START, 
    GET_MEMBER_END, 
} from '../actions'

const INITIAL_STATE = {
    total : 0,
    account : [],
    profile : [],
    roles : [],
    loading : false
}

export const memberReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case GET_MEMBER_ACCOUNT :
            return { ...state, account : action.payload }
        case GET_MEMBER_PROFILE :
            return { ...state, profile : action.payload }
        case GET_MEMBER_ROLE :
            return { ...state, roles : action.payload }
        case GET_MEMBER_TOTAL :
            return { ...state, total : action.payload }
        case GET_MEMBER_START :
            return { ...state, loading : true }
        case GET_MEMBER_END :
            return { ...state, loading : false }
        default : return state
    }
}