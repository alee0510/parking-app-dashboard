import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'

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

// import action
import { burgerAction, logOutAction } from '../actions'

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

    handleExit = () => {
        this.props.logOutAction()
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

        const pathname = window.location.pathname.split('/')[2]
        return (
            <div className = 'drawer-main-container' ref = 'area' style = {styles.container}>
                <div className = 'top' style = {styles.menus}>
                    <div id = 'item-1' style = {styles.items}>
                        <div id = 'dash-icon'>
                            <BubbleChartIcon style = {{color : pathname === 'feed' ? '#4f6bed' : '#11100f'}}/>
                        </div>
                        <h1 style = {styles.text}>Dashboard</h1>
                    </div>
                    <div id = 'item-1' style = {styles.items}>
                        <div id = 'people-icon'>
                            <PeopleIcon style = {{color : pathname === 'member' ? '#4f6bed' : '#11100f'}}/>
                        </div>
                        <h1 style = {styles.text}>Members</h1>
                    </div>
                    <div id = 'item-1' style = {styles.items}>
                        <div id = 'car-icon'>
                            <DriveEtaIcon style = {{color : pathname === 'vehicles' ? '#4f6bed' : '#11100f'}}/>
                        </div>
                        <h1 style = {styles.text}>Vehicles</h1>
                    </div>
                    <div id = 'item-1' style = {styles.items}>
                        <div id = 'location-icon'>
                            <LocationOnIcon style = {{color : pathname === 'parkingarea' ? '#4f6bed' : '#11100f'}}/>
                        </div>
                        <h1 style = {styles.text}>Parking Area</h1>
                    </div>
                    <div id = 'item-1' style = {styles.items}>
                        <div id = 'rating-icon'>
                            <GradeIcon style = {{color : pathname === 'rating' ? '#4f6bed' : '#11100f'}}/>
                        </div>
                        <h1 style = {styles.text}>Ratings</h1>
                    </div>
                    <div id = 'item-1' style = {styles.items}>
                        <div id = 'history-icon'>
                            <HistoryIcon style = {{color : pathname === 'history' ? '#4f6bed' : '#11100f'}}/>
                        </div>
                        <h1 style = {styles.text}>History</h1>
                    </div>
                    <div id = 'item-1' style = {styles.items}>
                        <div id = 'payment-icon'>
                            <ReceiptIcon style = {{color : pathname === 'payment' ? '#4f6bed' : '#11100f'}}/>
                        </div>
                        <h1 style = {styles.text}>Payment</h1>
                    </div>
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

const mapStore = ({ burgerReducer }) => {
    return {
        open : burgerReducer.burger
    }
}

const mapDispatch = () => {
    return {
        burgerAction, logOutAction
    }
}

export default connect(mapStore, mapDispatch())(Drawer)