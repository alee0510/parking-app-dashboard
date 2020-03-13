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
export const editCarBrand = (id, brandId, typeId, brand, limit) => {
    return async (dispacth) => {
        try {
            // do request to edit brand name
            console.log('do edit brand request')
            await Axios.patch(API_URL_ADMIN + `/vehicle/car/brands/edit/${id}`, {brand})
            
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
export const editMotorBrand = (id, brandId, typeId, brand, limit) => {
    return async (dispacth) => {
        try {
            // do request to edit brand name
            console.log('do edit brand request')
            await Axios.patch(API_URL_ADMIN + `/vehicle/motor/brands/edit/${id}`, {brand})
            
            // refresh redux data
            const brands = await Axios.get(API_URL_ADMIN + `/vehicle/motor/brands/next/?id=${brandId-1}&limit=${limit}`)
            const types = await Axios.get(API_URL_ADMIN + `/vehicle/motor/types/next/?id=${typeId-1}&limit=${limit}`)
            dispacth({
                type : GET_MOTOR_BRANDS,
                payload : brands.data
            })
            dispacth({
                type : GET_MOTOR_TYPES,
                payload : types.data
            })
        } catch (err) {
            console.log(err.response ? err.response.data : err)
        } 
    }
}
export const editMotorType = (id, dataId, data, limit) => {
    return async (dispacth) => {
        try {
            // do request to edit brand name
            console.log('do edit type request')
            await Axios.patch(API_URL_ADMIN + `/vehicle/motor/types/edit/${id}`, data)

            // refresh redux data
            const types = await Axios.get(API_URL_ADMIN + `/vehicle/motor/types/next/?id=${dataId-1}&limit=${limit}`)
            dispacth({
                type : GET_MOTOR_TYPES,
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

// add data : BRAND and TYPE
export const addNewCarBrand = (newBrand) => {
    return async (dispacth) => {
        try {
            // request post query to add new car brand
            console.log(newBrand)
            console.log('request add brand')
            const res = await Axios.post(API_URL_ADMIN + `/vehicle/car/brands/add`, newBrand)
            console.log(res)

            // request new data for redux
            console.log('request get data')
            const { data } = await Axios.get(API_URL_ADMIN + `/vehicle/car/brands/?limit=${10}`)
            dispacth({
                type : GET_CAR_BRANDS,
                payload : data
            })
        } catch (err) {
            console.log(err.response ? err.response.data : err)
        } 
    }
}
export const addNewCarType = (newType) => {
    return async (dispacth) => {
        try {
            // request post query to add new car type
            console.log(newType)
            console.log('request add type')
            const res = await Axios.post(API_URL_ADMIN + `/vehicle/car/types/add`, newType)
            console.log(res)

            // request new data for redux
            console.log('request get data')
            const { data } = await Axios.get(API_URL_ADMIN + `/vehicle/car/types/?limit=${10}`)
            dispacth({
                type : GET_CAR_TYPES,
                payload : data
            })
        } catch (err) {
            console.log(err.response ? err.response.data : err)
        } 
    }
}
export const addNewMotorBrand = (newBrand) => {
    return async (dispacth) => {
        try {
            // do post request query to add nex motor brand
            console.log('do request post')
            const response = await Axios.post(API_URL_ADMIN + `/vehicle/motor/brands/add`, newBrand)
            console.log(response)

            // refresh redux
            const { data } = await Axios.get(API_URL_ADMIN + `/vehicle/motor/brands/?limit=${10}`)
            dispacth({
                type : GET_MOTOR_BRANDS,
                payload : data
            })
        } catch (err) {
            console.log(err.response ? err.response.data : err)
        } 
    }
}
export const addNewMotorType = (newType) => {
    return async (dispacth) => {
        try {
            // do post request query to add nex motor brand
            console.log('do request post')
            const response = await Axios.post(API_URL_ADMIN + `/vehicle/motor/types/add`, newType)
            console.log(response)

            // refresh redux
            const { data } = await Axios.get(API_URL_ADMIN + `/vehicle/motor/types/?limit=${10}`)
            dispacth({
                type : GET_MOTOR_TYPES,
                payload : data
            })
        } catch (err) {
            console.log(err.response ? err.response.data : err)
        } 
    }
}

// delete data : BRAND adn Type
export const deleteCarBrand = (id, dataId, limit) => {
    return async (dispacth) => {
        try {
            // request post query to delete car brand
            await Axios.delete(API_URL_ADMIN + `/vehicle/car/brands/delete/${id}`)
        
            // request new data for redux
            console.log('request get data')
            const { data } = await Axios.get(API_URL_ADMIN + `/vehicle/car/brands/next/?id=${dataId-1}&limit=${limit}`)

            // add protection if data its last data in cloumn pagination
            if (data.length === 0) {
                const { data } = await Axios.get(API_URL_ADMIN + `/vehicle/car/brands/prev/?id=${dataId}&limit=${limit}`)
                dispacth({
                    type : GET_CAR_BRANDS,
                    payload : data
                })
                return
            }
            dispacth({
                type : GET_CAR_BRANDS,
                payload : data
            })
        } catch (err) {
            console.log(err.response ? err.response.data : err)
        }  
    }
}
export const deleteCarType = (id, dataId, limit) => {
    return async (dispacth) => {
        try {
            // request post query to delete car brand
            await Axios.delete(API_URL_ADMIN + `/vehicle/car/types/delete/${id}`)
        
            // request new data for redux
            console.log('request get data')
            const { data } = await Axios.get(API_URL_ADMIN + `/vehicle/car/types/next/?id=${dataId-1}&limit=${limit}`)
            if (data.length === 0) {
                const { data } = await Axios.get(API_URL_ADMIN + `/vehicle/car/types/prev/?id=${dataId}&limit=${limit}`)
                dispacth({
                    type : GET_CAR_TYPES,
                    payload : data
                })
                return
            }
            dispacth({
                type : GET_CAR_TYPES,
                payload : data
            })
        } catch (err) {
            console.log(err.response ? err.response.data : err)
        }  
    }

}
export const deleteMotorBrand = (id, dataId, limit) => {
    return async (dispacth) => {
        try {
            // request post query to delete motor brand
            await Axios.delete(API_URL_ADMIN + `/vehicle/motor/brands/delete/${id}`)
        
            // request new data for redux
            console.log('request get data')
            const { data } = await Axios.get(API_URL_ADMIN + `/vehicle/motor/brands/next/?id=${dataId-1}&limit=${limit}`)

            // add protection if data its last data in cloumn pagination
            if (data.length === 0) {
                const { data } = await Axios.get(API_URL_ADMIN + `/vehicle/motor/brands/prev/?id=${dataId}&limit=${limit}`)
                dispacth({
                    type : GET_MOTOR_BRANDS,
                    payload : data
                })
                return
            }
            dispacth({
                type : GET_MOTOR_BRANDS,
                payload : data
            })
        } catch (err) {
            console.log(err.response ? err.response.data : err)
        }  
    }
}
export const deleteMotorType = (id, dataId, limit) => {
    return async (dispacth) => {
        try {
            // request post query to delete motor type
            await Axios.delete(API_URL_ADMIN + `/vehicle/motor/types/delete/${id}`)
        
            // request new data for redux
            console.log('request get data')
            const { data } = await Axios.get(API_URL_ADMIN + `/vehicle/motor/types/next/?id=${dataId-1}&limit=${limit}`)

            // add protection if data its last data in cloumn pagination
            if (data.length === 0) {
                const { data } = await Axios.get(API_URL_ADMIN + `/vehicle/motor/types/prev/?id=${dataId}&limit=${limit}`)
                dispacth({
                    type : GET_MOTOR_TYPES,
                    payload : data
                })
                return
            }
            dispacth({
                type : GET_MOTOR_TYPES,
                payload : data
            })
        } catch (err) {
            console.log(err.response ? err.response.data : err)
        }  
    }
}