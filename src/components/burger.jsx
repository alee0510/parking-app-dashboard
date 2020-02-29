import React from 'react'

// import style
import '../styles/burger.scss'

export default function (props) {
    const styles = {
        top : {
            transform : props.open ? 'translateY(10px) translateX(0px) rotate(45deg)' 
            : 'translateY(0px)'
        },
        middle : {
            width : props.open ? '0px' : '70%',
            opacity: props.open ? 0 : 1
        },
        bottom : {
            transform : props.open ? 'translateY(-10px) translateX(0px) rotate(-45deg)' 
            : 'translateY(0px)',
            width : props.open ? '100%' : '85%'
        }
    }
    return (
        <div className = 'burger-main-container'>
            <div id = 'burger-top' style = {styles.top}></div>
            <div id = 'burger-middle' style = {styles.middle}></div>
            <div id = 'burger-bottom' style = {styles.bottom}></div>
        </div>
    )
}