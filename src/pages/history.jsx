import React from 'react'
import { connect } from 'react-redux'

// import actions creator
import {
    getPathAction,
    getTotalHistory,
    getTotalHistoryActive,
    getHistory,
    getHistoryActive
} from '../actions'

// import components
import TabMenu from '../components/tabs'
import Table from '../components/table'
import Loading from '../components/loading'

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
        this.props.getTotalHistory()
        this.props.getHistory(this.state.rowPerPage)

    }

    handleTab = () => {
        const { tabValue } = this.state
        this.setState({ tabValue : tabValue ? 0 : 1, rowPerPage : 10, page : 1}, 
            () => {
                if (this.state.tabValue) { // tabValue === 1
                    this.props.getTotalHistoryActive()
                    this.props.getHistoryActive(this.state.rowPerPage)
                    return
                }
                this.props.getTotalHistory()
                this.props.getHistory(this.state.rowPerPage)
            }
        )
    }

    handleOption = (value) => {
        const { tabValue } = this.state
        this.setState({ rowPerPage : value, page : 1})

        // refresh data by tabValue
        tabValue ?
        this.props.getHistoryActive(value) : 
        this.props.getHistory(value)
    }

    onButtonNext = () => {
        const { page, rowPerPage, tabValue } = this.state
        const { onActiveTotal, historyTotal, onActive, history } = this.props
        
        // check page
        const totalPage = tabValue ? onActiveTotal : historyTotal
        if (page * rowPerPage >= totalPage) return null
        this.setState({page : page + 1})

        // get last id and do query
        const lastId = tabValue ? onActive[rowPerPage - 1].id : history[rowPerPage - 1].id

        // do request by check tab value
        tabValue ? 
        this.props.getHistoryActive(rowPerPage, lastId) : 
        this.props.getHistory(rowPerPage, lastId)
    }

    onButtonPrev = () => {
        const { page, rowPerPage, tabValue } = this.state
        const { onActive, history} = this.props
        // check page
        if (page <= 1) return null
        this.setState({page : page - 1})

        // get first id and do query
        const firstId = tabValue ? onActive[0].id : history[0].id

        // do request by check tab value
        tabValue ? 
        this.props.getHistoryActive(rowPerPage, null, firstId) : 
        this.props.getHistory(rowPerPage, null, firstId)
    }

    tableHistory = () => {
        return this.props.history.map(({id, username, enter_date, leave_date, duration, place_name}) => (
            <tr key = {id}>
                <td></td>
                <td>{username}</td>
                <td>{enter_date}</td>
                <td>{leave_date}</td>
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
                <td>{enter_date}</td>
                <td>{status === 0 ? 'leave' : 'active'}</td>
                <td>{place_name}</td>
                <td></td>
            </tr>
        ))
    }

    render () {
        const { tabValue, page, rowPerPage } = this.state
        const { onActiveTotal, historyTotal } = this.props
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
                        totalPage = {
                            tabValue ? 
                            Math.ceil(onActiveTotal / rowPerPage) : 
                            Math.ceil(historyTotal / rowPerPage)
                        }
                        tableBody = {tabValue ? this.tableOnActive : this.tableHistory}
                        handlePrevious = {this.onButtonPrev}
                        handleNext = {this.onButtonNext}
                        addButton = {false}
                    />
                </div>
                <Loading open = {this.props.loading}/>
            </div>
        )
    }
}

const mapStore = ({ history }) => {
    return {
        history : history.data,
        historyTotal : history.total,
        onActive : history.active,
        onActiveTotal : history.active_total,
        loading : history.loading
    }
}

export const mapDispatch = () => {
    return {
        getPathAction,
        getTotalHistory,
        getTotalHistoryActive,
        getHistory,
        getHistoryActive
    }
}

export default connect(mapStore, mapDispatch())(History)