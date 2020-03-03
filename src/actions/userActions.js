import Axios from 'axios' 
import { API_URL_USER } from '../helpers/apiUrl'
import { LOG_IN, LOG_OUT, STAY_LOGIN, LOG_IN_ERROR, CLEAR_ERROR, GET_USER_PROFILE, GET_PROFILE_ERROR } from '../helpers/actionTypes'

export const loginAction = (body) => {
    return async (dispatch) => {
        try {
            // check user input
            if (!body.username || !body.password) throw ('please fill your username and password')
            
            // do request
            let { data, headers } = await Axios.post(API_URL_USER + '/login', body)
            console.log(headers['auth-token'])

            // request user profile
            const options = { headers : {'Auth-Token' : headers['auth-token']} }
            let profile = await Axios.get(API_URL_USER + '/profile', options)
            
            // set local storage
            localStorage.setItem('id', data.id)
            localStorage.setItem('role', data.role)
            localStorage.setItem('token', headers['auth-token'])

            dispatch({
                type : GET_USER_PROFILE,
                payload : profile
            })
            dispatch({
                type : LOG_IN,
                payload : data
            })
        } catch (err) {
            console.log(err.response ? err.response.data : err)
            dispatch({
                type : LOG_IN_ERROR,
                payload : err.response ? err.response.data : err
            })
            dispatch({
                type : GET_PROFILE_ERROR
            })
        }
    }
}

export const logOutAction = () => {
    return (dispatch) => {
        localStorage.clear()
        dispatch({
            type : LOG_OUT
        })
        dispatch({
            type : GET_PROFILE_ERROR
        })
    }
}

export const clearErrorLogin = () => {
    return {
        type : CLEAR_ERROR
    }
}
export const registerAction = async (body) => {
    try {
        // post user account
        let { data } = await Axios.post(API_URL_USER + '/register', {
            username : body.username,
            email : body.email,
            password : body.password
        })

        // initialize user profile
        const profile = {
            id : data.id, 
            name : body.name,
            image : null,
            birthdate : null,
            phone : null,
            address : null
        }

        // post user profile
        let res = await Axios.post(API_URL_USER + '/profile/add', profile)
        if (res) console.log('register success.')

    } catch (err) {
        console.log(err.response ? err.response.data : err)
    }
}

export const stayLogin = () => {
    return async (dispatch) => {
        try {
            const token = localStorage.getItem('token')
            if (!token) throw('invalid token.')

            // request stay login
            const options = { headers : {'Auth-Token' : token} }
            let user = await Axios.get(API_URL_USER + '/staylogin', options)
            let profile = await Axios.get(API_URL_USER + '/profile', options)
            dispatch({
                type : STAY_LOGIN,
                payload : user.data
            })
            dispatch({
                type : GET_USER_PROFILE,
                payload : profile.data
            })
        } catch (err) {
            dispatch({
                type : LOG_OUT
            })
            dispatch({
                type : GET_PROFILE_ERROR
            })
            console.log(err.response ? err.response.data : err)
        }
    }
}