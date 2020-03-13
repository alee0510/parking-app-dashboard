import React from 'react'
import { connect } from 'react-redux'
import { Select, MenuItem, Typography, CircularProgress } from '@material-ui/core'

// import icons
import CheckIcon from '@material-ui/icons/Check'

// import actions creator
import { 
    getTotalPaymentData, 
    getInitialPaymentData, 
    getNextPaymentData, 
    getPrevPaymentData,
    getPaymentStatus,
    getPaymentTypes,
    getPathAction,
    topUpApprove 
} from '../actions'

// import component
import Table from '../components/table'
import Modal from '../components/modal'

// import style
import '../styles/payment.scss'

class Payment extends React.Component {
    state = {
        page : 1,
        rowPerPage : 10,
        hoverId : null,
        sortBy : 0,
        confirmId : null
    }

    componentDidMount () {
        this.props.getPathAction('payment')
        this.props.getPaymentStatus()
        this.props.getPaymentTypes()
        this.props.getTotalPaymentData()
        this.props.getInitialPaymentData(this.state.rowPerPage)
    }

    handleOption = (value) => {
        this.setState({ rowPerPage : value, page : 1})
        this.props.getInitialPaymentData(value, this.state.sortBy || null)
    }

    handleTopUpApprove = async (id) => {
        await this.props.topUpApprove(id, this.props.payment[0].id, this.state.rowPerPage, this.state.sortBy)
        this.setState({ confirmId : null })
    }

    handleSortByChange = (value) => {
        this.setState({ sortBy : value, page : 1, rowPerPage : 10 })
        this.props.getInitialPaymentData(this.state.rowPerPage, value)
        this.props.getTotalPaymentData(value)
    }

    handleNext = () => {
        const { page, rowPerPage, sortBy } = this.state

        // check page
        if (page * rowPerPage >= this.props.total) return null
        this.setState({page : page + 1})

        // get last id
        const lastId = this.props.payment[rowPerPage - 1].id

        this.props.getNextPaymentData(lastId, rowPerPage, sortBy || null)
    }

    handlePrev = () => {
        const { page, rowPerPage, sortBy } = this.state

        // check page
        if (page <= 1) return null
        this.setState({ page : page - 1 })

        // get first id
        const firstId = this.props.payment[0].id

        this.props.getPrevPaymentData(firstId, rowPerPage, sortBy || null)
    }

    renderSortBy = () => {
        return (
            <div className = 'sort-by'>
                <Typography 
                    style = {{fontSize : 16, fontWeight : 400, marginRight : 15}}
                >
                    Sort by
                </Typography>
                <Select 
                    value = {this.state.sortBy} 
                    onChange = {(e) => this.handleSortByChange(e.target.value)}
                    disableUnderline = {true}
                >
                    <MenuItem value = {0}>All</MenuItem>
                    {this.props.types.map(({id, type}) => (<MenuItem key = {id} value = {id}>{type}</MenuItem>))}
                </Select>
            </div>
        )
    }

    tablePayment = () => {
        const { hoverId, confirmId } = this.state
        return this.props.payment.map(({id, date, type, amount, username, status}) => (
            <tr 
                key = {id}
                onMouseEnter = { _ => this.setState({hoverId : id})}
                onMouseLeave = { _ => this.setState({hoverId : 0})}
            >
                <td></td>
                <td>{date}</td>
                <td>{this.props.types[type-1].type}</td>
                <td>{amount}</td>
                <td>{username}</td>
                <td>{this.props.status[status-1].status}</td>
                {
                    parseInt(type) === 1 & parseInt(status) === 2 ?  
                        <td>
                            <div id = 'check-icon' 
                                style = {{display : hoverId === id ? 'flex' : 'none'}}
                                onClick = { _ => this.setState({confirmId : id}) }
                            >
                                <CheckIcon/>
                            </div>
                        </td>
                     : <td></td>
                }
            </tr>
        ))
    }

    render () {
        const { page, rowPerPage, confirmId } = this.state
        console.log('confirm id', this.state.confirmId)
        return (
            <div className = 'payment-main-container'>
                <div className = 'title'>
                    <h1>Payment</h1>
                    {this.renderSortBy()}
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
                        handlePrevious = {this.handlePrev}
                        handleNext = {this.handleNext}
                        addButton = {false}
                        />
                </div>
                <Modal
                    open = {Boolean(confirmId)}
                    onClose = { _ => this.setState({ confirmId : null })}
                    title = 'Ayo sure to approve this payment ?'
                    handleOk = { _ => this.handleTopUpApprove(confirmId)}
                >
                    {this.props.loading ? (
                        <div style ={{display : 'flex', justifyContent : 'center'}}>
                            <CircularProgress/>
                        </div>
                    ) : null}
                </Modal>
            </div>
        )
    }
}

const mapStore = ({ paymentTotalData, paymentReducer, paymentStatus, paymentTypes }) => {
    return {
        total : paymentTotalData.total,
        payment : paymentReducer.data,
        status : paymentStatus.data,
        types : paymentTypes.data,
        loading : paymentReducer.loading
    }
}

const mapDispatch = () => {
    return {
        getTotalPaymentData,
        getInitialPaymentData,
        getNextPaymentData,
        getPrevPaymentData,
        getPaymentStatus,
        getPaymentTypes,
        getPathAction,
        topUpApprove
    }
}

export default connect(mapStore, mapDispatch())(Payment)