import React from 'react'

// import components
import Header from '../components/header'
import LoginSlider from '../components/loginSlider'

// import styling
import '../styles/home.scss'
import { Redirect } from 'react-router-dom'

class Home extends React.Component {
    state = {
        loginSlider : false,
        registerSlider : false
    }

    handleLoginSlider = () => {
        this.setState({loginSlider : !this.state.loginSlider})
    }

    render () {
        const { loginSlider, registerSlider } = this.state
        if (localStorage.getItem('role') == 1) return <Redirect to = '/dashboard'/>
        return (
            <div className = 'home-main-container'>
                <Header handleSignIn = {this.handleLoginSlider}/>
                <LoginSlider hide = {loginSlider} handleClose = {this.handleLoginSlider}/>
            </div>
        )
    }
}

export default Home