import React from 'react'
import { Select, MenuItem, Typography } from '@material-ui/core'

// import icons
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import AddIcon from '@material-ui/icons/Add'

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

    const style = {
        add : {
            display : props.addButton ? 'flex' : 'none'
        },
        footer : {
            display : props.footer ? 'flex' : 'none'
        }
    }

    return (
        <div className = 'table-main-container'>
            <div className = 'table-contents'>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            {tableHeader()}
                            <th>
                                <div style = {style.add} id = 'add-icon'>
                                    <AddIcon/>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.tableBody()}
                    </tbody>
                </table>
            </div>
            <div className = 'footer' style = {style.footer}>
                {props.footer ? props.footer() : null}
            </div>
            {pagination()}
        </div>
    )
}

export default Table