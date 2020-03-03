import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { stayLogin } from '../actions'

// import components
import AppBar from '../components/appbar'
import Drawer from '../components/drawer'
import AvatarModal from '../components/avatarModal'

// import pages
import Chart from './chart'
import Member from './member'

// import style
import '../styles/dashboard.scss'

class Dashboard extends React.Component {
    render () {
        const { match } = this.props
        if (!localStorage.getItem('token')) return <Redirect to = '/'/>
        return (
            <div className = 'dashboard-main-container'>
                <AppBar/>
                <Drawer/>
                <AvatarModal/>
                <Route path={match.path + '/feed'} component = {Chart}/>
                <Route path={match.path + '/member'} component = {Member}/>
            </div>
        )
    }
}

export default Dashboard