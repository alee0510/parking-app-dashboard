import Axios from 'axios'
import { TOTAL_USER, GET_USER, NEXT_USER, PREV_USER, GET_PROFILE, NEXT_PROFILE, PREV_PROFILE } from '../helpers/actionTypes'
import { API_URL_ADMIN } from '../helpers/apiUrl'

export const getUserAction = (limit) => {
    return async (dispatch) => {
        try {
            let user = await Axios.get(API_URL_ADMIN + `/get/users/?limit=${limit}`)
            let totalUser = await Axios.get(API_URL_ADMIN + `/get/users/total`)
            dispatch({
                type : GET_USER,
                payload : user.data
            })
            dispatch({
                type : TOTAL_USER,
                payload : totalUser.data[0]
            })
        } catch (err) {
            console.log(err.response.data || err)
        }
    }
}

export const nextUserAction = (id, limit) => {
    return async (dispatch) => {
        try {
            let user = await Axios.get(API_URL_ADMIN + `/get/users/next/?id=${id}&limit=${limit}`)
            dispatch({
                type : NEXT_USER,
                payload : user.data
            })
        } catch (err) {
            console.log(err.response.data || err)
        }
    }
}

export const prevUserAction = (id, limit) => {
    return async (dispatch) => {
        try {
            let user = await Axios.get(API_URL_ADMIN + `/get/users/prev/?id=${id}&limit=${limit}`)
            dispatch({
                type : PREV_USER,
                payload : user.data
            })
        } catch (err) {
            console.log(err.response.data || err)
        }
    }
}

export const getProfileAction = (limit) => {
    return async (dispatch) => {
        try {
            let profile = await Axios.get(API_URL_ADMIN + `/get/users/profile/?limit=${limit}`)
            dispatch({
                type : GET_PROFILE,
                payload : profile.data
            })
        } catch (err) {
            console.log(err.response.data || err)
        }
    }
}

export const nextProfileAction = (id, limit) => {
    return async (dispatch) => {
        try {
            let profile = await Axios.get(API_URL_ADMIN + `/get/users/profile/next/?id=${id}&limit=${limit}`)
            dispatch({
                type : NEXT_PROFILE,
                payload : profile.data
            })
        } catch (err) {
            console.log(err.response.data || err)
        }
    }
}

export const prevProfileAction = (id, limit) => {
    return async (dispatch) => {
        try {
            let profile = await Axios.get(API_URL_ADMIN + `/get/users/profile/prev/?id=${id}&limit=${limit}`)
            dispatch({
                type : PREV_PROFILE,
                payload : profile.data
            })
        } catch (err) {
            console.log(err.response.data || err)
        }
    }
}