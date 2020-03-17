import Axios from 'axios'
import { 
    TOTAL_USER, 
    GET_USER, 
    GET_USER_START,
    GET_USER_END,
    GET_PROFILE,
    GET_PROFILE_START,
    GET_PROFILE_END,
    GET_ROLES,
} from '../helpers/actionTypes'
import { API_URL_ADMIN } from '../helpers/apiUrl'

// get total users data
export const getTotalUser = (role = null) => {
    return async (dispatch) => {
        try {
            // define query
            const query = role ? `?role=${role}` : ``
            const { data } = await Axios.get(API_URL_ADMIN + `/get/users/total/${query}`)
            dispatch({
                type : TOTAL_USER,
                payload : data
            })

        } catch (err) {
            console.log(err.response ? err.response.data : err)
        }
    }
}

// get user account
const userRole = parseInt(localStorage.getItem('role'))
export const getUserAction = (limit, role = null) => {
    return async (dispatch) => {
        try {
            dispatch({ type : GET_USER_START })
            
            // do authorization by role id, 1 = superadmin, 2 = admin, & 3 = user
            const query = userRole === 1 ? `?limit=${limit}&role=${role}` : `?limit=${limit}&role=${3}`

            // do request
            const { data } = await Axios.get(API_URL_ADMIN + `/get/users/${query}`)
            dispatch({
                type : GET_USER,
                payload : data
            })
            dispatch({ type : GET_USER_END })
        } catch (err) {
            dispatch({ type : GET_USER_END })
            console.log(err.response ? err.response.data : err)
        }
    }
}

export const nextUserAction = (id, limit, role = null) => {
    return async (dispatch) => {
        try {
            dispatch({ type : GET_USER_START })

            // do authorization by role id, 1 = superadmin, 2 = admin, & 3 = user
            const query = userRole === 1 ? `?id=${id}&limit=${limit}&role=${role}` 
            : `?id=${id}&limit=${limit}&role=${3}`

            // do request
            const { data } = await Axios.get(API_URL_ADMIN + `/get/users/next/${query}`)
            dispatch({
                type : GET_USER,
                payload : data
            })
            dispatch({ type : GET_USER_END })
        } catch (err) {
            dispatch({ type : GET_USER_END })
            console.log(err.response ? err.response.data : err)
        }
    }
}

export const prevUserAction = (id, limit, role = null) => {
    return async (dispatch) => {
        try {
            dispatch({ type : GET_USER_START })

            // do authorization by role id, 1 = superadmin, 2 = admin, & 3 = user
            const query = userRole === 1 ? `?id=${id}&limit=${limit}&role=${role}` 
            : `?id=${id}&limit=${limit}&role=${3}`

            // do request
            const { data } = await Axios.get(API_URL_ADMIN + `/get/users/prev/${query}`)
            dispatch({
                type : GET_USER,
                payload : data.reverse()
            })
            dispatch({ type : GET_USER_END })
        } catch (err) {
            dispatch({ type : GET_USER_END })
            console.log(err.response ? err.response.data : err)
        }
    }
}

// get user profile
export const getProfileAction = (limit, role = null) => {
    return async (dispatch) => {
        try {
            dispatch({ type : GET_PROFILE_START })

            // do authorization by role id, 1 = superadmin, 2 = admin, & 3 = user
            const query = userRole === 1 ? `?limit=${limit}&role=${role}` : `?limit=${limit}&role=${3}`
            
            // do request
            const { data } = await Axios.get(API_URL_ADMIN + `/get/users/profile/${query}`)
            dispatch({
                type : GET_PROFILE,
                payload : data
            })
            dispatch({ type : GET_PROFILE_END })
        } catch (err) {
            dispatch({ type : GET_PROFILE_END })
            console.log(err.response ? err.response.data : err)
        }
    }
}

export const nextProfileAction = (id, limit, role = null) => {
    return async (dispatch) => {
        try {
            dispatch({ type : GET_PROFILE_START })

            // do authorization by role id, 1 = superadmin, 2 = admin, & 3 = user
            const query = userRole === 1 ? `?id=${id}&limit=${limit}&role=${role}` 
            : `?id=${id}&limit=${limit}&role=${3}`
            
            // do request
            const { data } = await Axios.get(API_URL_ADMIN + `/get/users/profile/next/${query}`)
            dispatch({
                type : GET_PROFILE,
                payload : data
            })
            dispatch({ type : GET_PROFILE_END })
        } catch (err) {
            dispatch({ type : GET_PROFILE_END })
            console.log(err.response ? err.response.data : err)
        }
    }
}

export const prevProfileAction = (id, limit, role = null) => {
    return async (dispatch) => {
        try {
            dispatch({ type : GET_PROFILE_START })

            // do authorization by role id, 1 = superadmin, 2 = admin, & 3 = user
            const query = userRole === 1 ? `?id=${id}&limit=${limit}&role=${role}` 
            : `?id=${id}&limit=${limit}&role=${3}`

            // do request
            const { data } = await Axios.get(API_URL_ADMIN + `/get/users/profile/prev/${query}`)
            dispatch({
                type : GET_PROFILE,
                payload : data.reverse()
            })
            dispatch({ type : GET_PROFILE_END })
        } catch (err) {
            dispatch({ type : GET_PROFILE_END })
            console.log(err.response ? err.response.data : err)
        }
    }
}

// get user roles
export const getUserRoles = () => {
    return async (dispatch) => {
        try {
            const { data } = await Axios.get(API_URL_ADMIN + '/get/roles')
            dispatch({
                type : GET_ROLES,
                payload : data
            })
        } catch (err) {
            console.log(err.response ? err.response.data : err)
        }
    }
}

// edit user role
export const editUserRole = (userId, roleId, dataId, limit, role = null) => {
    return async (dispatch) => {
        try {
            // do request to edit user role by id
            await Axios.patch(API_URL_ADMIN + `/edit/roles/${userId}`, { role : roleId })
            
            // do authorization by role id, 1 = superadmin, 2 = admin, & 3 = user
            const query = `?id=${dataId + 1}&limit=${limit}&role=${role}`
            
            // get profile data
            const { data } = await Axios.get(API_URL_ADMIN + `/get/users/next/${query}`)            
            dispatch({
                type : GET_USER,
                payload : data
            })
        } catch (err) {
            console.log(err.response ? err.response.data : err)
        }
    }
}