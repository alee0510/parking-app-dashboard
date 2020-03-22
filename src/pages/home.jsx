import React from 'react'
import Slider from "react-slick"
import { HOME_URL } from '../helpers/apiUrl'

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

    renderCarousel = () => {
        const data = ['image_edit_02.jpg', 'image_edit_01.jpg', 'image_edit_03.jpg', 'image_edit_04.jpg', 'image_edit_05.jpg']
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

export default Home