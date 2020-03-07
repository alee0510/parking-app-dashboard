import Axios from 'axios'
import { GET_CAR_BRANDS, GET_CAR_TYPES, GET_TOTAL_CAR_BRAND,
    GET_TOTAL_CAR_TYPE 
} from '../helpers/actionTypes'
import { API_URL_ADMIN } from '../helpers/apiUrl'

// CAR BRANDS
export const getTotalCarBrands = () => {
    return async (dispacth) => {
        try {
            const { data } = await Axios.get(API_URL_ADMIN + `/vehicle/car/brands/total`)
            dispacth({
                type : GET_TOTAL_CAR_BRAND,
                payload : data[0]
            })
        } catch (err) {
            console.log(err.response ? err.response.data : err)
        }
    }
}
export const getInitialCarBrands = (limit) => {
    return async (dispacth) => {
        try {
            const { data } = await Axios.get(API_URL_ADMIN + `/vehicle/car/brands/?limit=${limit}`)
            dispacth({
                type : GET_CAR_BRANDS,
                payload : data
            })
        } catch (err) {
            console.log(err.response ? err.response.data : err)
        }
    }
}
export const getNextCarBrand = (id, limit) => {
    return async (dispacth) => {
        try {
            console.log('next brand')
            const { data } = await Axios.get(API_URL_ADMIN + `/vehicle/car/brands/next/?id=${id}&limit=${limit}`)
            console.table(data)
            dispacth({
                type : GET_CAR_BRANDS,
                payload : data
            })
        } catch (err) {
            console.log(err.response ? err.response.data : err)
        }
    }
}
export const getPrevCarBrands = (id, limit) => {
    return async (dispacth) => {
        try {
            console.log('prev brand')
            const { data } = await Axios.get(API_URL_ADMIN + `/vehicle/car/brands/prev/?id=${id}&limit=${limit}`)
            console.table(data)
            dispacth({
                type : GET_CAR_BRANDS,
                payload : data.reverse()
            })
        } catch (err) {
            console.log(err.response ? err.response.data : err)
        }
    }
}

// CAR TYPES
export const getTotalCarTypes = () => {
    return async (dispacth) => {
        try {
            const { data } = await Axios.get(API_URL_ADMIN + '/vehicle/car/types/total')
            dispacth({
                type : GET_TOTAL_CAR_TYPE,
                payload : data[0]
            })
        } catch (err) {
            console.log(err.response ? err.response.data : err)
        }
    }
}
export const getInitialCarTypes = (limit) => {
    return async (dispacth) => {
        try {
            const { data } = await Axios.get(API_URL_ADMIN + `/vehicle/car/types/?limit=${limit}`)
            dispacth({
                type : GET_CAR_TYPES,
                payload : data
            })
        } catch (err) {
            console.log(err.response ? err.response.data : err)
        }
    }
}
export const getNextCarTypes = (id, limit) => {
    return async (dispacth) => {
        try {
            const { data } = await Axios.get(API_URL_ADMIN + `/vehicle/car/types/next/?id=${id}&limit=${limit}`)
            dispacth({
                type : GET_CAR_TYPES,
                payload : data
            })
        } catch (err) {
            console.log(err.response ? err.response.data : err)
        }
    }
}
export const getPrevCarTypes = (id, limit) => {
    return async (dispacth) => {
        try {
            const { data } = await Axios.get(API_URL_ADMIN + `/vehicle/car/types/prev/?id=${id}&limit=${limit}`)
            dispacth({
                type : GET_CAR_TYPES,
                payload : data.reverse()
            })
        } catch (err) {
            console.log(err.response ? err.response.data : err)
        }
    }
}

// MOTOR BRANDS
