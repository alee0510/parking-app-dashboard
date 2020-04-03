import Axios from 'axios' 
import { API_USER } from '../helpers/apiUrl'
import {
    LOG_IN,
    LOG_OUT,
    STAY_LOG_IN,
    ERROR_LOG_IN,
    CLEAR_ERROR_LOG_IN
} from '../actions'

export const login = (body) => {
    return async (dispatch) => {
        try {
            // check user input
            if (!body.username || !body.password) throw new Error ('please fill username and password.')

            // do request
            const { data, headers } = await Axios.post(API_USER + '/login', body)
            const profile = await Axios.get(API_USER + `/profile/${data.id}`)
            console.log(headers['auth-token'])
            dispatch({
                type : LOG_IN,
                payload : {
                    account : data,
                    profile : profile.data
                }
            })
            
            // set local storage
            localStorage.setItem('id', data.id)
            localStorage.setItem('role', data.role)
            localStorage.setItem('token', headers['auth-token'])
            localStorage.setItem('company_id', data.company_id)

        } catch (err) {
            dispatch({
                type : ERROR_LOG_IN,
                payload : err.response ? err.response.data : err
            })
            console.log(err.response ? err.response.data : err)
        }
    }
}

export const clearError = () => {
    return { type : CLEAR_ERROR_LOG_IN }
}

export const logOut = () => {
    return { type : LOG_OUT }
}

export const stayLogin = () => {
    return async (dispatch) => {
        try {
            const token = localStorage.getItem('token')
            if (!token) throw new Error ('invalid token.')
            
            // request stay login
            const options = { headers : {'Auth-Token' : token} }
            let user = await Axios.get(API_USER + '/staylogin', options)

            // get user profile
            let profile = await Axios.get(API_USER + `/profile/${user.data.id}`)
            dispatch({
                type : STAY_LOG_IN,
                payload : {
                    account : user.data,
                    profile : profile.data
                }
            })
        } catch (err) {
            console.log('stay login running . . .')
            console.log(err.response ? err.response.data : err)
            dispatch({type : LOG_OUT})
        }
    }
}