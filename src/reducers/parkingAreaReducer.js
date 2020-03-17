import { GET_PARKING_AREA, ON_EDIT_INIT, ON_EDIT_INPUT } from '../helpers/actionTypes'

export const parkingReducer = (state = { data : [] }, action) => {
    switch(action.type) {
        case GET_PARKING_AREA :
            return { data : action.payload }
        default : return state
    }
}