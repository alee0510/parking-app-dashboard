import React from 'react'
import { connect } from 'react-redux'

// import actions creator
import { getTotalPaymentData, 
    getInitialPaymentData, 
    getNextPaymentData, 
    getPrevPaymentData,
    getPaymentStatus,
    getPaymentTypes } from '../actions'

// import component
import Table from '../components/table'

// import style
import '../styles/payment.scss'

class Payment extends React.Component {
    state = {
        page : 1,
        rowPerPage : 10
    }

    componentDidMount () {
        this.props.getPaymentStatus()
        this.props.getPaymentTypes()
        this.props.getTotalPaymentData()
        this.props.getInitialPaymentData(this.state.rowPerPage)
    }

    handleOption = (value) => {
        this.setState({ rowPerPage : value, page : 1})
        this.props.getInitialPaymentData(value)
    }

    tablePayment = () => {
        return this.props.payment.map(({id, date, type, amount, username, status}) => (
            <tr key = {id}>
                <td></td>
                <td>{date.split('T')[0]}</td>
                <td>{this.props.types[type-1].type}</td>
                <td>{amount}</td>
                <td>{username}</td>
                <td>{this.props.status[status-1].status}</td>
                <td></td>
            </tr>
        ))
    }

    render () {
        const { page, rowPerPage } = this.state
        return (
            <div className = 'payment-main-container'>
                <h1>Payment</h1>
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
            </div>
        )
    }
}

const mapStore = ({ paymentTotalData, paymentReducer, paymentStatus, paymentTypes }) => {
    return {
        total : paymentTotalData.total,
        payment : paymentReducer.data,
        status : paymentStatus.data,
        types : paymentTypes.data
    }
}

const mapDispatch = () => {
    return {
        getTotalPaymentData,
        getInitialPaymentData,
        getNextPaymentData,
        getPrevPaymentData,
        getPaymentStatus,
        getPaymentTypes
    }
}

export default connect(mapStore, mapDispatch())(Payment)