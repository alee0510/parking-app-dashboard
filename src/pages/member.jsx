import React from 'react'
import { connect } from 'react-redux'
import { Select, MenuItem, Typography } from '@material-ui/core'

// import icons
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import ClearIcon from '@material-ui/icons/Clear'
import CheckIcon from '@material-ui/icons/Check'

// import action
import { 
    getUserAction, 
    nextUserAction, 
    prevUserAction,
    getProfileAction, 
    nextProfileAction, 
    prevProfileAction,
    getUserRoles, 
    editUserRole, 
    getTotalUser,
    getPathAction
} from '../actions'

// import components
import TabMenu from '../components/tabs'
import Table from '../components/table'

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
        
        const role = parseInt(localStorage.getItem('role'))
        // get total user
        this.props.getTotalUser()

        // get initialize data
        role === 1 ? this.props.getUserAction(this.state.rowPerPage) 
        : this.props.getProfileAction(this.state.rowPerPage, 3)
        
        // get user role
        this.props.getUserRoles()
    }

    handleTab = () => {
        const { tabValue, rowPerPage } = this.state
        this.setState({tabValue : tabValue ? 0 : 1, rowPerPage : 10, page : 1, sortByValue : 0}, 
            () => {
                this.props.getTotalUser()
                this.state.tabValue === 1 ? this.props.getProfileAction(rowPerPage) : this.props.getUserAction(rowPerPage)
            }
        )
    }

    handleOption = (value) => {
        const { sortByValue, tabValue } = this.state
        this.setState({rowPerPage : value, page : 1})

        // refresh user and profile data
        tabValue ? this.props.getProfileAction(value, sortByValue || null) 
        : this.props.getUserAction(value)
    }

    handleNext = () => {
        const { page, rowPerPage, tabValue, sortByValue } = this.state
        const { total, profile, account } = this.props
        // check page
        if (page * rowPerPage >= total) return null
        this.setState({page : page + 1})

        // get last id and do query
        const lastId = tabValue ? profile[rowPerPage - 1].id : account[rowPerPage - 1].id
        // console.log('lastId', lastId)

        // check tab value
        tabValue ? this.props.nextProfileAction(lastId, rowPerPage, sortByValue || null) 
        : this.props.nextUserAction(lastId, rowPerPage)
    }

    handlePrevious = () => {
        const { page, rowPerPage, tabValue, sortByValue } = this.state
        const { profile, account } = this.props
        // check page
        if (page <= 1) return null
        this.setState({page : page - 1})

        // get first id and do query
        const firstId = tabValue ? profile[0].id : account[0].id
        // console.log('firstId', firstId)

        // check tab value
        tabValue ? this.props.prevProfileAction(firstId, rowPerPage, sortByValue || null) 
        : this.props.prevUserAction(firstId, rowPerPage)
    }

    handleSortByChange = (value) => {
        this.setState({sortByValue : value, page : 1})

        // refresh total data
        this.props.getTotalUser(value)

        // refresh user data
        if (this.state.tabValue) { // tabValue !== 0, profile tab
            return this.props.getProfileAction(this.state.rowPerPage, value || null)
        }
        this.props.getUserAction(this.state.rowPerPage, value || null)
    }

    hanldeEditConfirmation = (id) => {
        const dataId = this.props.account[0].id
        this.props.editUserRole(id, this.state.role, dataId, this.state.rowPerPage, this.state.sortByValue || null)
        this.setState({ selectedId : null })
    }

    renderOption = () => {
        return (
            <Select 
                value = {this.state.role} 
                onChange = {(e) => this.setState({role : e.target.value})}
                disableUnderline = {true}
            > {
                this.props.roles.map(item => <MenuItem key = {item.id} value = {item.id}>{item.role}</MenuItem>)
            }
            </Select>
        )
    }

    renderSortByOption = () => {
        return (
            <div className = 'member-sortby-container' 
                style = {{display : parseInt(localStorage.getItem('role')) === 1 ? 'flex' : 'none'}}
            >
                <Typography 
                    style = {{fontSize : 16, fontWeight : 400, marginRight : 15}}
                >
                    Sort by
                </Typography>
                <Select 
                    value = {this.state.sortByValue} 
                    onChange = {(e) => this.handleSortByChange(e.target.value)}
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
                        id === selectedId ? (
                            <td>
                                <div id = 'check-icon' 
                                    style = {{display : hoverId === id ? 'flex' : 'none'}}
                                    onClick = {_ => this.hanldeEditConfirmation(id)}
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
                        ) : (
                            <td>
                                <div id = 'edit-icon' 
                                    style = {{display : hoverId === id ? 'flex' : 'none'}}
                                    onClick = { _ => this.setState({selectedId : id})}
                                >
                                    <EditIcon/>
                                </div>
                                <div id = 'delete-icon' 
                                    style = {{display : hoverId === id ? 'flex' : 'none'}}
                                >
                                    <DeleteIcon/>
                                </div>
                            </td>
                        )
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
                    <TabMenu value = {tabValue} handleTab = {this.handleTab} label1 = 'Account' label2 = 'Profiles'/>
                    {this.renderSortByOption()}
                </div>
                <div  className = 'table'>
                    <Table
                        className = 'table'
                        headerItems = {tabValue ? ['username', 'name', 'birthdate', 'phone', 'address'] 
                        : ['username', 'email', 'role', 'status']}
                        menuItems = {[10, 15, 20, 25, 30]}
                        optionValue = {rowPerPage}
                        handleOption = {this.handleOption}
                        page = {page}
                        rowPerPage = {rowPerPage}
                        totalPage = {Math.ceil(this.props.total/rowPerPage)}
                        tableBody = {tabValue ? this.tableProfile : this.tableAccount}
                        handlePrevious = {this.handlePrevious}
                        handleNext = {this.handleNext}
                    />
                </div>
            </div>
        )
    }
}

const mapStore = ({ account, totalAccount, profile, user, roles }) => {
    return {
        account : account.user,
        total : totalAccount.userTotal,
        profile : profile.profile,
        id : parseInt(user.data.id),
        roles : roles.roles
    }
}

const mapDispatch = () => {
    return {
        getUserAction, 
        nextUserAction, 
        prevUserAction,
        getProfileAction, 
        nextProfileAction, 
        prevProfileAction,
        getUserRoles, 
        editUserRole, 
        getTotalUser,
        getPathAction
    }
}

export default connect(mapStore, mapDispatch())(Member)