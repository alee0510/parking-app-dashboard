import React from 'react'
import { 
    Button, 
    Dialog, 
    DialogActions,
    DialogContent,
    DialogTitle
} from '@material-ui/core'

export default function AlertDialog (props) {
    return (
        <div>
            <Dialog
                open = {props.open}
                onClose = {props.onClose}
            >
                <DialogTitle >{props.title}</DialogTitle>
                <DialogContent>
                    {props.children}
                </DialogContent>
                <DialogActions>
                    {props.cancelButton ? (
                        <Button
                            onClick={props.handleCancel} 
                            color="secondary" 
                        >
                            Cancel
                        </Button>
                    ) : null}
                    <Button 
                        onClick={props.handleOk} 
                        color="primary" 
                    >
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}