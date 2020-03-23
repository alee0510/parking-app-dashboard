import Axios from 'axios'
import { GET_RATING_TOTAL, GET_RATING } from '../helpers/actionTypes'
import { API_RATING } from '../helpers/apiUrl'

const company_id = parseInt(localStorage.getItem('company_id'))
export const getRatingTotal = () => {
    return async (dispatch) => {
        try {
            const company = company_id === 1 ? null : company_id
            const { data } = await Axios.get(API_RATING + `/total/?company=${company}`)
            console.log('rating total')
            // console.log(data)
            dispatch({
                type : GET_RATING_TOTAL,
                payload : data[0]
            })
        } catch (err) {
            console.log(err.response ? err.response.data : err)
        }
    }
}

export const getInitialRating = (limit) => {
    return async (dispatch) => {
        try {
            const company = company_id === 1 ? null : company_id
            const { data } = await Axios.get(API_RATING + `/data/?limit=${limit}&company=${company}`)
            // console.log(data)
            dispatch({
                type : GET_RATING,
                payload : data
            })
        } catch (err) {
            console.log(err.response ? err.response.data : err)
        }
    }
}
export const getNextRating = (id, limit) => {
    return async (dispatch) => {
        try {
            const company = company_id === 1 ? null : company_id
            const { data } = await Axios.get(API_RATING + `/data/next/?id=${id}&limit=${limit}&company=${company}`)
            // console.log(data)
            dispatch({
                type : GET_RATING,
                payload : data
            })
        } catch (err) {
            console.log(err.response ? err.response.data : err)
        }
    }
}
export const getPrevRating = (id, limit) => {
    return async (dispatch) => {
        try {
            const company = company_id === 1 ? null : company_id
            const { data } = await Axios.get(API_RATING + `/data/prev/?id=${id}&limit=${limit}&company=${company}`)
            // console.log(data)
            dispatch({
                type : GET_RATING,
                payload : data.reverse()
            })
        } catch (err) {
            console.log(err.response ? err.response.data : err)
        }
    }
}