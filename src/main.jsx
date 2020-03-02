import React from 'react'
import { Route, Switch } from 'react-router-dom'

// import pages
import Dashboard from './pages/dashboard'
import Home from './pages/home'

class Main extends React.Component {
    render () {
        return (
            <div className = 'main-container'>
                <Switch>
                    <Route path = '/' component = {Home} exact/>
                    <Route path = '/dashboard' component = {Dashboard}/>
                </Switch>
            </div>
        )
    }
}

export default Main