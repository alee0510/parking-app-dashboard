import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Button } from '@material-ui/core'

// import icons
import ClearIcon from '@material-ui/icons/Clear'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import VisibilityIcon from '@material-ui/icons/Visibility'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'

// import action
import { login, clearError } from '../actions'

// import component
import Alert from '../components/alert'

// import style
import '../styles/loginSlider.scss'

const LoginSlider = (props) => {
    const [visible, setVisible] = React.useState(false)

    // define ref
    let username = React.createRef()
    let password = React.createRef()

    const style = {
        container : {
            right : props.hide ? '-35%' : 0
        }
    }

    const handelSignIn = () => {
        props.login({
            username : username.current.value, 
            password : password.current.value
        })
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
                    <input type = 'text' ref = {username} placeholder = 'e.g. username.'/>
                </div>
                <h1 id = 'password'>Password</h1>
                <div className = 'form-input-password' >
                    <div id = 'visibility-icon' onClick = { _ => setVisible(!visible)}>
                        {visible ? <VisibilityIcon/> : <VisibilityOffIcon/>}
                    </div>
                    <input 
                        type = {visible ? 'text' : 'password'} 
                        ref = {password}
                        placeholder = 'e.g. xYzs190.'
                    />
                </div>
                <Alert open = {props.open} msg = {props.msg} handleClose = {props.clearError}/>
                <div className = 'button'>
                    <Button id = 'button-sign-in' onClick = {handelSignIn}>Log In</Button>
                    <Link to = 'signup' id = 'link-sign-up'>
                        <Button id = 'button-sign-up'>Sign Up</Button>
                    </Link>
                </div>
            </form>
        </div>
    )
}

const mapStore = ({ user }) => {
    return {
        open : user.error,
        msg : user.msg
    }
}

const mapDispatch = () => {
    return {
        login, 
        clearError
    }
}

export default connect(mapStore, mapDispatch())(LoginSlider)