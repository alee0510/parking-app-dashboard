import React from 'react'
import { Link } from 'react-router-dom'
import { Button, makeStyles } from '@material-ui/core'

// import icons
import ClearIcon from '@material-ui/icons/Clear'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import VisibilityIcon from '@material-ui/icons/Visibility'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'

// import style
import '../styles/loginSlider.scss'

const LoginSlider = (props) => {
    const [visible, setVisible] = React.useState(false)

    const style = {
        container : {
            display : props.hide ? 'block' : 'none'
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
                <div className = 'form-input-password' >
                    <div id = 'visibility-icon' onClick = { _ => setVisible(!visible)}>
                        {visible ? <VisibilityIcon/> : <VisibilityOffIcon/>}
                    </div>
                    <input 
                        type = {visible ? 'text' : 'password'} 
                        refs = 'passsword' 
                        placeholder = 'e.g. xYzs190.'
                    />
                </div>
                <div className = 'button'>
                    <Button id = 'button-sign-in'>Sign-In</Button>
                    <Link to = 'signup' id = 'link-sign-up'>
                        <Button id = 'button-sign-up'>Sign-Up</Button>
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default LoginSlider