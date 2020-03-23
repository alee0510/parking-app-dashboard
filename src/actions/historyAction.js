import Axios from 'axios'
import { GET_HISTORY, GET_HISTORY_TOTAL, GET_ON_ACTIVE_TOTAL, GET_ON_ACTIVE } from '../helpers/actionTypes'
import { API_HISTORY } from '../helpers/apiUrl'

const company_id = parseInt(localStorage.getItem('company_id'))
// history data
export const getHistoryTotal = () => {
    return async (dispatch) => {
        try {
            const company = company_id === 1 ? null : company_id
            const { data } = await Axios.get(API_HISTORY + `/data/total/?company=${company}`)
            dispatch({
                type : GET_HISTORY_TOTAL,
                payload : data[0]
            })
        } catch (err) {
            console.log(err.response ? err.response.data : err)
        }
    }
}
export const getInitialHistory = (limit) => {
    return async (dispatch) => {
        try {
            const company = company_id === 1 ? null : company_id
            const { data } = await Axios.get(API_HISTORY + `/data/?limit=${limit}&company=${company}`)
            dispatch({
                type : GET_HISTORY,
                payload : data
            })
        } catch (err) {
            console.log(err.response ? err.response.data : err)
        }
    }
}
export const getNextHistory = (id, limit) => {
    return async (dispatch) => {
        try {
            const company = company_id === 1 ? null : company_id
            const { data } = await Axios.get(API_HISTORY + `/data/next/?id=${id}&limit=${limit}&company=${company}`)
            dispatch({
                type : GET_HISTORY,
                payload : data
            })
        } catch (err) {
            console.log(err.response ? err.response.data : err)
        }
    } 
}
export const getPrevHistory = (id, limit) => {
    return async (dispatch) => {
        try {
            const company = company_id === 1 ? null : company_id
            const { data } = await Axios.get(API_HISTORY + `/data/prev/?id=${id}&limit=${limit}&company=${company}`)
            dispatch({
                type : GET_HISTORY,
                payload : data.reverse()
            })
        } catch (err) {
            console.log(err.response ? err.response.data : err)
        }
    } 
}

// on-active data
export const getOnActiveTotal = () => {
    return async (dispatch) => {
        try {
            const company = company_id === 1 ? null : company_id
            const { data } = await Axios.get(API_HISTORY + `/data/active/total/?company=${company}`)
            dispatch({
                type : GET_ON_ACTIVE_TOTAL,
                payload : data[0]
            })
        } catch (err) {
            console.log(err.response ? err.response.data : err)
        }
    }
}
export const getInitialOnActive = (limit) => {
    return async (dispatch) => {
        try {
            const company = company_id === 1 ? null : company_id
            const { data } = await Axios.get(API_HISTORY + `/data/active/?limit=${limit}&company=${company}`)
            dispatch({
                type : GET_ON_ACTIVE,
                payload : data
            })
        } catch (err) {
            console.log(err.response ? err.response.data : err)
        }
    }
}
export const getNextOnActive = (id, limit) => {
    return async (dispatch) => {
        try {
            const company = company_id === 1 ? null : company_id
            const { data } = await Axios.get(API_HISTORY + `/data/active/next/?id=${id}&limit=${limit}&company=${company}`)
            dispatch({
                type : GET_ON_ACTIVE,
                payload : data
            })
        } catch (err) {
            console.log(err.response ? err.response.data : err)
        }
    } 
}
export const getPrevOnActive = (id, limit) => {
    return async (dispatch) => {
        try {
            const company = company_id === 1 ? null : company_id
            const { data } = await Axios.get(API_HISTORY + `/data/active/prev/?id=${id}&limit=${limit}&company=${company}`)
            dispatch({
                type : GET_ON_ACTIVE,
                payload : data.reverse()
            })
        } catch (err) {
            console.log(err.response ? err.response.data : err)
        }
    } 
}