import React from 'react'
import { IconButton } from '@material-ui/core'

// import icons
import EditIcon from '@material-ui/icons/Edit'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import CheckIcon from '@material-ui/icons/Check'
import VisibilityIcon from '@material-ui/icons/Visibility'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'

// import components
import TabMenu from '../components/tabs'

// import styles
import '../styles/setting.scss'

class Setting extends React.Component {
    state = {
        tabValue : 0,
        editUsername : false,
        editPassword : false,
        visible : false
    }

    handleTab = () => {
        const { tabValue } = this.state
        this.setState({ tabValue : tabValue ? 0 : 1})
    }

    handleEditUsername = () => {
        this.setState({editUsername : false})
    }

    handleEditPass = () => {
        this.setState({ editPassword : false })
    }

    render () {
        const { tabValue, editUsername, editPassword, visible } = this.state
        const styles = {
            content : {
                display : editPassword ? 'block' : 'none'
            },
            account : {
                display : !tabValue ? 'block' : 'none'
            },
            profile : {
                display : tabValue ? 'block' : 'none'
            }
        }
        return (
            <div className = 'setting-main-container'>
                <div className = 'setting-sub-container'>
                    <h1>Setting</h1>
                    <div className = 'tab-menu'>
                        <TabMenu 
                            value = {tabValue} 
                            handleTab = {this.handleTab} 
                            label1 = 'Account' 
                            label2 = 'Profiles'
                        />
                        <IconButton style ={{display : tabValue ? 'block' : 'none'}}>
                            <EditIcon/>
                        </IconButton>
                    </div>
                    <div className = 'account' style = {styles.account}>
                        <div className = 'content'>
                            <h1>username</h1>
                            <div id = 'content-box'>
                                <div id = 'icon'>
                                    <AccountCircleIcon style = {{ fontSize : 28}}/>
                                </div>
                                <input 
                                    type = 'text' 
                                    placeholder = 'username' 
                                    disabled = {!editUsername}
                                    autoFocus
                                />
                                {
                                    editUsername ? (
                                        <IconButton onClick = {this.handleEditUsername}>
                                            <CheckIcon/>
                                        </IconButton>
                                    ) : (
                                        <IconButton onClick = { _ => this.setState({ editUsername : true })}>
                                            <EditIcon/>
                                        </IconButton>
                                    )
                                }
                            </div>
                        </div>
                        <div className = 'content'>
                            <h1 style ={{marginTop : 20}}>password</h1>
                            <div id = 'content-box' onClick = { _ => this.setState({ visible : !visible })}>
                                <div id = 'icon'>
                                    {visible ? <VisibilityIcon style = {{fontSize : 28}}/>: <VisibilityOffIcon style = {{ fontSize : 28}}/>}
                                </div>
                                <input 
                                    type = 'text' 
                                    placeholder = 'password'
                                    disabled = {!editPassword}
                                />
                                {
                                    editPassword ? (
                                        <IconButton onClick = {this.handleEditPass}>
                                            <CheckIcon/>
                                        </IconButton>
                                    ) : (
                                        <IconButton onClick = { _ => this.setState({ editPassword : true })}>
                                            <EditIcon/>
                                        </IconButton>
                                    )
                                }
                            </div>
                        </div>
                        <div className = 'content' style = {styles.content}>
                            <h1>new password</h1>
                            <div id = 'content-box' onClick = { _ => this.setState({ visible : !visible })}>
                                <div id = 'icon'>
                                    {visible ? <VisibilityIcon style = {{fontSize : 28}}/>: <VisibilityOffIcon style = {{ fontSize : 28}}/>}
                                </div>
                                <input type = 'text' placeholder = 'password'/>
                            </div>
                        </div>
                        <div className = 'content' style = {styles.content}>
                            <h1>confrim new password</h1>
                            <div id = 'content-box' onClick = { _ => this.setState({ visible : !visible })}>
                                <div id = 'icon'>
                                    {visible ? <VisibilityIcon style = {{fontSize : 28}}/>: <VisibilityOffIcon style = {{ fontSize : 28}}/>}
                                </div>
                                <input type = 'text' placeholder = 'password'/>
                            </div>
                        </div>
                    </div>
                    <div className ='profile' style = {styles.profile}>
                        <div className = 'content'>
                            <h1>Company name</h1>
                            <div id = 'content-box' onClick = { _ => this.setState({ visible : !visible })}>
                                <div id = 'icon'>
                                    {visible ? <VisibilityIcon style = {{fontSize : 28}}/>: <VisibilityOffIcon style = {{ fontSize : 28}}/>}
                                </div>
                                <input type = 'text' placeholder = 'password'/>
                            </div>
                        </div> 
                        <div className = 'content'>
                            <h1>Phone</h1>
                            <div id = 'content-box' onClick = { _ => this.setState({ visible : !visible })}>
                                <div id = 'icon'>
                                    {visible ? <VisibilityIcon style = {{fontSize : 28}}/>: <VisibilityOffIcon style = {{ fontSize : 28}}/>}
                                </div>
                                <input type = 'text' placeholder = 'password'/>
                            </div>
                        </div> 
                        <div className = 'content'>
                            <h1>Email</h1>
                            <div id = 'content-box' onClick = { _ => this.setState({ visible : !visible })}>
                                <div id = 'icon'>
                                    {visible ? <VisibilityIcon style = {{fontSize : 28}}/>: <VisibilityOffIcon style = {{ fontSize : 28}}/>}
                                </div>
                                <input type = 'text' placeholder = 'password'/>
                            </div>
                        </div> 
                    </div>
                </div>
            </div>
        )
    }
}

export default Setting