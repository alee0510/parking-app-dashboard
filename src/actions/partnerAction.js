import Axios from 'axios'
import { API_PARTNER } from '../helpers/apiUrl'
import { GET_PARTNERS } from '../helpers/actionTypes'

export const getPartner = () => {
    return async (dispatch) => {
        try {
            const { data } = await Axios.get(API_PARTNER + '/data')
            dispatch({
                type : GET_PARTNERS,
                payload : data
            })
        } catch (err) {
            console.log(err.response ? err.response.data : err)
        }
    }
}