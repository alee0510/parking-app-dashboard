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
                maxWidth = 'md'
            >
                <DialogTitle >{props.title}</DialogTitle>
                <DialogContent style = {props.style}>
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