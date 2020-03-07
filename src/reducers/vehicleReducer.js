import { GET_CAR_BRANDS, GET_CAR_TYPES } from '../helpers/actionTypes'

// CAR : BRAND AND TYPE
export const carBrandReducrer = (state = { carBrands : [] }, action) => {
    switch(action.type) {
        case GET_CAR_BRANDS :
            return { carBrands : action.payload }
        default : return state
    }
}
export const carTypeReducer = (state = { carType : [] }, action) => {
    switch(action.type) {
        case GET_CAR_TYPES :
            return { carType : action.payload }
        default : return state
    }
}
