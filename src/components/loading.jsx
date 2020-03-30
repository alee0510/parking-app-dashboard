import React from 'react'
import { CircularProgress, Dialog, DialogContent } from '@material-ui/core'

// import styles
import '../styles/loading.scss'

const Loading  = (props) => {
    return(
        <div >
            <Dialog
                open = {props.open}
                className = 'loading-main-container'
            >
                <DialogContent className = 'loading-content'>
                    <CircularProgress/>
                    <h1>Loading . . .</h1>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default Loading