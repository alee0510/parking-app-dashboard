import React from 'react'
import { connect } from 'react-redux'
import { Avatar } from '@material-ui/core'

// import icons
import Brightness4Icon from '@material-ui/icons/Brightness4'
import NotificationsIcon from '@material-ui/icons/Notifications'

// import style
import '../styles/appbar.scss'

// import components
import Burger from './burger'
import Search from './search'

// import action
import { burgerAction, avatarAction } from '../actions'
import { API_URL } from '../helpers/apiUrl'

class AppBar extends React.Component {
    burgerClick = () => {
        const burger = this.props.burger || false
        this.props.burgerAction(!burger)
        console.log('burger-click')
    }

    avatarClick = () => {
        const avatar = this.props.avatar || false
        this.props.avatarAction(!avatar)
        console.log('avatar-click')
    }

    render () {
        // console.log(window.location.pathname.substr(1))
        const { username, image } = this.props
        console.log('username', username)
        return (
            <div className = 'appbar-main-container'>
                <div 
                    className = 'appbar-burger' 
                    onClick = {this.burgerClick}>
                    <Burger open = {this.props.burger}/>
                </div>
                <div className = 'appbar-contents'>
                    <div id = 'appbar-left'>
                        <h1 style = {{textTransform : 'capitalize'}}>
                            {window.location.pathname.split('/')[2]}
                        </h1>
                    </div>
                    <div id = 'appbar-middle'>
                        <Search/>
                    </div>
                    <div id = 'appbar-right'>
                        <div id = 'theme'>
                            <Brightness4Icon style = {{ height : 22, width : 22}}/> 
                        </div>
                        <div id = 'notification'>
                            <NotificationsIcon style = {{ height : 22, width : 22}}/>
                        </div>
                        <div id = 'avatar' onClick = {this.avatarClick}>
                            {
                                image ? <Avatar src = {API_URL + '/' + image} style = {{ height : 35, width : 35}}/>
                                :
                                <Avatar style = {{ height : 35, width : 35}}>{username ? username.charAt(0) : 'U'}</Avatar>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStore = ({ burgerReducer, avatarReducer, userProfile, user }) => {
    return {
        burger : burgerReducer.burger,
        avatar : avatarReducer.avatar,
        image : userProfile.data.image,
        username : user.data.username
    }
}

const mapDispatch = () => {
    return {
        burgerAction, avatarAction
    }
}

export default connect(mapStore, mapDispatch())(AppBar)