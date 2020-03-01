import Axios from 'axios'
import { TOTAL_USER, GET_USER, NEXT_USER, PREV_USER } from '../helpers/actionTypes'
import { API_URL } from '../helpers/apiUrl'

export const getUserAction = (limit) => {
    return async (dispatch) => {
        try {
            let user = await Axios.get(API_URL + `/api/admin/get/users/?limit=${limit}`)
            let totalUser = await Axios.get(API_URL + `/api/admin/get/users/total`)
            dispatch({
                type : GET_USER,
                payload : user.data
            })
            dispatch({
                type : TOTAL_USER,
                payload : totalUser.data[0]
            })
        } catch (err) {
            console.log(err.response || err)
        }
    }
}

export const nextUserAction = (data) => {
    return {
        type : NEXT_USER,
        payload : data
    }
}

export const prevUserAction = (data) => {
    return {
        type : PREV_USER,
        payload : data
    }
}