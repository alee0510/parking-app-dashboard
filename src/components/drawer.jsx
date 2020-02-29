import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'

// import icons
import BubbleChartIcon from '@material-ui/icons/BubbleChart'
import PeopleIcon from '@material-ui/icons/People'
import DriveEtaIcon from '@material-ui/icons/DriveEta'
import GradeIcon from '@material-ui/icons/Grade'
import HistoryIcon from '@material-ui/icons/History'
import SettingsIcon from '@material-ui/icons/Settings'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'

// import action
import { burgerAction } from '../actions'

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

        return (
            <div className = 'drawer-main-container' ref = 'area' style = {styles.container}>
                <div className = 'top' style = {styles.menus}>
                    <div id = 'item-1' style = {styles.items}>
                        <div id = 'dash-icon'>
                            <BubbleChartIcon/>
                        </div>
                        <h1 style = {styles.text}>Dashboard</h1>
                    </div>
                    <div id = 'item-1' style = {styles.items}>
                        <div id = 'people-icon'>
                            <PeopleIcon/>
                        </div>
                        <h1 style = {styles.text}>Members</h1>
                    </div>
                    <div id = 'item-1' style = {styles.items}>
                        <div id = 'car-icon'>
                            <DriveEtaIcon/>
                        </div>
                        <h1 style = {styles.text}>Vehicles</h1>
                    </div>
                    <div id = 'item-1' style = {styles.items}>
                        <div id = 'rating-icon'>
                            <GradeIcon/>
                        </div>
                        <h1 style = {styles.text}>Ratings</h1>
                    </div>
                    <div id = 'item-1' style = {styles.items}>
                        <div id = 'history-icon'>
                            <HistoryIcon/>
                        </div>
                        <h1 style = {styles.text}>History</h1>
                    </div>
                    <div id = 'item-1' style = {styles.items}>
                        <div id = 'setting-icon'>
                            <SettingsIcon/>
                        </div>
                        <h1 style = {styles.text}>Setting</h1>
                    </div>
                </div>
                <div className = 'bottom' style = {styles.bottom}>
                    <div id = 'last-item'>
                        <div id = 'exit-icon'>
                            <ExitToAppIcon/>
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

export default connect(mapStore, { burgerAction })(Drawer)