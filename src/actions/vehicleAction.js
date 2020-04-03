import Axios from 'axios'
import { API_VEHICLE } from '../helpers/apiUrl'
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

// GET TOTAL DATA
export const getTotalVehicle = (key) => {
    return async(dispatch) => {
        try {
            // initialize parameter
            let type = ''
            let url = ''

            // check key
            if (key === 'car_brand') {
                url = `/car/brands/total`
                type = GET_CAR_BRAND_TOTAL
            } else if (key === 'car_type') {
                url = `/car/types/total`
                type = GET_CAR_TYPE_TOTAL
            } else if (key === 'motor_brand') {
                url = `/motor/brands/total`
                type = GET_MOTOR_BRAND_TOTAL
            } else  {
                url = `/motor/types/total`
                type = GET_MOTOR_TYPE_TOTAL
            }

            // do query
            const { data } = await Axios.get(API_VEHICLE + url )
            dispatch({
                type : type,
                payload : data[0]
            })
        } catch (err) {
            console.log(err.response ? err.response.data : err)
        }
    }
}

// GET VEHICLE DATA
export const getVehicle = (key, limit = null, next = null, prev = null) => {
    return async(dispatch) => {
        try {
            dispatch({type : GET_VEHICLE_START})
            // initialize parameter
            let type = ''
            let url = ''

            // check key
            if(key === 'car_brand') {
                url = `/car/brands`
                type = GET_CAR_BRAND
            } else if (key === 'car_type') {
                url = `/car/types`
                type = GET_CAR_TYPE
            } else if (key === 'motor_brand') {
                url = `/motor/brands`
                type = GET_MOTOR_BRAND
            } else {
                url = `/motor/types`
                type = GET_MOTOR_TYPE
            }

            // check query
            const queryLimit = limit ? next || prev ? `&limit=${limit}` : `?limit=${limit}` : ''
            const queryNext = next ? `?next=${next}` : ''
            const queryPrev = prev ? `?prev=${prev}` : ''
            const query = url + queryNext + queryPrev + queryLimit

            // do query
            const { data } = await Axios.get(API_VEHICLE + query)
            dispatch({
                type : type,
                payload : prev ? data.reverse() : data
            })

            dispatch({type : GET_VEHICLE_END})
        } catch (err) {
            dispatch({type : GET_VEHICLE_END})
            console.log(err.response ? err.response.data : err)
        }
    }
}

// CRUD OPERATION : ADD, EDIT, DELETE
export const addVehicle = (key, body, limit) => {
    return async (dispatch) => {
        try {
            dispatch({type : GET_VEHICLE_START})
            
            // initialize parameter
            let url = ''
            let type = ''

            // check key
            if (key === 'car_brand') {
                url = `/car/brands/add`
                type = GET_CAR_BRAND
            } else if (key === `car_type`) {
                url = `/car/types/add`
                type = GET_CAR_TYPE
            } else if (key === 'motor_brand') {
                url = `/motor/brands/add`
                type = GET_MOTOR_BRAND
            } else {
                url = `/motor/types/add`
                type = GET_MOTOR_TYPE
            }

            // do query
            const response = await Axios.post(API_VEHICLE + url, body)
            console.log(response.data)

            // refresh data
            const query = url.slice(0, url.length-4) + `/?limit=${limit}`
            const { data } = await Axios.get(API_VEHICLE + query)
            dispatch({
                type : type,
                payload : data
            })

            dispatch({type : GET_VEHICLE_END})
        } catch (err) {
            dispatch({type : GET_VEHICLE_END})
            console.log(err.response ? err.response.data : err)
        }
    }
}

export const editVehicle = (key, id, body, next, limit) => {
    return async (dispatch) => {
        try {
            dispatch({type : GET_VEHICLE_START})

            // initialize parameter
            let url = ''
            let type = ''

            // check key
            if (key === 'car_brand') {
                url = `/car/brands/edit/`
                type = GET_CAR_BRAND
            } else if (key === `car_type`) {
                url = `/car/types/edit/`
                type = GET_CAR_TYPE
            } else if (key === 'motor_brand') {
                url = `/motor/brands/edit/`
                type = GET_MOTOR_BRAND
            } else {
                url = `/motor/types/edit/`
                type = GET_MOTOR_TYPE
            }

            // do query
            const response = await Axios.put(API_VEHICLE + url + id, body)
            console.log(response.data)

            // refresh data
            const query = url.slice(0, url.length-5) + `?next=${next-1}&limit=${limit}`
            const { data } = await Axios.get(API_VEHICLE + query)
            dispatch({
                type : type,
                payload : data
            })

            dispatch({type : GET_VEHICLE_END})
        } catch (err) {
            dispatch({type : GET_VEHICLE_END})
            console.log(err.response ? err.response.data : err)
        }
    }
}

export const deleteVehicle = (key, id, prev, limit) => {
    return async (dispatch) => {
        try {
            dispatch({type : GET_VEHICLE_START})

            // initialize parameter
            let url = ''
            let type = ''

            // check key
            if (key === 'car_brand') {
                url = `/car/brands/delete/`
                type = GET_CAR_BRAND
            } else if (key === `car_type`) {
                url = `/car/types/delete/`
                type = GET_CAR_TYPE
            } else if (key === 'motor_brand') {
                url = `/motor/brands/delete/`
                type = GET_MOTOR_BRAND
            } else {
                url = `/motor/types/delete/`
                type = GET_MOTOR_TYPE
            }

            // do query
            const response = await Axios.delete(API_VEHICLE + url + id)
            console.log(response.data)

            // refresh data
            const query = url.slice(0, url.length-7) + `?prev=${prev-1}&limit=${limit}`
            const { data } = await Axios.get(API_VEHICLE + query)
            dispatch({
                type : type,
                payload : data
            })

            dispatch({type : GET_VEHICLE_END})
        } catch (err) {
            dispatch({type : GET_VEHICLE_END})
            console.log(err.response ? err.response.data : err)
        }
    }
}

// get all brand and types
export const getBrand = () => {
    return async (dispatch) => {
        try {
            // do query to get all car and motor brands
            const car = await Axios.get(API_VEHICLE + '/car/brands')
            const motor = await Axios.get(API_VEHICLE + '/motor/brands')

            // store to redux
            dispatch({
                type : GET_ALL_BRANDS,
                payload : {
                    car : car.data,
                    motor : motor.data
                }
            })
        } catch (err) {
            console.log(err.response ? err.response.data : err)
        }
    }
}