import { 
    GET_PARKING_AREA, 
    PARKING_START,
    PARKING_PROCCESS,
    PARKING_END
} from '../helpers/actionTypes'

const INITIAL_STATE = {
    data : [],
    uploading : false,
    progress : null
}

export const parkingReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case GET_PARKING_AREA :
            return { ...state, data : action.payload }
        case PARKING_START :
            return { ...state, uploading : true }
        case PARKING_PROCCESS : 
            return { ...state, progress : action.payload }
        case PARKING_END :
            return { ...state, uploading : false, progress : null }
        default : return state
    }
}