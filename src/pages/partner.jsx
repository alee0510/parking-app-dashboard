import React from 'react'
import { connect } from 'react-redux'

// import actions creator
import { getPartner, getPathAction } from '../actions'

// import components
import Table from '../components/table'

// import style
import '../styles/partner.scss'

class Partner extends React.Component {
    componentDidMount () {
        this.props.getPathAction('partner')
        this.props.getPartner()
    }

    tablePartner = () => {
        return this.props.partner.map(({id, company, phone, email, admin}) => (
            <tr key = {id}>
                <td></td>
                <td>{company}</td>
                <td>{phone}</td>
                <td>{email}</td>
                <td>{admin}</td>
                <td></td>
            </tr>
        ))
    }
    
    render () {
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
        getPathAction
    }
}

export default connect(mapStore, mapDispatch())(Partner)