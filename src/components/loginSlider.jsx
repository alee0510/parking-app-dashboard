import React from 'react'
import { Button } from '@material-ui/core'

// import icons
import ClearIcon from '@material-ui/icons/Clear'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import VisibilityIcon from '@material-ui/icons/Visibility'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'

// import style
import '../styles/loginSlider.scss'

const LoginSlider = (props) => {
    const style = {
        container : {
            display : props.hide ? 'block' : 'none',
            width : props.hide ? '35%' : 0
        }
    }
    return (
        <div className = 'login-slider-container' style = {style.container}>
            <div className = 'button-close' onClick = {props.handleClose}>
                <ClearIcon style = {{ width : 50, height : 50, color : '#d83b01'}}/>
            </div>
            <form>
                <h1 id = 'title'>Welcome</h1>
                <h1 id = 'username'>Username</h1>
                <div className = 'form-input-username'>
                    <div id = 'account-icon'>
                        <AccountBoxIcon/>
                    </div>
                    <input type = 'text' refs = 'username' placeholder = 'e.g. username.'/>
                </div>
                <h1 id = 'password'>Password</h1>
                <div className = 'form-input-password'>
                    <div id = 'visibility-icon'>
                        <VisibilityIcon/>
                    </div>
                    <input type = 'password' refs = 'passsword' placeholder = 'e.g. xYzs190.'/>
                </div>
                <div className = 'button'>
                    <Button id = 'button-sign-in'>Sign-In</Button>
                    <Button id = 'button-sign-up'>Sign-Up</Button>
                </div>
            </form>
        </div>
    )
}

export default LoginSlider