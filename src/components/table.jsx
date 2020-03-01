import React from 'react'
import { Select, MenuItem, Typography } from '@material-ui/core'

// import icons
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'

// import style
import '../styles/table.scss'

const Table = (props) => {
    const tableHeader = () => {
        return props.headerItems.map((item, index) => <th key = {index}>{item}</th>)
    }

    const pagination = () => {
        return (
            <div className = 'pagination'>
                <Typography style = {{marginRight : 15}}>row per-page</Typography>
                <Select
                    value = {props.rowPerPage}
                    onChange = {(event) => props.handleOption(event.target.value)}
                    disableUnderline = {true}
                >
                    {props.menuItems.map((item, index) => {
                        return <MenuItem key = {index} value={item}>{item}</MenuItem>
                    })}
                </Select>
                <div id = 'previous' onClick = {props.handlePrevious}>
                    <NavigateBeforeIcon/>
                </div>
                <Typography>{props.page} of {props.totalPage}</Typography>
                <div id = 'next' onClick = {props.handleNext}>
                    <NavigateNextIcon/>
                </div>
            </div>
        )
    }

    return (
        <div className = 'table-main-container'>
            <div className = 'table-contents'>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            {tableHeader()}
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.tableBody()}
                    </tbody>
                </table>
            </div>
            {pagination()}
        </div>
    )
}

export default Table