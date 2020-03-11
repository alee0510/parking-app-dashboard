import Axios from 'axios'
import { 
    GET_CAR_BRANDS, 
    GET_CAR_TYPES, 
    GET_TOTAL_CAR_BRAND,
    GET_TOTAL_CAR_TYPE, 
    GET_TOTAL_MOTOR_BRANDS, 
    GET_TOTAL_MOTOR_TYPES, 
    GET_MOTOR_BRANDS, 
    GET_MOTOR_TYPES,
    GET_CAR_BRANDS_ALL,
    GET_MOTOR_BRANDS_ALL
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
export const getNextCarBrands = (id, limit) => {
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
export const getTotalMotorBrands = () => {
    return async (dispacth) => {
        try {
            const { data } = await Axios.get(API_URL_ADMIN + `/vehicle/motor/brands/total`)
            dispacth({
                type : GET_TOTAL_MOTOR_BRANDS,
                payload : data[0]
            })
        } catch (err) {
            console.log(err.response ? err.response.data : err)
        }
    }
}
export const getInitialMotorBrands = (limit) => {
    return async (dispacth) => {
        try {
            const { data } = await Axios.get(API_URL_ADMIN + `/vehicle/motor/brands/?limit=${limit}`)
            dispacth({
                type : GET_MOTOR_BRANDS,
                payload : data
            })
        } catch (err) {
            console.log(err.response ? err.response.data : err)
        }
    }
}
export const getNextMotorBrands = (id, limit) => {
    return async (dispacth) => {
        try {
            const { data } = await Axios.get(API_URL_ADMIN + `/vehicle/motor/brands/next/?id=${id}&limit=${limit}`)
            dispacth({
                type : GET_MOTOR_BRANDS,
                payload : data
            })
        } catch (err) {
            console.log(err.response ? err.response.data : err)
        }
    }
}
export const getPrevMotorBrands = (id, limit) => {
    return async (dispacth) => {
        try {
            const { data } = await Axios.get(API_URL_ADMIN + `/vehicle/motor/brands/prev/?id=${id}&limit=${limit}`)
            dispacth({
                type : GET_MOTOR_BRANDS,
                payload : data.reverse()
            })
        } catch (err) {
            console.log(err.response ? err.response.data : err)
        }
    }
}
// MOTOR TYPES
export const getTotalMotorTypes = () => {
    return async (dispacth) => {
        try {
            const { data } = await Axios.get(API_URL_ADMIN + `/vehicle/motor/types/total`)
            dispacth({
                type : GET_TOTAL_MOTOR_TYPES,
                payload : data[0]
            })
        } catch (err) {
            console.log(err.response ? err.response.data : err)
        }
    }
}
export const getInitialMotorTypes = (limit) => {
    return async (dispacth) => {
        try {
            const { data } = await Axios.get(API_URL_ADMIN + `/vehicle/motor/types/?limit=${limit}`)
            dispacth({
                type : GET_MOTOR_TYPES,
                payload : data
            })
        } catch (err) {
            console.log(err.response ? err.response.data : err)
        }
    }
}
export const getNextMotorTypes = (id, limit) => {
    return async (dispacth) => {
        try {
            const { data } = await Axios.get(API_URL_ADMIN + `/vehicle/motor/types/next/?id=${id}&limit=${limit}`)
            dispacth({
                type : GET_MOTOR_TYPES,
                payload : data
            })
        } catch (err) {
            console.log(err.response ? err.response.data : err)
        }
    }
}
export const getPrevMotorTypes = (id, limit) => {
    return async (dispacth) => {
        try {
            const { data } = await Axios.get(API_URL_ADMIN + `/vehicle/motor/types/prev/?id=${id}&limit=${limit}`)
            dispacth({
                type : GET_MOTOR_TYPES,
                payload : data.reverse()
            })
        } catch (err) {
            console.log(err.response ? err.response.data : err)
        }
    }
}

// edit brand : CAR & MOTOR
export const editCarBrand = (brandId, typeId, brand, limit) => {
    return async (dispacth) => {
        try {
            // do request to edit brand name
            console.log('do edit brand request')
            await Axios.patch(API_URL_ADMIN + `/vehicle/car/brands/edit/${brandId}`, {brand})
            
            // refresh redux data
            const brands = await Axios.get(API_URL_ADMIN + `/vehicle/car/brands/next/?id=${brandId-1}&limit=${limit}`)
            const types = await Axios.get(API_URL_ADMIN + `/vehicle/car/types/next/?id=${typeId-1}&limit=${limit}`)
            dispacth({
                type : GET_CAR_BRANDS,
                payload : brands.data
            })
            dispacth({
                type : GET_CAR_TYPES,
                payload : types.data
            })
        } catch (err) {
            console.log(err.response ? err.response.data : err)
        } 
    }
}

export const editCarType = (id, dataId, data, limit) => {
    console.log(id)
    console.log(data)
    console.log(limit)
    return async (dispacth) => {
        try {
            // do request to edit brand name
            console.log('do edit type request')
            await Axios.patch(API_URL_ADMIN + `/vehicle/car/types/edit/${id}`, data)

            // refresh redux data
            const types = await Axios.get(API_URL_ADMIN + `/vehicle/car/types/next/?id=${dataId-1}&limit=${limit}`)
            dispacth({
                type : GET_CAR_TYPES,
                payload : types.data
            })
        } catch (err) {
            console.log(err.response ? err.response.data : err)
        } 
    }
}

// get all brand data
export const getCarBrandAll = () => {
    return async (dispacth) => {
        try {
            const { data } = await Axios.get(API_URL_ADMIN + `/vehicle/car/brands/all`)
            dispacth({
                type : GET_CAR_BRANDS_ALL,
                payload : data
            })
        } catch (err) {
            console.log(err.response ? err.response.data : err)
        } 
    }
}
export const getMotorBrandAll = () => {
    return async (dispacth) => {
        try {
            const { data } = await Axios.get(API_URL_ADMIN + `/vehicle/motor/brands/all`)
            dispacth({
                type : GET_MOTOR_BRANDS_ALL,
                payload : data
            })
        } catch (err) {
            console.log(err.response ? err.response.data : err)
        } 
    }
}