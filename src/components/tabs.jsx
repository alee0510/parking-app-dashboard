import React from 'react'
import { Tabs, Tab, withStyles } from '@material-ui/core'

// styling Tabs and Tab
const StyledTabs = withStyles({
    root: {
        minHeight: 40,
    },
    indicator: {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        '& > div': {
            maxWidth: 70,
            width: '100%',
            backgroundColor: '#635ee7'
        }
    }
})(props => <Tabs {...props} TabIndicatorProps={{ children: <div /> }} />)

const StyledTab = withStyles(theme => ({
    root: {
        textTransform: 'none',
        fontWeight: theme.typography.fontWeightRegular,
        fontSize: theme.typography.pxToRem(15),
        '&:focus': {
            opacity: 1
        }
    }
}))(props => <Tab disableRipple {...props} style = {{minWidth : 80, minHeight : 40}}/>)

const TabMenu = (props) => {
    return (
        <div className = 'tab-main-conatiner'>
            <StyledTabs value = {props.value} onChange = {props.handleTab}>
                <StyledTab label = 'Account'/>
                <StyledTab label = 'Profile'/>
            </StyledTabs>
        </div>
    )
}

export default TabMenu