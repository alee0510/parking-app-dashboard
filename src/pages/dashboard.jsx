import React from 'react'

// import components
import AppBar from '../components/appbar'
import Drawer from '../components/drawer'

// import style
import '../styles/dashboard.scss'

class Dashboard extends React.Component {
    render () {
        return (
            <div className = 'dashboard-main-container'>
                <AppBar/>
                <Drawer/>
            </div>
        )
    }
}

export default Dashboard