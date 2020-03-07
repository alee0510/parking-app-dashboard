import Axios from 'axios' 
import { API_URL_USER } from '../helpers/apiUrl'
import { LOG_IN, LOG_OUT, STAY_LOGIN, LOG_IN_ERROR, 
    CLEAR_LOGIN_ERROR, GET_USER_PROFILE, GET_PROFILE_ERROR } from '../helpers/actionTypes'

export const loginAction = (body) => {
    return async (dispatch) => {
        try {
            // check user input
            if (!body.username || !body.password) throw new Error ('please fill your username and password')
            
            // do request
            let { data, headers } = await Axios.post(API_URL_USER + '/login', body)
            console.log(headers['auth-token'])
            dispatch({
                type : LOG_IN,
                payload : data
            })
            
            // set local storage
            localStorage.setItem('id', data.id)
            localStorage.setItem('role', data.role)
            localStorage.setItem('token', headers['auth-token'])
        } catch (err) {
            console.log(err.response ? err.response.data : err)
            dispatch({
                type : LOG_IN_ERROR,
                payload : err.response ? err.response.data : err
            })
        }
    }
}

export const logOutAction = () => {
    return (dispatch) => {
        localStorage.clear()
        dispatch({ type : LOG_OUT })
        dispatch({ type : GET_PROFILE_ERROR })
    }
}

export const clearErrorLogin = () => {
    return { type : CLEAR_LOGIN_ERROR }
}

export const stayLogin = () => {
    return async (dispatch) => {
        try {
            const token = localStorage.getItem('token')
            if (!token) throw new Error ('invalid token.')
            
            // request stay login
            const options = { headers : {'Auth-Token' : token} }
            let user = await Axios.get(API_URL_USER + '/staylogin', options)
            dispatch({
                type : STAY_LOGIN,
                payload : user.data
            })
            // get user profile
            let profile = await Axios.get(API_URL_USER + `/profile/${user.data.id}`)
            dispatch({
                type : GET_USER_PROFILE,
                payload : profile.data
            })
        } catch (err) {
            console.log('stay login running . . .')
            console.log(err.response ? err.response.data : err)
            dispatch({ type : LOG_OUT })
            dispatch({ type : GET_PROFILE_ERROR })
        }
    }
}