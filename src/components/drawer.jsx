import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

// import icons
import BubbleChartIcon from '@material-ui/icons/BubbleChart'
import PeopleIcon from '@material-ui/icons/People'
import DriveEtaIcon from '@material-ui/icons/DriveEta'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import GradeIcon from '@material-ui/icons/Grade'
import HistoryIcon from '@material-ui/icons/History'
import ReceiptIcon from '@material-ui/icons/Receipt'
// import SettingsIcon from '@material-ui/icons/Settings'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import WorkIcon from '@material-ui/icons/Work'

// import action
import { burgerAction, logOutAction, getPathAction } from '../actions'

// import style
import '../styles/drawer.scss'

class Drawer extends React.Component {    
    outsideClick = (e) => {
        const area = ReactDOM.findDOMNode(this.refs.area);
        if (!area.contains(e.target)) {
            console.log('outside')
            this.props.burgerAction(false)
        }
    }

    componentWillUnmount () {
        document.removeEventListener('click', this.outsideClick)
    }

    handleExit = () => {
        this.props.logOutAction()
        this.props.getPathAction(null)
    }
    
    render () {
        const styles = {
            container : {
                width : this.props.open ? 300 : 50
            },
            text : {
                display : this.props.open ? 'block' : 'none'
            },
            menus : {
                padding : this.props.open ? '0px 20px' : 0
            },
            bottom : {
                padding : this.props.open ? 20 : 0
            },
            items : {
                marginTop : this.props.open ? 20 : 0
            }
        }
        
        // setup event listener
        if (this.props.open) {
            document.addEventListener('click', this.outsideClick)
        } else {
            document.removeEventListener('click', this.outsideClick)
        }

        // const pathname = window.location.pathname.split('/')[2]
        // console.log(window.location)
        const { pathname } = this.props
        return (
            <div className = 'drawer-main-container' ref = 'area' style = {styles.container}>
                <div className = 'top' style = {styles.menus}>
                    <Link to = 'feed' id = 'item-1' style = {styles.items}>
                        <div id = 'dash-icon'>
                            <BubbleChartIcon style = {{color : pathname === 'feed' ? '#4f6bed' : '#11100f'}}/>
                        </div>
                        <h1 style = {styles.text}>Dashboard</h1>
                    </Link>
                    <Link to = 'member' id = 'item-1' style = {styles.items}>
                        <div id = 'people-icon'>
                            <PeopleIcon style = {{color : pathname === 'member' ? '#4f6bed' : '#11100f'}}/>
                        </div>
                        <h1 style = {styles.text}>Members</h1>
                    </Link>
                    {
                        this.props.role === 1 ?
                        <Link to = 'vehicles' id = 'item-1' style = {styles.items}>
                            <div id = 'car-icon'>
                                <DriveEtaIcon style = {{color : pathname === 'vehicles' ? '#4f6bed' : '#11100f'}}/>
                            </div>
                            <h1 style = {styles.text}>Vehicles</h1>
                        </Link>
                        : null
                    }
                    <Link to = 'parking' id = 'item-1' style = {styles.items}>
                        <div id = 'location-icon'>
                            <LocationOnIcon style = {{color : pathname === 'parking' ? '#4f6bed' : '#11100f'}}/>
                        </div>
                        <h1 style = {styles.text}>Parking Area</h1>
                    </Link>
                    {
                        this.props.role === 1 ?
                        <Link to = 'partner' id = 'item-1' style = {styles.items}>
                            <div id = 'partner-icon'>
                                <WorkIcon style = {{color : pathname === 'partner' ? '#4f6bed' : '#11100f'}}/>
                            </div>
                            <h1 style = {styles.text}>Partners</h1>
                        </Link>
                        : null
                    }
                    <Link to = 'rating' id = 'item-1' style = {styles.items}>
                        <div id = 'rating-icon'>
                            <GradeIcon style = {{color : pathname === 'rating' ? '#4f6bed' : '#11100f'}}/>
                        </div>
                        <h1 style = {styles.text}>Ratings</h1>
                    </Link>
                    <Link to = 'history' id = 'item-1' style = {styles.items}>
                        <div id = 'history-icon'>
                            <HistoryIcon style = {{color : pathname === 'history' ? '#4f6bed' : '#11100f'}}/>
                        </div>
                        <h1 style = {styles.text}>History</h1>
                    </Link>
                    {
                        this.props.role === 1 ?
                        <Link to = 'payment' id = 'item-1' style = {styles.items}>
                            <div id = 'payment-icon'>
                                <ReceiptIcon style = {{color : pathname === 'payment' ? '#4f6bed' : '#11100f'}}/>
                            </div>
                            <h1 style = {styles.text}>Payment</h1>
                        </Link>
                        :null
                    }
                </div>
                <div className = 'bottom' style = {styles.bottom}>
                    <div id = 'last-item' onClick = {this.handleExit}>
                        <div id = 'exit-icon'>
                            <ExitToAppIcon />
                        </div>
                        <h1 style = {styles.text}>Exit</h1>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStore = ({ burgerReducer, user }) => {
    return {
        open : burgerReducer.burger,
        pathname : burgerReducer.path,
        role : user.data.role
    }
}

const mapDispatch = () => {
    return {
        burgerAction, 
        logOutAction,
        getPathAction
    }
}

export default connect(mapStore, mapDispatch())(Drawer)