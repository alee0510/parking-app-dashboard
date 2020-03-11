import Axios from 'axios'
import { API_PARKING } from '../helpers/apiUrl'
import { GET_PARKING_AREA } from '../helpers/actionTypes'

export const getParkng = () => {
    return async (dispatch) => {
        try {
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