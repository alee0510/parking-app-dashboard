import Axios from 'axios'
import {
    GET_HISTORY,
    GET_HISTORY_ACTIVE,
    GET_HISTORY_TOTAL,
    GET_HISTORY_ACTIVE_TOTAL,
    GET_HISTORY_START,
    GET_HISTORY_END
} from '../actions'
import { API_HISTORY } from '../helpers/apiUrl'

const company_id = parseInt(localStorage.getItem('company_id'))
export const getTotalHistory = () => {
    return async (dispatch) => {
        try {
            // check query
            const query = company_id === 1 ? '' : `/?company=${company_id}`

            // do query
            const { data } = await Axios.get(API_HISTORY + `/data/total` + query)
            dispatch({
                type : GET_HISTORY_TOTAL,
                payload : data[0]
            })
        } catch (err) {
            console.log(err.response ? err.response.data : err)
        }
    }
}

export const getHistory = (limit = null, next = null, prev = null) => {
    return async (dispatch) => {
        try {
            dispatch({type : GET_HISTORY_START })
            
            // check query
            const queryLimit = limit ? prev||next ? `&limit=${limit}` : `?limit=${limit}` : ''
            const queryNext = next ? `?next=${next}` : ''
            const queryPrev = prev ? `?prev=${prev}` : ''
            const queryCompany = company_id === 1 ? '' : `&company=${company_id}`
            const url = `/data/${queryNext}${queryPrev}${queryLimit}${queryCompany}`

            // do query
            const { data } = await Axios.get(API_HISTORY + url)
            dispatch({
                type : GET_HISTORY,
                payload : prev ? data.reverse() : data
            })
            
            dispatch({type : GET_HISTORY_END})
        } catch (err) {
            dispatch({type : GET_HISTORY_END})
            console.log(err.response ? err.response.data : err)
        }
    }
}

export const getTotalHistoryActive = () => {
    return async (dispatch) => {
        try {
            // check query
            const query = company_id === 1 ? '' : `/?company=${company_id}`

            // do query
            const { data } = await Axios.get(API_HISTORY + `/active/total` + query)
            dispatch({
                type : GET_HISTORY_ACTIVE_TOTAL,
                payload : data[0]
            })
        } catch (err) {
            console.log(err.response ? err.response.data : err)
        }
    }
}

export const getHistoryActive = (limit = null, next = null, prev = null) => {
    return async (dispatch) => {
        try {
            dispatch({type : GET_HISTORY_START })
            
            // check query
            const queryLimit = limit ? prev||next ? `&limit=${limit}` : `?limit=${limit}` : ''
            const queryNext = next ? `?next=${next}` : ''
            const queryPrev = prev ? `?prev=${prev}` : ''
            const queryCompany = company_id === 1 ? '' : `&company=${company_id}`
            const url = `/active/${queryNext}${queryPrev}${queryLimit}${queryCompany}`

            // do query
            const { data } = await Axios.get(API_HISTORY + url)
            dispatch({
                type : GET_HISTORY_ACTIVE,
                payload : prev ? data.reverse() : data
            })
            
            dispatch({type : GET_HISTORY_END})
        } catch (err) {
            dispatch({type : GET_HISTORY_END})
            console.log(err.response ? err.response.data : err)
        }
    }
}