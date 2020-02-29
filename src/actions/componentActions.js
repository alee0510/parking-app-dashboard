import { BURGER, AVATAR } from '../helpers/actionTypes'

// create action creators
export const burgerAction = (data) => {
    return {
        type : BURGER,
        payload : data
    }
}

export const avatarAction = (data) => {
    return {
        type : AVATAR,
        payload : data
    }
}