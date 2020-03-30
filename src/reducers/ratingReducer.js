import {
    GET_RATING,
    GET_RATING_TOTAL,
    GET_RATING_START,
    GET_RATING_END
} from '../actions'

const INITIAL_STATE = {
    data : [],
    total : 0,
    loading : false
}

export const ratingReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case GET_RATING :
            return { ...state, data : action.payload }
        case GET_RATING_TOTAL :
            return { ...state, total : action.payload }
        case GET_RATING_START :
            return { ...state, loading : true }
        case GET_RATING_END :
            return { ...state, loading : false }
        default : return state
    }
}