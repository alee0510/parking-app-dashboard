import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

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
import ParkingArea from './parkingArea'
import Partner from './partner'
import Company from './company'

// import style
import '../styles/dashboard.scss'

// import private route
import { PrivateRoute } from '../privateRoute'

class Dashboard extends React.Component {
    render () {
        const { match } = this.props

        // if(!this.props.username) {
        //     return <Redirect to = '/'/>
        // }

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
                <Route path={match.path + '/parking'} component = {ParkingArea}/>
                <Route path={match.path + '/partner'} component = {Partner}/>
                <Route path={match.path + '/company'} component = {Company}/>
            </div>
        )
    }
}

const mapStore = ({ user }) => {
    return {
        username : user.account.username,
        role : user.account.role
    }
}

export default connect(mapStore)(Dashboard)