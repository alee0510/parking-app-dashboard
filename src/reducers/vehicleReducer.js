import { GET_CAR_BRANDS, GET_CAR_TYPES, GET_TOTAL_CAR_BRAND, GET_TOTAL_CAR_TYPE, 
    GET_TOTAL_MOTOR_BRANDS, GET_MOTOR_BRANDS, GET_TOTAL_MOTOR_TYPES, GET_MOTOR_TYPES 
} from '../helpers/actionTypes'

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

// MOTOR : BRAN AND TYPE
export const motorBrandTotal = (state = { motorBrandTotal : 0 }, action) =>  {
    switch(action.type) {
        case GET_TOTAL_MOTOR_BRANDS :
            return { motorBrandTotal : action.payload }
        default : return state
    }
}
export const motorBrandReducer = (state = { motorBrands : [] }, action) => {
    switch(action.type) {
        case GET_MOTOR_BRANDS :
            return { motorBrands : action.payload }
        default : return state
    }
}
export const motorTypeTotal = (state = { motorTypeTotal : 0 }, action) => {
    switch(action.type) {
        case GET_TOTAL_MOTOR_TYPES :
            return { motorTypeTotal : action.payload }
        default : return state
    }
}
export const motorTypeReducer = (state = { motorTypes : [] }, action) => {
    switch(action.type) {
        case GET_MOTOR_TYPES :
            return { motorTypes : action.payload }
        default : return state
    }
}