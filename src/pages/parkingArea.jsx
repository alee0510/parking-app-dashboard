import React from 'react'
import { connect } from 'react-redux'

// import icons
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
// import ClearIcon from '@material-ui/icons/Clear'
// import CheckIcon from '@material-ui/icons/Check'

// import actions creator
import { getParkng, getPathAction } from '../actions'

// import components
import Table from '../components/table'

// import styles
import '../styles/parkingArea.scss'


class ParkingArea extends React.Component {
    state = {
        hoverId : null
    }

    componentDidMount () {
        this.props.getPathAction('parking')
        this.props.getParkng()
    }

    tableParking = () => {
        const { hoverId } = this.state
        return this.props.parking.map(({
            id, 
            company, 
            address, 
            city,
            car_cost, 
            motor_cost, 
            car_slot,
            motor_slot, 
            place_name, 
            geo_location
        }) => (
            <tr 
                key = {id}
                onMouseEnter = { _ => this.setState({hoverId : id})}
                onMouseLeave = { _ => this.setState({hoverId : 0})}
            >
                <td></td>
                <td>{company}</td>
                <td>{address}</td>
                <td>{city}</td>
                {/* <td>{province}</td> */}
                <td>{car_cost}</td>
                <td>{motor_cost}</td>
                <td>{car_slot}</td>
                <td>{motor_slot}</td>
                <td>{place_name}</td>
                {/* <td>{geo_location}</td> */}
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
            </tr>
        ))
    }

    render () {
        return (
            <div className = 'parking-main-container'>
                <h1>Parking Area</h1>
                <div className = 'parking-table-container'>
                    <Table
                        className = 'table'
                        headerItems = {['company', 'address', 'city', 'car (rp)', 'motor (rp)', 'car slot', 'motor slot', 'place']}
                        menuItems = {[0]}
                        optionValue = {0}
                        page = {1}
                        rowPerPage = {0}
                        totalPage = {1}
                        tableBody = {this.tableParking}
                        addButton = {true}
                        handleClickAdd = {this.handleAddButton}
                    />
                </div>
            </div>
        )
    }
}

const mapStore = ({ parkingReducer }) => {
    return {
        parking : parkingReducer.data
    }
}

const mapDispatch = () => {
    return {
        getParkng,
        getPathAction
    }
}

export default connect(mapStore, mapDispatch())(ParkingArea)