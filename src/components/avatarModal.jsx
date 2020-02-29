import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Avatar } from '@material-ui/core'

// import icons
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import FaceIcon from '@material-ui/icons/Face';
import ExitToAppIcon from '@material-ui/icons/ExitToApp'

// import action
import { avatarAction } from '../actions'

// import style
import '../styles/avatarModal.scss'

class AvatarModal extends React.Component {
    outsideClick = (e) => {
        const area = ReactDOM.findDOMNode(this.refs.area);
        if (!area.contains(e.target)) {
            console.log('outside')
            this.props.avatarAction(false)
        }
    }

    render () {
        const styles = {
            container : {
                display : this.props.open ? 'block' : 'none'
            },
            avatar : {
                width : 50,
                height : 50
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
        
        return (
            <div className = 'avatar-modal-main-container' ref = 'area' style = {styles.container}>
                <div className = 'top'>
                    <Avatar style = {styles.avatar}>u</Avatar>
                    <h1>username</h1>
                    <h3>useremail@gmail.com</h3>
                </div>
                <div className = 'bottom'>
                    <div className = 'item-1'>
                        <div id = 'people-icon'>
                            <AccountBoxIcon style = {styles.icons}/>
                        </div>
                        <h3>My account</h3>
                    </div>
                    <div className = 'item-2'>
                        <div id = 'face-icon'>
                            <FaceIcon style = {styles.icons}/>
                        </div>
                        <h3>My profile</h3>
                    </div>
                    <div className = 'item-3'>
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

const mapStore = ({ avatarReducer }) => {
    return {
        open : avatarReducer.avatar
    }
}

export default connect(mapStore, { avatarAction })(AvatarModal)