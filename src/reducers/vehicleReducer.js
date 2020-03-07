import { GET_CAR_BRANDS, GET_CAR_TYPES, GET_TOTAL_CAR_BRAND, GET_TOTAL_CAR_TYPE } from '../helpers/actionTypes'

// CAR : BRAND AND TYPE
export const carBrandTotal = (state = { carBrandTotal : 0 }, action) => {
    switch(action.type) {
        case GET_TOTAL_CAR_BRAND :
            return { carBrandTotal : action.payload }
        default : return state
    }
}

export const carBrandReducrer = (state = { carBrands : [] }, action) => {
    switch(action.type) {
        case GET_CAR_BRANDS :
            return { carBrands : action.payload }
        default : return state
    }
}

export const carTypeTotal = (state = { carTypeTotal : 0 }, action) => {
    switch(action.type) {
        case GET_TOTAL_CAR_TYPE :
            return { carTypeTotal : action.payload }
        default : return state
    }
}

export const carTypeReducer = (state = { carTypes : [] }, action) => {
    switch(action.type) {
        case GET_CAR_TYPES :
            return { carTypes : action.payload }
        default : return state
    }
}
