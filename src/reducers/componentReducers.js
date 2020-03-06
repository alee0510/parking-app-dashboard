import { BURGER, AVATAR } from '../helpers/actionTypes'

// create reducers
export const burgerReducer = (state = { burger : false }, action) => {
    switch(action.type) {
        case BURGER : 
            return { burger : action.payload }
        default : return state
    }
}

export const avatarReducer = (state = { avatar : false }, action) => {
    switch(action.type) {
        case AVATAR :
            return { state, avatar : action.payload }
        default : return state
    }
}