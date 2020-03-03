import React from 'react'

// import style
import '../styles/alert.scss'

const Alert = (props) =>{
    const style = {
        container : {
            display : props.open ? 'block' : 'none'
        }
    }
    return (
        <div className = 'alert-container' style = {style.container}>
            <div id = 'close-icon'>

            </div>
            <h1>{props.msg}</h1>
        </div>
    )
}

export default Alert