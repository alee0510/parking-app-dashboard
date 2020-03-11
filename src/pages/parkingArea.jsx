import React from 'react'
import { connect } from 'react-redux'

// import actions creator
import { getParkng } from '../actions'

// import components
import Table from '../components/table'

// import styles
import '../styles/parkingArea.scss'


class ParkingArea extends React.Component {
    state = {
        page : 1,
        rowPerPage : 0
    }

    componentDidMount () {
        this.props.getParkng()
    }

    tableParking = () => {
        return this.props.parking.map(({
            id, 
            company, 
            address, 
            city, 
            province, 
            car_cost, 
            motor_cost, 
            slot, 
            place_name, 
            geo_location}) => (
            <tr key = {id}>
                <td></td>
                <td>{company}</td>
                <td>{address}</td>
                <td>{city}</td>
                <td>{province}</td>
                <td>{car_cost}</td>
                <td>{motor_cost}</td>
                <td>{slot}</td>
                <td>{place_name}</td>
                <td>{geo_location}</td>
                <td></td>
            </tr>
        ))
    }

    render () {
        const { page, rowPerPage} = this.state
        return (
            <div className = 'parking-main-container'>
                <h1>Parking Area</h1>
                <div className = 'parking-table-container'>
                    <Table
                        className = 'table'
                        headerItems = {['company', 'address', 'city', 'province', 'car', 'motor', 'slot', 'place', 'location']}
                        menuItems = {[0]}
                        optionValue = {rowPerPage}
                        // handleOption = { _ => null}
                        page = {page}
                        rowPerPage = {rowPerPage}
                        totalPage = {1}
                        tableBody = {this.tableParking}
                        // handlePrevious = {this.handlePrevious}
                        // handleNext = {this.handleNext}
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
        getParkng
    }
}

export default connect(mapStore, mapDispatch())(ParkingArea)