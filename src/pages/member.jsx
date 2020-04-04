import React from 'react'
import { connect } from 'react-redux'
import { Select, MenuItem, Typography } from '@material-ui/core'

// import icons
import EditIcon from '@material-ui/icons/Edit'
import ClearIcon from '@material-ui/icons/Clear'
import CheckIcon from '@material-ui/icons/Check'

// import action
import { 
    getPathAction,
    getMemberTotal, 
    getMemberAccount, 
    getMemberProfile, 
    getMemberRoles, 
    editMemberRole 
} from '../actions'

// import components
import TabMenu from '../components/tabs'
import Table from '../components/table'
import Loading from '../components/loading'

// import style
import '../styles/member.scss'

class Member extends React.Component {
    state = {
        tabValue : 0,
        page : 1,
        rowPerPage : 10,
        selectedId : null,
        hoverId : null,
        role : 1,
        sortByValue : 0
    }

    componentDidMount () {
        this.props.getPathAction('member')
        // get initial data
        this.props.getMemberAccount(this.state.rowPerPage)
        this.props.getMemberTotal()
        this.props.getMemberRoles()
    }

    handleTab = () => {
        const { tabValue } = this.state
        this.setState({
            tabValue : tabValue ? 0 : 1, 
            rowPerPage : 10, 
            page : 1, 
            sortByValue : 0 }, 
            () => {
                this.state.tabValue === 1 ? 
                this.props.getMemberProfile(this.state.rowPerPage) : 
                this.props.getMemberAccount(this.state.rowPerPage)
            }
        )
    }

    handleOption = (value) => {
        // refresh redux data
        const { tabValue } = this.state
        tabValue ? 
        this.props.getMemberProfile(value) : 
        this.props.getMemberAccount(value)
        
        this.setState({rowPerPage : value, page : 1})
    }

    onButtonNext = () => {
        const { page, rowPerPage, tabValue } = this.state
        const { total, profile, account } = this.props
        
        // check page
        if (page * rowPerPage >= total) return null
        this.setState({page : page + 1})

        // get last id and do query
        const lastId = tabValue ? profile[rowPerPage - 1].id : account[rowPerPage - 1].id

        // check tab value
        tabValue ? 
        this.props.getMemberProfile(rowPerPage, lastId) : 
        this.props.getMemberAccount(rowPerPage, lastId)
    }

    onButtonPrev = () => {
        const { page, rowPerPage, tabValue } = this.state
        const { profile, account } = this.props

        // check page
        if (page <= 1) return null
        this.setState({page : page - 1})

        // get first id and do query
        const firstId = tabValue ? profile[0].id : account[0].id

        // check tab value
        tabValue ? 
        this.props.getMemberProfile(rowPerPage, null, firstId) : 
        this.props.getMemberAccount(rowPerPage, null, firstId)
    }

    onButtonFilter = (value) => {
        const { tabValue, rowPerPage } = this.state
        // refresh total data
        this.props.getMemberTotal(value)

        // refresh local state
        this.setState({sortByValue : value, page : 1})

        // refresh member data
        tabValue ?
        this.props.getMemberProfile(rowPerPage, null, null, value) :
        this.props.getMemberAccount(rowPerPage, null, null, value)
    }

    onButtonConfirm = (id) => {
        const { role, rowPerPage, sortByValue } =  this.state
        const dataId = this.props.account[0].id

        // do request edit
        this.props.editMemberRole(id, role, rowPerPage, dataId, sortByValue)

        // refresh local state
        this.setState({ selectedId : null })
    }

    renderOption = () => {
        return (
            <Select 
                value = {this.state.role} 
                onChange = {(e) => this.setState({role : e.target.value})}
                disableUnderline = {true}
            > 
            {
                this.props.roles.map(item => <MenuItem key = {item.id} value = {item.id}>{item.role}</MenuItem>)
            }
            </Select>
        )
    }

    renderFilterBy = () => {
        return (
            <div className = 'member-sortby-container' 
                style = {{display : parseInt(localStorage.getItem('role')) === 1 ? 'flex' : 'none'}}
            >
                <Typography 
                    style = {{fontSize : 16, fontWeight : 400, marginRight : 15}}
                >
                    Filter by
                </Typography>
                <Select 
                    value = {this.state.sortByValue} 
                    onChange = {(e) => this.onButtonFilter(e.target.value)}
                    disableUnderline = {true}
                >
                    <MenuItem value = {0}>All</MenuItem>
                    <MenuItem value = {2}>Admin</MenuItem>
                    <MenuItem value = {3}>User</MenuItem>
                </Select>
            </div>
        )
    }

    tableAccount = () => {
        const { hoverId, selectedId } = this.state
        return this.props.account.map(({id, username, email, role, status}) => {
            const userRole = parseInt(localStorage.getItem('role'))
            return (
                <tr key = {id}
                    onMouseEnter = { _ => this.setState({hoverId : id})}
                    onMouseLeave = { _ => this.setState({hoverId : 0})}
                >
                    <td></td>
                    <td>{username}</td>
                    <td>{email}</td>
                    <td>
                        {
                            id === selectedId ? this.renderOption() : role === 2 ? 'admin' : 'user'
                        }
                    </td>
                    <td>{status === 0 ? 'not-active' : 'active'}</td>
                    {
                        userRole === 1 ? id === selectedId ?
                            <td>
                                <div id = 'check-icon' 
                                    style = {{display : hoverId === id ? 'flex' : 'none'}}
                                    onClick = {_ => this.onButtonConfirm(id)}
                                >
                                    <CheckIcon/>
                                </div>
                                <div id = 'clear-icon' 
                                    style = {{display : hoverId === id ? 'flex' : 'none'}}
                                    onClick = { _ => this.setState({ selectedId : null})}
                                >
                                    <ClearIcon/>
                                </div>
                            </td>
                            :
                            <td>
                                <div id = 'edit-icon' 
                                    style = {{display : hoverId === id ? 'flex' : 'none'}}
                                    onClick = { _ => this.setState({selectedId : id})}
                                >
                                    <EditIcon/>
                                </div>
                            </td>
                            :
                            <td></td>
                    }
                </tr>
            )
        })
    }

    tableProfile = () => {
        return this.props.profile.map(({id, username, name, birthdate, phone, address}) => {
            return (
                <tr key = {id}>
                    <td></td>
                    <td>{username}</td>
                    <td>{name}</td>
                    <td>{birthdate ? birthdate.split('T')[0] : birthdate}</td>
                    <td>{phone}</td>
                    <td>{address}</td>
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
                    <TabMenu 
                        value = {tabValue} 
                        handleTab = {this.handleTab} 
                        label1 = 'Account' 
                        label2 = 'Profiles'
                    />
                    {this.renderFilterBy()}
                </div>
                <div  className = 'table'>
                    <Table
                        className = 'table'
                        headerItems = { 
                            tabValue ? 
                            ['username', 'name', 'birthdate', 'phone', 'address'] 
                            : 
                            ['username', 'email', 'role', 'status'] 
                        }
                        menuItems = {[10, 15, 20, 25, 30]}
                        optionValue = {rowPerPage}
                        handleOption = {this.handleOption}
                        page = {page}
                        rowPerPage = {rowPerPage}
                        totalPage = {Math.ceil(this.props.total/rowPerPage)}
                        tableBody = {tabValue ? this.tableProfile : this.tableAccount}
                        handlePrevious = {this.onButtonPrev}
                        handleNext = {this.onButtonNext}
                    />
                </div>
                <Loading open = {this.props.loading}/>
            </div>
        )
    }
}

const mapStore = ({ member }) => {
    return {
        account : member.account,
        profile : member.profile,
        loading : member.loading,
        total : member.total,
        roles : member.roles
    }
}

const mapDispatch = () => {
    return {
        getPathAction,
        getMemberAccount,
        getMemberProfile,
        getMemberTotal,
        getMemberRoles,
        editMemberRole
    }
}

export default connect(mapStore, mapDispatch())(Member)