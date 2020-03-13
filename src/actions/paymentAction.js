import Axios from 'axios'
import { GET_TRANSACTION_HISTORY, 
        GET_TRANSACTION_HISTORY_TOTAL,
        GET_TRANSACTION_HISTORY_TYPE, 
        GET_TRANSACTION_HISTORY_STATUS,
        TRANSACTION_PROCESS_START,
        TRANSACTION_PROCESS_END
} from '../helpers/actionTypes'
import { API_PAYMENT } from '../helpers/apiUrl'

// transaction history
export const getTotalPaymentData = (type = null) => {
    return async (dispatch) => {
        try {
            const { data } = await Axios.get(API_PAYMENT + `/data/total/?type=${type}`)
            dispatch({
                type : GET_TRANSACTION_HISTORY_TOTAL,
                payload : data[0]
            })
        } catch(err) {
            console.log(err.response ? err.response.data : err)
        }
    }
}
export const getInitialPaymentData = (limit, type = null) => {
    return async (dispatch) => {
        try {
            const { data } = await Axios.get(API_PAYMENT + `/data/?limit=${limit}&type=${type}`)
            dispatch({
                type : GET_TRANSACTION_HISTORY,
                payload : data
            })
        } catch(err) {
            console.log(err.response ? err.response.data : err)
        }
    }
}
export const getNextPaymentData = (id, limit, type = null) => {
    return async (dispatch) => {
        try {
            const { data } = await Axios.get(API_PAYMENT + `/data/next/?id=${id}&limit=${limit}&type=${type}`)
            dispatch({
                type : GET_TRANSACTION_HISTORY,
                payload : data
            })
        } catch(err) {
            console.log(err.response ? err.response.data : err)
        }
    }
}
export const getPrevPaymentData = (id, limit, type = null) => {
    return async (dispatch) => {
        try {
            const { data } = await Axios.get(API_PAYMENT + `/data/prev/?id=${id}&limit=${limit}&type=${type}`)
            dispatch({
                type : GET_TRANSACTION_HISTORY,
                payload : data.reverse()
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
                type : GET_TRANSACTION_HISTORY_STATUS,
                payload : data
            })
        } catch(err) {
            console.log(err.response ? err.response.data : err)
        }
    }
}
export const getPaymentTypes = () => {
    return async (dispatch) => {
        try {
            const { data } = await Axios.get(API_PAYMENT + `/data/types`)
            dispatch({
                type : GET_TRANSACTION_HISTORY_TYPE,
                payload : data
            })
        } catch(err) {
            console.log(err.response ? err.response.data : err)
        }
    }
}

// top-up approval
export const topUpApprove = (id, dataId, limit, type) => {
    return async (dispatch) => {
        try {
            // do request approval
            console.log('do request approval')
            dispatch({ type : TRANSACTION_PROCESS_START })
            const response = await Axios.get(API_PAYMENT + `/approval/${id}`)
            console.log(response)

            // refresh redux data
            console.log('do refresh data')
            const { data } = await Axios.get(API_PAYMENT + `/data/next/?id=${dataId+1}&limit=${limit}&type=${type}`)
            dispatch({
                type : GET_TRANSACTION_HISTORY,
                payload : data
            })
            dispatch({ type : TRANSACTION_PROCESS_END })
        } catch(err) {
            dispatch({ type : TRANSACTION_PROCESS_END })
            console.log(err.response ? err.response.data : err)
        }
    }

}