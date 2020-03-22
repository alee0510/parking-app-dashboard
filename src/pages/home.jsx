import React from 'react'
import { connect } from 'react-redux'
import Slider from "react-slick"
import { HOME_URL } from '../helpers/apiUrl'

// import components
import Header from '../components/header'
import LoginSlider from '../components/loginSlider'

// import styling
import '../styles/home.scss'
import { Redirect } from 'react-router-dom'

class Home extends React.Component {
    state = {
        loginSlider : true
    }

    handleLoginSlider = () => {
        this.setState({loginSlider : !this.state.loginSlider})
    }

    renderCarousel = () => {
        const data = ['background-car', 'background-car-2', 'background-car-3', 'background-car-4', 'background-car-6']
        return data.map(item => (
            <div style = {{width : '100%', height : '100%'}}>
                <img src = {HOME_URL + '/' + item} style ={{width : '100%', objectFit : 'cover'}}/>
            </div>
        ))

    }

    render () {
        const settings = {
            // dots: true,
            fade: true,
            infinite: true,
            autoplay: true,
            speed: 1000,
            autoplaySpeed: 5000,
            slidesToShow: 1,
            slidesToScroll: 1
        }
        const { loginSlider } = this.state

        if(this.props.data.id) {
            return <Redirect to = '/dashboard'/>
        }

        return (
            <div className = 'home-main-container'>
                <Header handleSignIn = {this.handleLoginSlider}/>
                <LoginSlider hide = {loginSlider} handleClose = {this.handleLoginSlider}/>
                <div className = 'home-carousel'>
                    <Slider {...settings} style = {{height : '100%'}}>
                        {this.renderCarousel()}
                    </Slider>
                </div>
            </div>
        )
    }
}

const mapStore = ({ user }) => {
    return {
        data : user.data
    }
}

export default connect(mapStore)(Home)