import Axios from 'axios'
import { API_PARKING } from '../helpers/apiUrl'
import { 
    GET_PARKING_AREA, 
    PARKING_START,
    PARKING_PROCCESS,
    PARKING_END
} from '../helpers/actionTypes'

const company_id = parseInt(localStorage.getItem('company_id'))
export const getParkng = () => {
    return async (dispatch) => {
        try {
            const query = company_id !== 1 ? `/?company=${company_id}` : ''
            const { data } = await Axios.get(API_PARKING + '/area/data' + query)
            dispatch({
                type : GET_PARKING_AREA,
                payload : data
            })
        } catch (err) {
            console.log(err.response ? err.response.data : err)
        }
    }
}

export const editParking = (id, inputData) => {
    return async (dispatch) => {
        try {
            // do request edit
            await Axios.patch(API_PARKING + `/area/edit/${id}`, inputData)

            // refresh redux data
            const { data } = await Axios.get(API_PARKING + '/area/data')
            dispatch({
                type : GET_PARKING_AREA,
                payload : data
            })
        } catch (err) {
            console.log(err.response ? err.response.data : err)
        }
    }
}

export const uploadParkingImage = (id, inputData) => {
    return async (dispatch) => {
        try {
            console.log('start upload')
            dispatch({ type : PARKING_START })

            // do request to upload image
            const option = {
                onUploadProgress : (progressEvent) => {
                    // get upload progress
                    dispatch({
                        type : PARKING_PROCCESS,
                        payload : Math.round((progressEvent.loaded * 100)/progressEvent.total)
                    })
                }
            }
            console.log('on proccess')
            await Axios.patch(API_PARKING + `/area/upload/${id}`, inputData, option)

            // refresh redux data
            console.log('refresh data')
            const { data } = await Axios.get(API_PARKING + '/area/data')
            dispatch({
                type : GET_PARKING_AREA,
                payload : data
            })
            dispatch({ type : PARKING_END })
        } catch (err) {
            dispatch({ type : PARKING_END })
            console.log(err.response ? err.response.data : err)
        }
    }
}

export const deleteParking = (id) => {
    return async (dispatch) => {
        try {
            dispatch({ type : PARKING_START })
            // do request delete
            await Axios.delete(API_PARKING + `/area/delete/${id}`)

            // refresh redux data
            const { data } = await Axios.get(API_PARKING + '/area/data')
            dispatch({
                type : GET_PARKING_AREA,
                payload : data
            })
            dispatch({ type : PARKING_END })
        } catch (err) {
            dispatch({ type : PARKING_END })
            console.log(err.response ? err.response.data : err)
        }
    }
}

export const addParking = (inputData) => {
    return async (dispatch) => {
        try {
            dispatch({ type : PARKING_START })
            inputData.company_id = localStorage.getItem('company_id')
            
            // do request post
            await Axios.post(API_PARKING + `/area/add`, inputData)

            // refresh redux data
            const { data } = await Axios.get(API_PARKING + '/area/data')
            dispatch({
                type : GET_PARKING_AREA,
                payload : data
            })
            dispatch({ type : PARKING_END })
        } catch (err) {
            dispatch({ type : PARKING_END })
            console.log(err.response ? err.response.data : err)
        }
    }
}