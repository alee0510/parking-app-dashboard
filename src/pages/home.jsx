import React from 'react'

// import components
import Header from '../components/header'
import LoginSlider from '../components/loginSlider'

// import styling
import '../styles/home.scss'

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
        return (
            <div className = 'home-main-container'>
                <Header handleSignIn = {this.handleLoginSlider}/>
                <LoginSlider hide = {loginSlider} handleClose = {this.handleLoginSlider}/>
            </div>
        )
    }
}

export default Home