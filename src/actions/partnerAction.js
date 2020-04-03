import Axios from 'axios'
import { API_PARTNER } from '../helpers/apiUrl'
import { 
    GET_PARTNER, 
    GET_PARTNER_START, 
    GET_PARTNER_END 
} from './types'

export const getPartner = () => {
    return async (dispatch) => {
        try {
            dispatch({type : GET_PARTNER_START})

            // do query
            const { data } = await Axios.get(API_PARTNER + '/data')
            dispatch({
                type : GET_PARTNER,
                payload : data
            })

            dispatch({type : GET_PARTNER_END})
        } catch (err) {
            dispatch({type : GET_PARTNER_END})
            console.log(err.response ? err.response.data : err)
        }
    }
}

export const deletePartner = (id) => {
    return async (dispatch) => {
        try {
            dispatch({type : GET_PARTNER_START})

            // request delete
            console.log('request delete')
            const response = await Axios.delete(API_PARTNER + `/delete/${id}`)
            console.log(response)
            
            // refresh redux
            console.log('refresh data')
            const { data } = await Axios.get(API_PARTNER + '/data')
            dispatch({
                type : GET_PARTNER,
                payload : data
            })

            dispatch({type : GET_PARTNER_END})
        } catch (err) {
            dispatch({type : GET_PARTNER_END})
            console.log(err.response ? err.response.data : err)
        }
    }

}