import { BURGER, AVATAR, BURGER_PATH } from '../actions'

// create action creators
export const burgerAction = (data) => {
    return {
        type : BURGER,
        payload : data
    }
}

export const getPathAction = (data) => {
    return {
        type : BURGER_PATH,
        payload : data
    }
}

export const avatarAction = (data) => {
    return {
        type : AVATAR,
        payload : data
    }
}