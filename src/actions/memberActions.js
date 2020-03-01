import { TOTAL_USER, GET_USER, NEXT_USER, PREV_USER } from '../helpers/actionTypes'

export const getTotalUser = (data) => {
    return {
        type : TOTAL_USER,
        payload : data
    }
}

export const getUserAction = (data) => {
    return {
        type : GET_USER,
        payload : data
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