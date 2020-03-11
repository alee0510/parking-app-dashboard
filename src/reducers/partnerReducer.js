import { GET_PARTNERS } from '../helpers/actionTypes'

export const partnerReducer = (state = { data : [] }, action) => {
    switch(action.type) {
        case GET_PARTNERS : 
            return { data : action.payload }
        default : return state
    }
}