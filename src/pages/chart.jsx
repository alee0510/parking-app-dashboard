import React from 'react'
import { Redirect } from 'react-router-dom'

// import style
import '../styles/chart.scss'

class Chart extends React.Component {
    render () {
        if (!localStorage.getItem('token')) return <Redirect to = '/'/>
        return (
            <div className = 'chart-main-container'>
                Chart
            </div>
        )
    }
}

export default Chart