import React from 'react'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'

// import style
import '../styles/alert.scss'

const Alert = (props) =>{
    const style = {
        container : {
            display : props.open ? 'flex' : 'none'
        }
    }

    return (
        <div className = 'alert-container' style = {style.container}>
            <h1>{props.msg}</h1>
            <div id = 'close-icon' onClick = {props.handleClose}>
                <HighlightOffIcon/>
            </div>
        </div>
    )
}

export default Alert