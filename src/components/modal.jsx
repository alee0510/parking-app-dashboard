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
                    {props.content}
                </DialogContent>
                <DialogActions>
                    {props.cancelButton ? (
                        <Button
                            onClick={props.handleCancel} 
                            color="secondary" 
                            autoFocus
                        >
                            Cancel
                        </Button>
                    ) : null}
                    <Button 
                        onClick={props.handleClose} 
                        color="primary" 
                        autoFocus
                    >
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}