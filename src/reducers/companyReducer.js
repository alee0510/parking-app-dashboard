import { GET_COMPANY } from '../helpers/actionTypes'

export const companyReducer = (state = { data : [] }, action) => {
    switch(action.type) {
        case GET_COMPANY : 
            return { data : action.payload }
        default : return state
    }
}