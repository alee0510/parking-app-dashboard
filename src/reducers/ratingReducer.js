import { GET_RATING, GET_RATING_TOTAL } from '../helpers/actionTypes'

export const totalRating = (state = { total : 0 }, action) => {
    switch(action.type) {
        case GET_RATING_TOTAL :
            return { total : action.payload }
        default : return state
    }
}

export const ratingReducer = (state = { ratings : [] }, action) => {
    switch(action.type) {
        case GET_RATING :
            return { ratings : action.payload }
        default : return state
    }
}