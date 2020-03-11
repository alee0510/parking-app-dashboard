import React from 'react'
import { connect } from 'react-redux'

// import actions creator
import { getHistoryTotal, 
    getInitialHistory, 
    getNextHistory, 
    getPrevHistory,
    getOnActiveTotal,
    getInitialOnActive,
    getNextOnActive,
    getPrevOnActive,
    getPathAction
} from '../actions'

// import components
import TabMenu from '../components/tabs'
import Table from '../components/table'

// import style
import '../styles/history.scss'

class History extends React.Component {
    state = {
        tabValue : 0,
        page : 1,
        rowPerPage : 10
    }

    componentDidMount () {
        this.props.getPathAction('history')
        this.props.getHistoryTotal()
        this.props.getInitialHistory(this.state.rowPerPage)

    }

    handleTab = () => {
        const { tabValue } = this.state
        this.setState({ tabValue : tabValue ? 0 : 1, rowPerPage : 10, page : 1}, 
            () => {
                if (this.state.tabValue) { // tabValue === 1
                    this.props.getOnActiveTotal()
                    this.props.getInitialOnActive(this.state.rowPerPage)
                    return
                }
                this.props.getHistoryTotal()
                this.props.getInitialHistory(this.state.rowPerPage)
            }
        )
    }

    handleOption = (value) => {
        const { tabValue } = this.state
        this.setState({ rowPerPage : value, page : 1})

        // refresh data by tabValue
        tabValue ? this.props.getInitialOnActive(value) : this.props.getInitialHistory(value)
    }

    handleNext = () => {
        const { page, rowPerPage, tabValue } = this.state
        // check page
        const totalPage = tabValue ? this.props.onActiveTotal : this.props.historyTotal
        if (page * rowPerPage >= totalPage) return null
        this.setState({page : page + 1})

        // get last id and do query
        const lastId = tabValue ? this.props.onActive[rowPerPage - 1].id 
        : this.props.history[rowPerPage - 1].id

        // do request by check tab value
        tabValue ? this.props.getNextOnActive(lastId, rowPerPage) 
        : this.props.getNextHistory(lastId, rowPerPage)
    }

    hanldePrev = () => {
        const { page, rowPerPage, tabValue } = this.state
        // check page
        if (page <= 1) return null
        this.setState({page : page - 1})

        // get first id and do query
        const firstId = tabValue ? this.props.onActive[0].id 
        : this.props.history[0].id

        // do request by check tab value
        tabValue ? this.props.getPrevOnActive(firstId, rowPerPage) 
        : this.props.getPrevHistory(firstId, rowPerPage)
    }

    tableHistory = () => {
        return this.props.history.map(({id, username, enter_date, leave_date, duration, place_name}) => (
            <tr key = {id}>
                <td></td>
                <td>{username}</td>
                <td>{enter_date.split('T')[0]}</td>
                <td>{leave_date.split('T')[0]}</td>
                <td>{duration}</td>
                <td>{place_name}</td>
                <td></td>
            </tr>
        ))
    }

    tableOnActive = () => {
        return this.props.onActive.map(({ id, username, enter_date, status, place_name }) => (
            <tr key = {id}>
                <td></td>
                <td>{username}</td>
                <td>{enter_date.split('T')[0]}</td>
                <td>{status === 0 ? 'leave' : 'active'}</td>
                <td>{place_name}</td>
                <td></td>
            </tr>
        ))
    }

    render () {
        const { tabValue, page, rowPerPage } = this.state
        return (
            <div className = 'history-main-container'>
                <h1>History</h1>
                <div className = 'tab-menu'>
                    <TabMenu
                        value = {tabValue}
                        handleTab = {this.handleTab}
                        label1 = 'Not-Active'
                        label2 = 'Active'
                    />
                </div>
                <div className = 'history-table-container'>
                    <Table
                        className = 'table'
                        headerItems = {tabValue ? ['username', 'enter', 'status', 'place'] 
                        : ['username', 'enter', 'leave', 'duration (minute)', 'place']}
                        menuItems = {[10, 15, 20, 25, 30]}
                        optionValue = {rowPerPage}
                        handleOption = {this.handleOption}
                        page = {page}
                        rowPerPage = {rowPerPage}
                        totalPage = {tabValue ? Math.ceil(this.props.onActiveTotal / rowPerPage) 
                            : Math.ceil(this.props.historyTotal / rowPerPage)}
                        tableBody = {tabValue ? this.tableOnActive : this.tableHistory}
                        handlePrevious = {this.hanldePrev}
                        handleNext = {this.handleNext}
                        addButton = {false}
                    />
                </div>
            </div>
        )
    }
}

const mapStore = ({ historyReducer, historyTotal, onActiveReducer, onActiveTotal }) => {
    return {
        history : historyReducer.data,
        historyTotal : historyTotal.total,
        onActive : onActiveReducer.data,
        onActiveTotal : onActiveTotal.total
    }
}

export const mapDispatch = () => {
    return {
        getHistoryTotal, 
        getInitialHistory, 
        getNextHistory, 
        getPrevHistory,
        getOnActiveTotal,
        getInitialOnActive,
        getNextOnActive,
        getPrevOnActive,
        getPathAction
    }
}

export default connect(mapStore, mapDispatch())(History)