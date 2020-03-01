import React from 'react'
import { connect } from 'react-redux'

// import icons
// import EditIcon from '@material-ui/icons/Edit'
// import DeleteIcon from '@material-ui/icons/Delete'
// import ClearIcon from '@material-ui/icons/Clear'
// import CheckIcon from '@material-ui/icons/Check'

// import action
import { getUserAction, nextUserAction, prevUserAction } from '../actions'

// import components
import TabMenu from '../components/tabs'
import Table from '../components/table'

// import style
import '../styles/member.scss'

class Member extends React.Component {
    state = {
        tabValue : 0,
        page : 1,
        rowPerPage : 10
    }

    componentDidMount () {
        this.props.getUserAction(this.state.rowPerPage)
    }

    handleTab = () => {
        const { tabValue } = this.state
        this.setState({tabValue : tabValue ? 0 : 1})
    }

    handleOption = (value) => {
        this.setState({rowPerPage : value, page : 1})
        this.props.getUserAction(value)
    }

    handleNext = () => {
        const { page, rowPerPage } = this.state
        // check page
        if (page * rowPerPage >= this.props.total) return null
        this.setState({page : page + 1})

        // get last id and do query
        const lastId = this.props.account[rowPerPage - 1].id
        console.log('lastId', lastId)
        this.props.nextUserAction(lastId, rowPerPage)
    }

    handlePrevious = () => {
        const { page, rowPerPage } = this.state
        // check page
        if (page <= 1) return null
        this.setState({page : page - 1})

        // get first id and do query
        const firstId = this.props.account[0].id
        console.log('firstId', firstId)
        this.props.prevUserAction(firstId, rowPerPage)
    }

    tableAccount = () => {
        return this.props.account.map((value, index) => {
            return (
                <tr key = {index}>
                    <td></td>
                    <td>{value.username}</td>
                    <td>{value.email}</td>
                    <td>{value.role === 2 ? 'admin' : 'user'}</td>
                    <td>{value.status === 0 ? 'not-active' : 'active'}</td>
                    <td></td>
                </tr>
            )
        })
    }

    render () {
        const { tabValue, page, rowPerPage } = this.state
        return (
            <div className = 'member-main-container'>
                <h1>Member</h1>
                <div className = 'tab-menu'>
                    <TabMenu value = {tabValue} handleTab = {this.handleTab}/>
                </div>
                <div  className = 'table'>
                    <Table
                        className = 'table'
                        headerItems = {['username', 'email', 'role', 'status']}
                        menuItems = {[10, 15, 20, 25, 30]}
                        optionValue = {rowPerPage}
                        handleOption = {this.handleOption}
                        page = {page}
                        rowPerPage = {rowPerPage}
                        totalPage = {Math.ceil(this.props.total/rowPerPage)}
                        tableBody = {this.tableAccount}
                        handlePrevious = {this.handlePrevious}
                        handleNext = {this.handleNext}
                    />
                </div>
            </div>
        )
    }
}

const mapStore = ({ account, totalAccount }) => {
    return {
        account : account.user,
        total : totalAccount.userTotal
    }
}

const mapDispatch = () => {
    return {
        getUserAction, nextUserAction, prevUserAction
    }
}

export default connect(mapStore, mapDispatch())(Member)