import { 
    GET_PARKING_AREA, 
    GET_PARKING_START, 
    GET_PARKING_END, 
    PARKING_UPLOAD 
} from '../actions'

const INITIAL_STATE = {
    area : [],
    loading : false,
    progress : 0
}

export const parkingReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case GET_PARKING_AREA :
            return { ...state, area : action.payload }
        case GET_PARKING_START :
            return { ...state, loading : true }
        case GET_PARKING_END :
            return { ...state, loading : false }
        case PARKING_UPLOAD :
            return { ...state, progress : action.payload }
        default : return state
    }
}