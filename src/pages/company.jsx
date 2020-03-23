import React from 'react'
import { connect } from 'react-redux'
import { IconButton } from '@material-ui/core'

// import action creators
import { getCompany, addCompany, editCompany } from '../actions'

// import icons
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit'
import BusinessIcon from '@material-ui/icons/Business'
import PhoneIcon from '@material-ui/icons/Phone'
import MailIcon from '@material-ui/icons/Mail'
import CheckIcon from '@material-ui/icons/Check'

// import styles
import '../styles/company.scss'

class Company extends React.Component {
    state = {
        edit : false,
        name : '',
        email : '',
        phone : ''
    }

    componentDidMount () {
        this.props.getCompany()
    }

    onButtonEdit = () => {
        const { edit } = this.state
        if(!edit){
            // initialize state
            return this.setState({
                edit : true,
                name : this.props.data.company,
                email : this.props.data.email,
                phone : this.props.data.phone
            })
        }
        // do request edit
        this.props.editCompany(this.props.data.id, {
            company : this.state.name,
            email : this.state.email,
            phone : this.state.phone
        })
        this.setState({
            edit : false,
            name : '',
            email : '',
            phone : ''
        })
    }

    onButtonAdd = () => {
        console.log('add comany')
        this.props.addCompany({
            company : this.state.name,
            email : this.state.email,
            phone : this.state.phone
        })
    }

    render () {
        const { edit, name, email, phone } = this.state
        const { data } = this.props
        return (
            <div className = 'setting-main-container'>
                <div className = 'setting-sub-container'>
                    <div className = 'tab-menu'>
                        <h1>Company Profile</h1>
                        {
                            this.props.data.length !== 2 ?
                            <IconButton onClick = {this.onButtonEdit}>
                                {
                                    edit ? <CheckIcon/> : <EditIcon/>
                                }
                            </IconButton>
                            :
                            <IconButton onClick = {this.onButtonAdd}>
                                <AddIcon/>
                            </IconButton>
                        }
                    </div>
                    <div className = 'content-conatiner'>
                        <div className = 'content'>
                            <h1>name</h1>
                            <div id = 'content-box'>
                                <div id = 'icon'>
                                        <BusinessIcon style = {{ fontSize : 28}}/>
                                </div>
                                <input 
                                    value = {edit || data.length === 0 ? ? name : data.company}
                                    type = 'text' 
                                    placeholder = 'company name' 
                                    disabled = {data.length === 0 ? false : !edit}
                                    onChange = {e => this.setState({ name : e.target.value})}
                                    autoFocus
                                />
                            </div>
                        </div>
                        <div className = 'content'>
                            <h1>email</h1>
                            <div id = 'content-box'>
                                <div id = 'icon'>
                                        <MailIcon style = {{ fontSize : 28}}/>
                                </div>
                                <input
                                    value = {edit || data.length === 0 ? ? email : data.email} 
                                    type = 'text' 
                                    placeholder = 'company email' 
                                    disabled = {data.length === 0 ? false : !edit}
                                    onChange = {e => this.setState({ email : e.target.value})}
                                />
                            </div>
                        </div>
                        <div className = 'content'>
                            <h1>phone</h1>
                            <div id = 'content-box'>
                                <div id = 'icon'>
                                        <PhoneIcon style = {{ fontSize : 28}}/>
                                </div>
                                <input
                                    value = {edit || data.length === 0 ? phone : data.phone} 
                                    type = 'text' 
                                    placeholder = '021' 
                                    disabled = {data.length === 0 ? false : !edit}
                                    onChange = {e => this.setState({ phone : e.target.value})}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStore = ({ company }) => {
    return {
        data : company.data
    }
}

const mapDispatch = () => {
    return {
        getCompany,
        addCompany,
        editCompany
    }
}

export default connect(mapStore, mapDispatch())(Company)