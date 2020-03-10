import React from 'react'
import { Route } from 'react-router-dom'

// import components
import AppBar from '../components/appbar'
import Drawer from '../components/drawer'
import AvatarModal from '../components/avatarModal'

// import pages
import Chart from './chart'
import Member from './member'
import Vehicles from './vehicles'
import Rating from './rating'
import History from './history'
import Payment from './payment'

// import style
import '../styles/dashboard.scss'

class Dashboard extends React.Component {
    render () {
        const { match } = this.props
        return (
            <div className = 'dashboard-main-container'>
                <AppBar/>
                <Drawer/>
                <AvatarModal/>
                <Route path={match.path + '/feed'} component = {Chart}/>
                <Route path={match.path + '/member'} component = {Member}/>
                <Route path={match.path + '/vehicles'} component = {Vehicles}/>
                <Route path={match.path + '/rating'} component = {Rating}/>
                <Route path={match.path + '/history'} component = {History}/>
                <Route path={match.path + '/payment'} component = {Payment}/>
            </div>
        )
    }
}

export default Dashboard