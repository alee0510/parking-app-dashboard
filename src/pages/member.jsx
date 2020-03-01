import React from 'react'

// import icons
// import EditIcon from '@material-ui/icons/Edit'
// import DeleteIcon from '@material-ui/icons/Delete'
// import ClearIcon from '@material-ui/icons/Clear'
// import CheckIcon from '@material-ui/icons/Check'

// import components
import TabMenu from '../components/tabs'

// import style
import '../styles/member.scss'

class Member extends React.Component {
    render () {
        return (
            <div className = 'member-main-container'>
                <h1>Member</h1>
                <TabMenu/>
            </div>
        )
    }
}

export default Member