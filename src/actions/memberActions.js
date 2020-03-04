import Axios from 'axios'
import { TOTAL_USER, GET_USER, NEXT_USER, 
    PREV_USER, GET_PROFILE, NEXT_PROFILE, 
    PREV_PROFILE, GET_ROLES, GET_USER_ERROR,
    GET_PROFILE_ERROR 
} from '../helpers/actionTypes'
import { API_URL_ADMIN } from '../helpers/apiUrl'

// get user account
const role = parseInt(localStorage.getItem('role'))
export const getUserAction = (limit, only = null) => {
    return async (dispatch) => {
        try {
            // do authorization by role id, 1 = superadmin, 2 = admin, & 3 = user
            const query = role === 1 ? `?limit=${limit}&only=${only}` : `?limit=${limit}&only=${3}`
            console.log(query)

            // do request
            let user = await Axios.get(API_URL_ADMIN + `/get/users/${query}`)
            let totalUser = await Axios.get(API_URL_ADMIN + `/get/users/total`)

            // triger reducer
            dispatch({
                type : GET_USER,
                payload : user.data
            })
            dispatch({
                type : TOTAL_USER,
                payload : totalUser.data[0]
            })
        } catch (err) {
            console.log(err.response ? err.response.data : err)
            dispatch({ type : GET_USER_ERROR })
        }
    }
}

export const nextUserAction = (id, limit, only = null) => {
    return async (dispatch) => {
        try {
            // do authorization by role id, 1 = superadmin, 2 = admin, & 3 = user
            const query = role === 1 ? `?id=${id}&limit=${limit}&only=${only}` 
            : `?id=${id}&limit=${limit}&only=${3}`
            console.log(query)

            // do request
            let user = await Axios.get(API_URL_ADMIN + `/get/users/next/${query}`)
            dispatch({
                type : NEXT_USER,
                payload : user.data
            })
        } catch (err) {
            console.log(err.response ? err.response.data : err)
            dispatch({ type : GET_USER_ERROR })
        }
    }
}

export const prevUserAction = (id, limit, only = null) => {
    return async (dispatch) => {
        try {
            // do authorization by role id, 1 = superadmin, 2 = admin, & 3 = user
            const query = role === 1 ? `?id=${id}&limit=${limit}&only=${only}` 
            : `?id=${id}&limit=${limit}&only=${3}`
            console.log(query)

            // do request
            let user = await Axios.get(API_URL_ADMIN + `/get/users/prev/${query}`)
            dispatch({
                type : PREV_USER,
                payload : user.data
            })
        } catch (err) {
            console.log(err.response ? err.response.data : err)
            dispatch({ type : GET_USER_ERROR })
        }
    }
}

// get user profile
export const getProfileAction = (limit, only = null) => {
    return async (dispatch) => {
        try {
            console.log(limit)
            // do authorization by role id, 1 = superadmin, 2 = admin, & 3 = user
            const query = role === 1 ? `?limit=${limit}&only=${only}` : `?limit=${limit}&only=${3}`
            console.log(query)
            
            // do request
            let profile = await Axios.get(API_URL_ADMIN + `/get/users/profile/${query}`)
            dispatch({
                type : GET_PROFILE,
                payload : profile.data
            })
        } catch (err) {
            console.log(err.response ? err.response.data : err)
            dispatch({ type : GET_PROFILE_ERROR })
        }
    }
}

export const nextProfileAction = (id, limit, only = null) => {
    return async (dispatch) => {
        try {
            // do authorization by role id, 1 = superadmin, 2 = admin, & 3 = user
            const query = role === 1 ? `?id=${id}&limit=${limit}&only=${only}` 
            : `?id=${id}&limit=${limit}&only=${3}`
            console.log(query)
            
            // do request
            let profile = await Axios.get(API_URL_ADMIN + `/get/users/profile/next/${query}`)
            dispatch({
                type : NEXT_PROFILE,
                payload : profile.data
            })
        } catch (err) {
            console.log(err.response ? err.response.data : err)
            dispatch({ type : GET_PROFILE_ERROR })
        }
    }
}

export const prevProfileAction = (id, limit, only = null) => {
    return async (dispatch) => {
        try {
            // do authorization by role id, 1 = superadmin, 2 = admin, & 3 = user
            const query = role === 1 ? `?id=${id}&limit=${limit}&only=${only}` 
            : `?id=${id}&limit=${limit}&only=${3}`
            console.log(query)

            // do request
            let profile = await Axios.get(API_URL_ADMIN + `/get/users/profile/prev/${query}`)
            dispatch({
                type : PREV_PROFILE,
                payload : profile.data
            })
        } catch (err) {
            console.log(err.response ? err.response.data : err)
            dispatch({ type : GET_PROFILE_ERROR })
        }
    }
}

// get user roles
export const getUserRoles = () => {
    return async (dispatch) => {
        try {
            let { data } = await Axios.get(API_URL_ADMIN + '/get/roles')
            dispatch({
                type : GET_ROLES,
                payload : data
            })
        } catch (err) {
            console.log(err.response ? err.response.data : err)
        }
    }
}