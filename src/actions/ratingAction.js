import Axios from 'axios'
import { API_RATING } from '../helpers/apiUrl'
import { 
    GET_RATING, 
    GET_RATING_TOTAL, 
    GET_RATING_START, 
    GET_RATING_END 
} from '../actions'

const company_id = parseInt(localStorage.getItem('company_id'))
export const getTotalRating = () => {
    return async (dispatch) => {
        try {
            // check query
            const query = company_id === 1 ? '' : `/?company=${company_id}`
            const { data } = await Axios.get(API_RATING + `/total` +  query)
            dispatch({
                type : GET_RATING_TOTAL,
                payload : data[0]
            })
        } catch (err) {
            console.log(err.response ? err.response.data : err)
        }
    }
}

export const getRating = (limit = null, next = null, prev = null) => {
    return async (dispatch) => {
        try {
            dispatch({type : GET_RATING_START})

            // check query
            const queryLimit = limit ? prev||next ? `&limit=${limit}` : `?limit=${limit}` : ''
            const queryNext = next ? `?next=${next}` : ''
            const queryPrev = prev ? `?prev=${prev}` : ''
            const queryCompany = company_id === 1 ? '' : `&company=${company_id}`
            const url = `/data/${queryNext}${queryPrev}${queryLimit}${queryCompany}`
            
            // do query
            const { data } = await Axios.get(API_RATING + url)
            dispatch({
                type : GET_RATING,
                payload : prev ? data.reverse() : data
            })

            dispatch({type : GET_RATING_END})
        } catch (err) {
            dispatch({type : GET_RATING_END})
            console.log(err.response ? err.response.data : err)
        }
    }
}