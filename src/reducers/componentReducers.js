import { BURGER, AVATAR, BURGER_PATH } from '../actions'

// create reducers
export const burgerReducer = (state = { burger : false, path : null }, action) => {
    switch(action.type) {
        case BURGER : 
            return { ...state, burger : action.payload }
        case BURGER_PATH :
            return { ...state, path : action.payload}
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