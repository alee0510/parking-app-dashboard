import { BURGER } from '../helpers/actionTypes'

// create action creators
export const burgerAction = (data) => {
    return {
        type : BURGER,
        payload : data
    }
}