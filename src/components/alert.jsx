import React from 'react'
import CancelIcon from '@material-ui/icons/Cancel'

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
                <CancelIcon/>
            </div>
        </div>
    )
}

export default Alert