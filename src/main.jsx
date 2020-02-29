import React from 'react'
import { Route, Switch } from 'react-router-dom'

// import pages
import Dashboard from './pages/dashboard'

class Main extends React.Component {
    render () {
        return (
            <div className = 'main-container'>
                <Switch>
                    <Route path = '/' component = {Dashboard} exact/>
                </Switch>
            </div>
        )
    }
}

export default Main