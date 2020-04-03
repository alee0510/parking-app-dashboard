import { 
    GET_COMPANY, 
    GET_COMPANY_START, 
    GET_COMPANY_END 
} from '../actions'

const INITIAL_STATE = {
    data : [],
    loading : false
}

export const companyReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case GET_COMPANY : 
            return { ...state, data : action.payload }
        case GET_COMPANY_START :
            return { ...state, loading : true }
        case GET_COMPANY_END :
            return { ...state, loading : false }
        default : return state
    }
}