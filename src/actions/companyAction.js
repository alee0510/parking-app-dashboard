import Axios from 'axios'
import { API_PARTNER } from '../helpers/apiUrl'
import { 
    GET_COMPANY,
    GET_COMPANY_START,
    GET_COMPANY_END 
} from './types'

const adminId = parseInt(localStorage.getItem('id'))
export const getCompany = () => {
    return async (dispatch) => {
        try {
            dispatch({type : GET_COMPANY_START})

            // get company profile data
            const { data } = await Axios.get(API_PARTNER + `/data/${adminId}`)
            dispatch({type : GET_COMPANY, payload : data})

            dispatch({type : GET_COMPANY_END})
        } catch (err) {
            dispatch({type : GET_COMPANY_END})
            console.log(err.response ? err.response.data : err)
        }
    }
}

export const editCompany = (id, body) => {
    return async (dispatch) => {
        try {
            dispatch({type : GET_COMPANY_START})

            // edit company profile data
            const response = await Axios.patch(API_PARTNER + `/edit/${id}`, body)
            console.log(response.data)

            
            // refresh redux data
            const { data } = await Axios.get(API_PARTNER + `/data/${adminId}`)
            dispatch({type : GET_COMPANY, payload : data})

            dispatch({type : GET_COMPANY_END})
        } catch (err) {
            dispatch({type : GET_COMPANY_END})
            console.log(err.response ? err.response.data : err)
        }
    }
}

export const addCompany = (body) => {
    return async (dispatch) => {
        try {
            // edit company profile data
            const response = await Axios.post(API_PARTNER + `/add`, body)
            console.log(response.data)
            
            // refresh redux data
            const { data } = await Axios.get(API_PARTNER + `/data/${adminId}`)
            dispatch({type : GET_COMPANY, payload : data})
        } catch (err) {
            console.log(err.response ? err.response.data : err)
        }
    }
}