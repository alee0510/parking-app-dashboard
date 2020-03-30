import React from 'react'
import { connect } from 'react-redux'
import { Select, MenuItem, Typography } from '@material-ui/core'

// import icons
import CheckIcon from '@material-ui/icons/Check'
import ClearIcon from '@material-ui/icons/Clear'

// import actions creator
import { 
    getPathAction, 
    getTotalPayment, 
    getPayment, 
    getPaymentType, 
    getPaymentStatus, 
    topUpApproval, 
    topUpReject
} from '../actions'

// import component
import Table from '../components/table'
import Modal from '../components/modal'
import Loading from '../components/loading'

// import style
import '../styles/payment.scss'

class Payment extends React.Component {
    state = {
        page : 1,
        rowPerPage : 10,
        hoverId : null,
        filterBy : 0,
        confirmId : null,
        rejectId : null
    }

    componentDidMount () {
        this.props.getPathAction('payment')
        
        this.props.getPaymentType()
        this.props.getPaymentStatus()
        this.props.getTotalPayment()
        this.props.getPayment(this.state.rowPerPage)
    }

    handleOption = (value) => {
        this.setState({ rowPerPage : value, page : 1})
        this.props.getPayment(value)
    }

    onButtonOk = () => {
        const { confirmId, rejectId, rowPerPage, filterBy } = this.state
        const { payment } = this.props
        if(confirmId) {
            this.props.topUpApproval(confirmId, payment[0].id, rowPerPage, filterBy)
            return this.setState({confirmId : null})
        }
        this.props.topUpReject(rejectId, payment[0].id, rowPerPage, filterBy)
        this.setState({rejectId : null})
    }

    onButtonFilter = (value) => {
        this.setState({ filterBy : value, page : 1, rowPerPage : 10 })
        this.props.getPayment(this.state.rowPerPage, null, null, value)
        this.props.getTotalPayment(value)
    }

    onButtonNext = () => {
        const { page, rowPerPage } = this.state

        // check page
        if (page * rowPerPage >= this.props.total) return null
        this.setState({page : page + 1})

        // get last id
        const lastId = this.props.payment[rowPerPage - 1].id

        this.props.getPayment(rowPerPage, lastId)
    }

    onButtonPrev = () => {
        const { page, rowPerPage } = this.state

        // check page
        if (page <= 1) return null
        this.setState({ page : page - 1 })

        // get first id
        const firstId = this.props.payment[0].id

        this.props.getPayment(rowPerPage, null, firstId)
    }

    renderFilterBy = () => {
        return (
            <div className = 'sort-by'>
                <Typography 
                    style = {{fontSize : 16, fontWeight : 400, marginRight : 15}}
                >
                    Filter by
                </Typography>
                <Select 
                    value = {this.state.filterBy} 
                    onChange = {(e) => this.onButtonFilter(e.target.value)}
                    disableUnderline = {true}
                >
                    <MenuItem value = {0}>All</MenuItem>
                    {this.props.types.map(({id, type}) => (<MenuItem key = {id} value = {id}>{type}</MenuItem>))}
                </Select>
            </div>
        )
    }

    tablePayment = () => {
        const { hoverId } = this.state
        return this.props.payment.map(({id, date, type, amount, username, status}) => (
            <tr 
                key = {id}
                onMouseEnter = { _ => this.setState({hoverId : id})}
                onMouseLeave = { _ => this.setState({hoverId : 0})}
            >
                <td></td>
                <td>{date}</td>
                <td>{this.props.types ? this.props.types[type-1].type : null}</td>
                <td>{amount}</td>
                <td>{username}</td>
                <td>{this.props.status ? this.props.status[status-1].status : null}</td>
                {
                    parseInt(type) === 1 & parseInt(status) === 2 ?  
                        <td>
                            <div id = 'check-icon' 
                                style = {{display : hoverId === id ? 'flex' : 'none'}}
                                onClick = { _ => this.setState({confirmId : id}) }
                            >
                                <CheckIcon/>
                            </div>
                            <div id = 'clear-icon' 
                                style = {{display : hoverId === id ? 'flex' : 'none'}}
                                onClick = { _ => this.setState({rejectId : id}) }
                            >
                                <ClearIcon/>
                            </div>
                        </td>
                     : <td></td>
                }
            </tr>
        ))
    }

    render () {
        const { page, rowPerPage, confirmId, rejectId } = this.state
        return (
            <div className = 'payment-main-container'>
                <div className = 'title'>
                    <h1>Payment</h1>
                    {this.renderFilterBy()}
                </div>
                <div className = 'payment-table-container'>
                    <Table
                        className = 'table'
                        headerItems = {['date', 'type', 'amount (Rp)', 'username', 'status']}
                        menuItems = {[10, 15, 20, 25, 30]}
                        optionValue = {rowPerPage}
                        handleOption = {this.handleOption}
                        page = {page}
                        rowPerPage = {rowPerPage}
                        totalPage = {Math.ceil(this.props.total / rowPerPage)}
                        tableBody = {this.tablePayment}
                        handlePrevious = {this.onButtonPrev}
                        handleNext = {this.onButtonNext}
                        addButton = {false}
                        />
                </div>
                <Modal
                    open = {Boolean(confirmId || rejectId)}
                    onClose = { _ => this.setState({ confirmId : null, rejectId : null })}
                    title = {confirmId ? 'Ayo sure to approve this payment ?' : 'Ayo sure to reject this payment ?'}
                    handleOk = { _ => this.onButtonOk()}
                />
                <Loading open = {this.props.loading}/>
            </div>
        )
    }
}

const mapStore = ({ payment }) => {
    return {
        total : payment.total,
        payment : payment.data,
        types : payment.type,
        status : payment.status,
        loading : payment.loading
    }
}

const mapDispatch = () => {
    return {
        getPathAction, 
        getTotalPayment, 
        getPayment, 
        getPaymentType, 
        getPaymentStatus, 
        topUpApproval, 
        topUpReject
    }
}

export default connect(mapStore, mapDispatch())(Payment)