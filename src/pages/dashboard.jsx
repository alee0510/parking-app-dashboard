import React from 'react'

// import components
import AppBar from '../components/appbar'

// import style
import '../styles/dashboard.scss'

class Dashboard extends React.Component {
    render () {
        return (
            <div className = 'dashboard-main-container'>
                <AppBar/>
            </div>
        )
    }
}

export default Dashboard