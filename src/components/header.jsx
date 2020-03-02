import React from 'react'

// import style
import '../styles/header.scss'

const Header = (props) => {
    return (
        <div className = 'header-main-container'>
            <div className = 'logo'>
                <img 
                    src = 'http://localhost:3000/images/logo_text_01.svg' 
                    alt = 'logo' id = 'img-logo'
                />
            </div>
            <div className = 'action-button'>
                <div id = 'download-app'>
                    <h1>Download App</h1>
                </div>
                <div id = 'divider'></div>
                <div id = 'sign-in' onClick = {props.handleSignIn}>
                    <h1>Sign-In</h1>
                </div>
            </div>
        </div>
    )
}

export default Header