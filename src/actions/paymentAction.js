import Axios from 'axios'
import { API_PAYMENT } from '../helpers/apiUrl'
import {
    GET_PAYMENT,
    GET_PAYMENT_TOTAL,
    GET_PAYMENT_TYPE,
    GET_PAYMENT_STATUS,
    GET_PAYMENT_START,
    GET_PAYMENT_END
} from '../actions'

// transaction history
export const getTotalPayment = (type = null) => {
    return async (dispatch) => {
        try {
            // check query
            const query = type ? `/?type=${type}` : ''
            const { data } = await Axios.get(API_PAYMENT + `/data/total` + query)
            dispatch({
                type : GET_PAYMENT_TOTAL,
                payload : data[0]
            })
        } catch(err) {
            console.log(err.response ? err.response.data : err)
        }
    }
}

export const getPaymentType = () => {
    return async (dispatch) => {
        try {
            const { data } = await Axios.get(API_PAYMENT + `/data/types`)
            dispatch({
                type : GET_PAYMENT_TYPE,
                payload : data
            })
        } catch(err) {
            console.log(err.response ? err.response.data : err)
        }
    }
}

export const getPaymentStatus = () => {
    return async (dispatch) => {
        try {
            const { data } = await Axios.get(API_PAYMENT + `/data/status`)
            dispatch({
                type : GET_PAYMENT_STATUS,
                payload : data
            })
        } catch(err) {
            console.log(err.response ? err.response.data : err)
        }
    }
}

export const getPayment = (limit = null, next = null, prev = null, type = null) => {
    return async (dispatch) => {
        try {
            dispatch({type : GET_PAYMENT_START})

            // check query
            const queryLimit = limit ? prev||next ? `&limit=${limit}` : `?limit=${limit}` : ''
            const queryNext = next ? `?next=${next}` : ''
            const queryPrev = prev ? `?prev=${prev}` : ''
            const queryType = type ? `&type=${type}` : ''
            const url = `/data/${queryNext}${queryPrev}${queryLimit}${queryType}`

            // do query
            const { data } = await Axios.get(API_PAYMENT + url)
            dispatch({
                type : GET_PAYMENT,
                payload : prev ? data.reverse() : data
            })

            dispatch({type : GET_PAYMENT_END})
        } catch(err) {
            dispatch({type : GET_PAYMENT_END})
            console.log(err.response ? err.response.data : err)
        }
    }
}

export const topUpApproval = (id, next, limit, type) => {
    return async (dispatch) => {
        try {
            dispatch({ type : GET_PAYMENT_START })

            // do request approval
            const response = await Axios.get(API_PAYMENT + `/approval/${id}`)
            console.log(response.data)

            // check query url
            const url = `/data/?next=${next+1}&limit=${limit}`
            const filterBy = type ? `&type=${type}` : ''

            // do query to refresh data
            const { data } = await Axios.get(API_PAYMENT + url + filterBy)
            dispatch({
                type : GET_PAYMENT,
                payload : data
            })

            dispatch({ type : GET_PAYMENT_END })
        } catch(err) {
            dispatch({ type : GET_PAYMENT_END })
            console.log(err.response ? err.response.data : err)
        }
    }
}

export const topUpReject = (id, next, limit, type) => {
    return async (dispatch) => {
        try {
            dispatch({ type : GET_PAYMENT_START })

            // do request approval
            const response = await Axios.get(API_PAYMENT + `/reject/${id}`)
            console.log(response.data)

            // check query url
            const url = `/data/?next=${next+1}&limit=${limit}`
            const filterBy = type ? `&type=${type}` : ''

            // do query to refresh data
            const { data } = await Axios.get(API_PAYMENT + url + filterBy)
            dispatch({
                type : GET_PAYMENT,
                payload : data
            })

            dispatch({ type : GET_PAYMENT_END })
        } catch(err) {
            dispatch({ type : GET_PAYMENT_END })
            console.log(err.response ? err.response.data : err)
        }
    }
}