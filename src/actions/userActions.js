import Axios from 'axios' 
import { API_URL_USER } from '../helpers/apiUrl'
import { LOG_IN, LOG_OUT, STAY_LOGIN, LOG_IN_ERROR } from '../helpers/actionTypes'

export const loginAction = (body) => {
    return async (dispatch) => {
        try {
            let { data, headers } = await Axios.post(API_URL_USER + '/login', body)
            console.log(headers['auth-token'])
            localStorage.setItem('id', data.id)
            localStorage.setItem('role', data.role)
            localStorage.setItem('token', headers['auth-token'])
            dispatch({
                type : LOG_IN,
                payload : data
            })
        } catch (err) {
            console.log(err.response.data || err)
            localStorage.removeItem('token')
            dispatch({
                type : LOG_IN_ERROR,
                payload : err.response.data || err
            })
        }
    }
}

export const logOutAction = () => {
    return {
        type : LOG_OUT
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
        console.log(err.response.data || err)
    }
}

export const stayLogin = () => {
    return async (dispatch) => {
        try {
            const token = localStorage.getItem('token')
            if (!token) throw('invalid token.')

            // request stay login
            const options = { headers : {'Auth-Token' : token} }
            let { data } = Axios.post(API_URL_USER + '/user/staylogin', {}, options)
            dispatch({
                type : STAY_LOGIN,
                payload : data
            })
        } catch (err) {
            console.log(err.response.data || err)
        }
    }
}