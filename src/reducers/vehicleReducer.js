import {
    GET_CAR_BRAND,
    GET_CAR_TYPE,
    GET_MOTOR_BRAND,
    GET_MOTOR_TYPE,
    GET_CAR_BRAND_TOTAL,
    GET_CAR_TYPE_TOTAL,
    GET_MOTOR_BRAND_TOTAL,
    GET_MOTOR_TYPE_TOTAL,
    GET_ALL_BRANDS,
    GET_VEHICLE_START,
    GET_VEHICLE_END
} from '../actions'

const INITIAL_STATE = {
    car_brand : [],
    car_type : [],
    motor_brand : [],
    motor_type : [],
    car_brand_total : 0,
    car_type_total : 0,
    motor_brand_total : 0,
    motor_type_total : 0,
    car : [], // all car brand
    motor : [], // all motor brand
    loading : false
}

export const vehicleReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case GET_CAR_BRAND :
            return { ...state, car_brand : action.payload }
        case GET_CAR_TYPE :
            return { ...state, car_type : action.payload }
        case GET_MOTOR_BRAND :
            return { ...state, motor_brand : action.payload }
        case GET_MOTOR_TYPE :
            return { ...state, motor_type : action.payload }
        case GET_CAR_BRAND_TOTAL :
            return { ...state, car_brand_total : action.payload }
        case GET_CAR_TYPE_TOTAL :
            return { ...state, car_type_total : action.payload }
        case GET_MOTOR_BRAND_TOTAL :
            return { ...state, motor_brand_total : action.payload }
        case GET_MOTOR_TYPE_TOTAL :
            return { ...state, motor_type_total : action.payload }
        case GET_ALL_BRANDS :
            return {...state, car : action.payload.car, motor : action.payload.motor }
        case GET_VEHICLE_START :
            return { ...state, loading : true }
        case GET_VEHICLE_END :
            return { ...state, loading : false }
        default : return state
    }
}