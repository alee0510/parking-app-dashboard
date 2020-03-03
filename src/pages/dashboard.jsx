import React from 'react'
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
import { Route } from 'react-router-dom'

class Dashboard extends React.Component {
    render () {
        const { match } = this.props
        // console.log(match)
        return (
            <div className = 'dashboard-main-container'>
                <AppBar/>
                <Drawer/>
                <AvatarModal/>
                <Route path={match.path} component = {Chart}/>
                <Route path={match.path + '/member'} component = {Member}/>
            </div>
        )
    }
}

export default Dashboard