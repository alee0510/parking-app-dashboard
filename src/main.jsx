import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { stayLogin } from './actions'

// import pages
import Dashboard from './pages/dashboard'
import Home from './pages/home'
import SignUp from './pages/signup'

class Main extends React.Component {
    componentDidMount () {
        this.props.stayLogin()
    }

    render () {
        return (
            <div className = 'main-container'>
                <Switch>
                    <Route path = '/' component = {Home} exact/>
                    <Route path = '/signup' component = {SignUp}/>
                    <Route path = '/dashboard' component = {Dashboard}/>
                </Switch>
            </div>
        )
    }
}

export default connect(null, { stayLogin })(Main)