import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Avatar } from '@material-ui/core'

// import icons
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import BusinessIcon from '@material-ui/icons/Business'

// import action
import { avatarAction, logOut } from '../actions'

// import style
import '../styles/avatarModal.scss'
import { API_URL } from '../helpers/apiUrl'

class AvatarModal extends React.Component {
    outsideClick = (e) => {
        const area = ReactDOM.findDOMNode(this.refs.area);
        if (!area.contains(e.target)) {
            console.log('outside')
            this.props.avatarAction(false)
        }
    }

    handleSignOut = () => {
        this.props.logOut()
        this.props.avatarAction(false)
        localStorage.clear()
        document.removeEventListener('click', this.outsideClick)
    }

    render () {
        const styles = {
            container : {
                display : this.props.open ? 'block' : 'none'
            },
            avatar : {
                width : 80,
                height : 80
            },
            icons : {
                width : 20,
                height : 20
            }
        }

        // setup event listener
        if (this.props.open) {
            document.addEventListener('click', this.outsideClick)
        } else {
            document.removeEventListener('click', this.outsideClick)
        }
        
        const { username, email, image} = this.props 
        return (
            <div className = 'avatar-modal-main-container' ref = 'area' style = {styles.container}>
                <div className = 'top'>
                    {
                        image ? <Avatar style = {styles.avatar} src = {API_URL + '/' + image} alt = 'avatar'/>
                        : <Avatar style = {styles.avatar}>{username ? username.charAt(0) :  'U'}</Avatar>
                    }
                    <h1>{username || 'username'}</h1>
                    <h3>{email || 'useremail@gmail.com'}</h3>
                </div>
                <div className = 'bottom'>
                    <Link to = 'company' className = 'item-1' onClick = {this.onClickModalMenu}>
                        <div id = 'busnises-icon'>
                            <BusinessIcon style = {styles.icons}/>
                        </div>
                        <h3>Company</h3>
                    </Link>
                    <div className = 'item-3' onClick = {this.handleSignOut}>
                        <div id = 'exit-icon'>
                            <ExitToAppIcon style = {styles.icons}/>
                        </div>
                        <h3>Sign out</h3>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStore = ({ avatarReducer, user }) => {
    return {
        open : avatarReducer.avatar,
        username : user.account.username,
        email : user.account.email,
        image : user.profile.image
    }
}

const mapDispatch = () => {
    return {
        avatarAction,
        logOut
    }
}

export default connect(mapStore, mapDispatch())(AvatarModal)