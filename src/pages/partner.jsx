import React from 'react'
import { connect } from 'react-redux'
import { Dialog, DialogTitle, DialogActions, Button } from '@material-ui/core'

// import icons
import DeleteIcon from '@material-ui/icons/Delete'

// import actions creator
import { getPartner, getPathAction, deletePartner } from '../actions'

// import components
import Table from '../components/table'

// import style
import '../styles/partner.scss'

class Partner extends React.Component {
    state = {
        hoverId : null,
        deleteId : null
    }

    componentDidMount () {
        this.props.getPathAction('partner')
        this.props.getPartner()
    }

    handleDelete = () => {
        this.props.deletePartner(this.state.deleteId)
        this.setState({ deleteId : null })
    }

    tablePartner = () => {
        const { hoverId } = this.state
        return this.props.partner.map(({id, company, phone, email, admin}) => (
            <tr 
                key = {id}
                onMouseEnter = { _ => this.setState({hoverId : id})}
                onMouseLeave = { _ => this.setState({hoverId : 0})}
            >
                <td></td>
                <td>{company}</td>
                <td>{phone}</td>
                <td>{email}</td>
                <td>{admin}</td>
                <td>
                    <div id = 'delete-icon' 
                        style = {{display : hoverId === id ? 'flex' : 'none'}}
                        onClick = { _ => this.setState({ deleteId : id })}
                    >
                        <DeleteIcon/>
                    </div>
                </td>
            </tr>
        ))
    }
    
    render () {
        const { deleteId } = this.state
        return (
            <div className = 'partner-main-container'>
                <h1>Partners</h1>
                <div className = 'partner-table-container'>
                    <Table
                        className = 'table'
                        headerItems = {['company', 'phone', 'email', 'admin']}
                        menuItems = {[0]}
                        optionValue = {0}
                        page = {1}
                        rowPerPage = {0}
                        totalPage = {1}
                        tableBody = {this.tablePartner}
                    />
                </div>
                <Dialog
                    open = { Boolean(deleteId) }
                    onClose = { _ => this.setState({deleteId : null})}
                >
                    <DialogTitle>Delete confirmation</DialogTitle>
                    <DialogActions>
                        <Button
                            onClick = {this.handleDelete}
                            color = 'primary'
                        >
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

const mapStore = ({ partnerReducer }) => {
    return {
        partner : partnerReducer.data
    }
}

const mapDispatch = () => {
    return {
        getPartner,
        getPathAction,
        deletePartner
    }
}

export default connect(mapStore, mapDispatch())(Partner)