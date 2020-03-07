import React from 'react'
import { connect } from 'react-redux'

// import actions creator
import { getCarBrands, getCarTypes } from '../actions'

// import components
import TabMenu from '../components/tabs'
import Table from '../components/table'

// import style
import '../styles/vehicle.scss'
class Vehicles extends React.Component {
    componentDidMount () {
        this.props.getCarBrands()
        this.props.getCarTypes()
    }

    renderTableCarBrand = () => {
        return console.log('car brand')
    }

    render () {
        return (
            <div className = 'vehicles-main-container'>
                <h1>Vehicles</h1>
                <div className = 'tab-menu'>
                    <TabMenu
                        value = {0}
                        handleTab = {this.handleTab}
                        label1 = 'Cars'
                        label2 = 'Motors'
                    />
                </div>
                <div className = 'table-container'>
                    <div className = 'brand-table'></div>
                    <div className = 'type-table'></div>
                </div>
            </div>
        )
    }
}

const mapStore = ({ carBrands }) => {
    return {
        carBrans : carBrands.carBrands
    }
}

const mapDispatch = () => {
    return {
        getCarBrands, getCarTypes
    }
}

export default connect(mapStore, mapDispatch())(Vehicles)