import Axios from 'axios'
import { GET_CAR_BRANDS, ADD_CAR_BRAND, EDIT_CAR_BRAND, DELET_CAR_BRAND, GET_CAR_TYPES 
} from '../helpers/actionTypes'
import { API_URL_ADMIN } from '../helpers/apiUrl'

// CAR BRANDS
export const getCarBrands = () => {
    return async (dispacth) => {
        try {
            const { data } = await Axios.get(API_URL_ADMIN + '/vehicle/car/brands')
            dispacth({
                type : GET_CAR_BRANDS,
                payload : data
            })
        } catch (err) {
            console.log(err.response ? err.response.data : err)
        }
    }
}

// CAR TYPES
export const getCarTypes = () => {
    return async (dispacth) => {
        try {
            const { data } = await Axios.get(API_URL_ADMIN + '/vehicle/car/types')
            dispacth({
                type : GET_CAR_TYPES,
                payload : data
            })
        } catch (err) {
            console.log(err.response ? err.response.data : err)
        }
    }
}