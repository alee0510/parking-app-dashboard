import Axios from 'axios'
import { API_PARKING } from '../helpers/apiUrl'
import { 
    GET_PARKING_AREA, 
    GET_PARKING_START, 
    GET_PARKING_END, 
    PARKING_UPLOAD 
} from '../actions'

const company_id = parseInt(localStorage.getItem('company_id'))
export const getParkng = () => {
    return async (dispatch) => {
        try {
            dispatch({type : GET_PARKING_START })

            // check query
            const query = company_id !== 1 ? `/?company=${company_id}` : ''
            const { data } = await Axios.get(API_PARKING + '/area/data' + query)
            dispatch({
                type : GET_PARKING_AREA,
                payload : data
            })

            dispatch({type : GET_PARKING_END})
        } catch (err) {
            dispatch({type : GET_PARKING_END})
            console.log(err.response ? err.response.data : err)
        }
    }
}

export const editParking = (id, body) => {
    return async (dispatch) => {
        try {
            dispatch({type : GET_PARKING_START})

            // do request edit
            await Axios.patch(API_PARKING + `/area/edit/${id}`, body)

            // refresh redux data
            const query = company_id !== 1 ? `/?company=${company_id}` : ''
            const { data } = await Axios.get(API_PARKING + '/area/data' + query)
            dispatch({
                type : GET_PARKING_AREA,
                payload : data
            })

            dispatch({type : GET_PARKING_END})
        } catch (err) {
            dispatch({type : GET_PARKING_END})
            console.log(err.response ? err.response.data : err)
        }
    }
}

export const uploadParkingImage = (id, body) => {
    return async (dispatch) => {
        try {
            dispatch({ type : GET_PARKING_START })

            // do request to upload image
            const option = {
                onUploadProgress : (progressEvent) => {
                    // get upload progress
                    dispatch({
                        type : PARKING_UPLOAD,
                        payload : Math.round((progressEvent.loaded * 100)/progressEvent.total)
                    })
                }
            }
            await Axios.patch(API_PARKING + `/area/upload/${id}`, body, option)

            // refresh redux data
            const query = company_id !== 1 ? `/?company=${company_id}` : ''
            const { data } = await Axios.get(API_PARKING + '/area/data' + query)
            dispatch({
                type : GET_PARKING_AREA,
                payload : data
            })
            dispatch({ type : GET_PARKING_END })
        } catch (err) {
            dispatch({ type : GET_PARKING_END })
            console.log(err.response ? err.response.data : err)
        }
    }
}

export const deleteParking = (id) => {
    return async (dispatch) => {
        try {
            dispatch({ type : GET_PARKING_START })

            // do request delete
            await Axios.delete(API_PARKING + `/area/delete/${id}`)

            // refresh redux data
            const query = company_id !== 1 ? `/?company=${company_id}` : ''
            const { data } = await Axios.get(API_PARKING + '/area/data' + query)
            dispatch({
                type : GET_PARKING_AREA,
                payload : data
            })

            dispatch({ type : GET_PARKING_END })
        } catch (err) {
            dispatch({ type : GET_PARKING_END })
            console.log(err.response ? err.response.data : err)
        }
    }
}

export const addParking = (body) => {
    return async (dispatch) => {
        try {
            dispatch({ type : GET_PARKING_START })
            
            // do request post
            body.company_id = company_id
            await Axios.post(API_PARKING + `/area/add`, body)

            // refresh redux data
            const query = company_id !== 1 ? `/?company=${company_id}` : ''
            const { data } = await Axios.get(API_PARKING + '/area/data' + query)
            dispatch({
                type : GET_PARKING_AREA,
                payload : data
            })

            dispatch({ type : GET_PARKING_END })
        } catch (err) {
            dispatch({ type : GET_PARKING_END })
            console.log(err.response ? err.response.data : err)
        }
    }
}