import { 
    GET_PARTNER,
    GET_PARTNER_START,
    GET_PARTNER_END
} from '../actions'

const INITIAL_STATE = {
    data : [], 
    loading : false
}

export const partnerReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case GET_PARTNER : 
            return { ...state, data : action.payload }
        case GET_PARTNER_START :
            return { ...state, loading : true }
        case GET_PARTNER_END :
            return { ...state, loading : false }
        default : return state
    }
}