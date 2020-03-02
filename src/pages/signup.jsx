import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core'

// import icons
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import MailIcon from '@material-ui/icons/Mail'
import VisibilityIcon from '@material-ui/icons/Visibility'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace'

// import style
import '../styles/signup.scss'

class SignUp extends React.Component {
    state = {
        visibility : false
    }
    
    render () {
        const { visibility } = this.state
        return (
            <div className = 'signup-main-container'>
                <div className = 'form-sign-up'>
                    <form>
                        <h1 id = 'title'>Create your Parking Account</h1>
                        <h1 id = 'username'>Username</h1>
                        <div className = 'form-input-username'>
                            <div id = 'account-icon'>
                                <AccountBoxIcon/>
                            </div>
                            <input
                                autoFocus 
                                type = 'text' 
                                refs = 'username' 
                                placeholder = 'e.g. username.'
                            />
                        </div>
                        <h1 id = 'email'>email</h1>
                        <div className = 'form-input-email'>
                            <div id = 'email-icon'>
                                <MailIcon/>
                            </div>
                            <input 
                                type = 'text' 
                                refs = 'email' 
                                placeholder = 'e.g. email@gmail.com.'
                            />
                        </div>
                        <h1 id = 'password'>password</h1>
                        <div className = 'form-input-password'>
                            <div id = 'visibility-icon' onClick = {_ => this.setState({visibility : !visibility})}>
                                {visibility ? <VisibilityIcon/> : <VisibilityOffIcon/>}
                            </div>
                            <input 
                                type = {visibility ? 'text' : 'password'}
                                refs = 'password' 
                                placeholder = 'e.g. x3csve3.'
                            />
                        </div>
                        <div className = 'form-input-confirmpassword'>
                            <div id = 'visibility-icon' onClick = {_ => this.setState({visibility : !visibility})}>
                                {visibility ? <VisibilityIcon/> : <VisibilityOffIcon/>}
                            </div>
                            <input 
                                type = {visibility ? 'text' : 'password'} 
                                refs = 'confrimpassword' 
                                placeholder = 'password confirmation.'
                            />
                        </div>
                        <div className = 'button-container'>
                            <Button id = 'signup-button'>Sign-Up</Button>
                        </div>
                    </form>
                    <div className = 'logo-box'>
                        <img src = 'http://localhost:3000/images/icon_parking.svg' alt = 'logo' id = 'logo'/>
                    </div>
                    <div className = 'signup-footer'>
                        <Link to = '/' id = 'footer' >
                            <KeyboardBackspaceIcon/>
                            <h1>back to home</h1>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default SignUp