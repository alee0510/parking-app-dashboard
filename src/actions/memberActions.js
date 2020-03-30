import Axios from 'axios'
import { API_ADMIN } from '../helpers/apiUrl'
import { 
    GET_MEMBER_ACCOUNT,
    GET_MEMBER_PROFILE, 
    GET_MEMBER_ROLE,
    GET_MEMBER_TOTAL, 
    GET_MEMBER_START,
    GET_MEMBER_END
} from './types'

// get user account
export const getMemberTotal = (role = null) => {
    return async (dispatch) => {
        try {
            // check exception
            const query = role ? `?role=${role}` : ''

            // do query
            const { data } = await Axios.get(API_ADMIN + `/member/total/${query}`)
            dispatch({type : GET_MEMBER_TOTAL, payload : data[0]})
        } catch (err) {
            console.log(err.response ? err.response.data : err)
        }
    }
}

export const getMemberRoles = () => {
    return async (dispatch) => {
        try {
            // do query
            const { data } = await Axios.get(API_ADMIN + `/member/roles`)
            dispatch({type : GET_MEMBER_ROLE, payload : data})
        } catch (err) {
            console.log(err.response ? err.response.data : err)
        }
    }
}

export const getMemberAccount = (limit = null, next = null, prev = null, role = null) => {
    return async (dispatch) => {
        try {
            dispatch({type : GET_MEMBER_START})

            // check query
            const queryLimit = limit ? next || prev ? `&limit=${limit}` : `?limit=${limit}` : ''
            const queryNext = next ? `?next=${next}` : ''
            const queryPrev = prev ? `?prev=${prev}` : ''
            const queryRole = role ? `&role=${role}` : ''
            const url = `/member/account/${queryNext}${queryPrev}${queryLimit}${queryRole}`

            // do query
            const { data } = await Axios.get(API_ADMIN + url )
            dispatch({
                type : GET_MEMBER_ACCOUNT,
                payload : prev ? data.reverse() : data
            })

            dispatch({type : GET_MEMBER_END})
        } catch (err) {
            dispatch({type : GET_MEMBER_END})
            console.log(err.response ? err.response.data : err)
        }
    }
}

export const getMemberProfile = (limit = null, next = null, prev = null, role = null) => {
    return async (dispatch) => {
        try {
            dispatch({type : GET_MEMBER_START})

            // check query
            const queryLimit = limit ? next || prev ? `&limit=${limit}` : `?limit=${limit}` : ''
            const queryNext = next ? `?next=${next}` : ''
            const queryPrev = prev ? `?prev=${prev}` : ''
            const queryRole = role ? `&role=${role}` : ''
            const url = `/member/profiles/${queryNext}${queryPrev}${queryLimit}${queryRole}`

            // do query
            const { data } = await Axios.get(API_ADMIN + url)
            dispatch({
                type : GET_MEMBER_PROFILE,
                payload : prev ? data.reverse() : data
            })

            dispatch({type : GET_MEMBER_END})
        } catch (err) {
            dispatch({type : GET_MEMBER_END})
            console.log(err.response ? err.response.data : err)
        }
    }
}

export const editMemberRole = (id, role, limit, next, sort) => {
    return async (dispatch) => {
        try {
            dispatch({type : GET_MEMBER_START})
            // do request edit
            const response = await Axios.put(API_ADMIN  + `/member/edit/${id}`, {role})
            console.log(response.data)

            // refresh data
            const url = `/member/account/?next=${next+1}&limit=${limit}`
            const sortByRole = sort ? `&role=${sort}` : ''
            const { data } = await Axios.get(API_ADMIN + url + sortByRole)
            dispatch({
                type : GET_MEMBER_ACCOUNT,
                payload : data
            })

            dispatch({type : GET_MEMBER_END })
        } catch (err) {
            dispatch({type : GET_MEMBER_END})
            console.log(err.response ? err.response.data : err)
        }
    }
}