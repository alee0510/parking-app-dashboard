import React from 'react'
import { Button, Dialog, DialogActions,
    DialogContent, DialogContentText, DialogTitle 
} from '@material-ui/core'

export default function AlertDialog (props) {
    return (
        <div>
            <Dialog
                open={props.open}
                onClose={handleClose}
            >
                <DialogTitle id="alert-dialog-title">{"Error"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {props}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={props.handleClose} color="primary" autoFocus>
                    Agree
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}