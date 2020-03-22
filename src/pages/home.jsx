import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

// import components
import Header from '../components/header'
import LoginSlider from '../components/loginSlider'

// import styling
import '../styles/home.scss'

class Home extends React.Component {
    state = {
        loginSlider : true
    }

    handleLoginSlider = () => {
        this.setState({loginSlider : !this.state.loginSlider})
    }

    render () {
        const { loginSlider } = this.state

        // if user has login
        console.log(this.props.username)
        if(this.props.username) {
            return <Redirect to = '/dashboard/member'/>
        }

        return (
            <div className = 'home-main-container'>
                <Header handleSignIn = {this.handleLoginSlider}/>
                <LoginSlider hide = {loginSlider} handleClose = {this.handleLoginSlider}/>
            </div>
        )
    }
}

const mapStore = ({ user }) => {
    return {
        username : user.data.username
    }
}

export default connect(mapStore)(Home)