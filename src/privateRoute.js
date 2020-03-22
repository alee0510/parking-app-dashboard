import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'


export const PrivateRoute = ({ component: Component, ...rest }) => {
    const username = useSelector(state => state.user.data.username)
    const role = useSelector(state => state.user.data.id)

    if (username) {
        return (
            <Route {...rest} render = {(props) => {
                if (role === 1) {
                    return <Component {...props}/>
                }                    
                return <Redirect to = '/'/>
            }}/>
        )
    } else {
        return <Redirect to = '/'/>
    }
}