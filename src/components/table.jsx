import React from 'react'
import { Select, MenuItem } from '@material-ui/core'

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
                <h1>row per-page</h1>
                <Select
                    value = {props.rowPerPage}
                    onChange = {props.handleChange}
                    disableUnderline = {true}
                >
                    {props.optionItems.map((item, index) => {
                        return <MenuItem key = {index} value={item}>{item}</MenuItem>
                    })}
                </Select>
                <div id = 'previous' onClick = {props.hanldePrevious}>
                    <NavigateBeforeIcon/>
                </div>
                <h1>{props.page} of {props.totalPage}</h1>
                <div id = 'next' onClick = {props.hanldeNext}>
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