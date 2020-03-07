import React from 'react'
import { connect } from 'react-redux'

// import icons
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import ClearIcon from '@material-ui/icons/Clear'
import CheckIcon from '@material-ui/icons/Check'

// import actions creator
import { getInitialCarBrands, getNextCarBrand, getPrevCarBrands,
    getTotalCarBrands, getInitialCarTypes, getNextCarTypes, getPrevCarTypes,
    getTotalCarTypes
 } from '../actions'

// import components
import TabMenu from '../components/tabs'
import Table from '../components/table'

// import style
import '../styles/vehicle.scss'
class Vehicles extends React.Component {
    state = {
        tabValue : 0,
        page : 1, 
        rowPerPage : 10,
        typePage : 1,
        typeRowPerPage : 10,
        branHoverId : null,
        typeHoverId : null
    }
    componentDidMount () {
        this.props.getInitialCarBrands(this.state.rowPerPage)
        this.props.getTotalCarBrands()
        this.props.getInitialCarTypes(this.state.typeRowPerPage)
        this.props.getTotalCarTypes()
        // this.props.getCarTypes()
    }

    handleTab = () => {
        const { tabValue } = this.state
        this.setState({ tabValue : tabValue ? 0 : 1})
    }

    handleBrandOption = (value) => {
        this.setState({ rowPerPage : value, page : 1 })
        this.props.getInitialCarBrands(value)
    }

    handleTypeOption = (value) => {
        this.setState({ typeRowPerPage : value, typePage : 1})
        this.props.getInitialCarTypes(value)
    }

    handleBrandNext = () => {
        const { page, rowPerPage, tabValue } = this.state
        // check page
        if (page * rowPerPage >= this.props.carBrandTotal) return null
        this.setState({page : page + 1})

        // get last id and do query
        const lastId = this.props.carBrands[rowPerPage - 1].id

        // do request by check tab value
        this.props.getNextCarBrand(lastId, rowPerPage)
    }

    handleTypeNext = () => {
        const { typePage, typeRowPerPage, tabValue } = this.state
        // check page
        if (typePage * typeRowPerPage >= this.props.carTypeTotal) return null
        this.setState({typePage : typePage + 1})

        // get last id and do query
        const lastId = this.props.carTypes[typeRowPerPage - 1].id

        // do request by check tab value
        this.props.getNextCarTypes(lastId, typeRowPerPage)
    }

    handleBrandPrev = () => {
        const { page, rowPerPage, tabValue } = this.state
        // check page
        if (page <= 1) return null
        this.setState({page : page - 1})

        // get first id and do query
        const firstId = this.props.carBrands[0].id

        // do request by check tab value
        this.props.getPrevCarBrands(firstId, rowPerPage)
    }

    handleTypePrev = () => {
        const { typePage, typeRowPerPage, tabValue } = this.state
        // check page
        if (typePage <= 1) return null
        this.setState({typePage : typePage - 1})

        // get first id and do query
        const firstId = this.props.carTypes[0].id

        // do request by check tab value
        this.props.getPrevCarTypes(firstId, typeRowPerPage)
    }

    tableCarBrand = () => {
        const { branHoverId } = this.state
        return this.props.carBrands.map(({id, brand}) => {
            return (
                <tr key = {id}
                    onMouseEnter = { _ => this.setState({branHoverId : id})}
                    onMouseLeave = { _ => this.setState({branHoverId : 0})}
                >
                    <td></td>
                    <td>{brand}</td>
                    <td>
                        <div id = 'check-icon' 
                            style = {{display : branHoverId === id ? 'flex' : 'none'}}
                            // onClick = {_ => this.hanldeEditConfirmation(id)}
                        >
                            <EditIcon/>
                        </div>
                        <div id = 'clear-icon' 
                            style = {{display : branHoverId === id ? 'flex' : 'none'}}
                            // onClick = { _ => this.setState({ selectedId : null})}
                        >
                            <DeleteIcon/>
                        </div>
                    </td>
                </tr>
            )
        })
    }

    tableCarType = () => {
        const { typeHoverId } = this.state
        return this.props.carTypes.map(({id, brand, name}) => {
            return (
                <tr key = {id}
                onMouseEnter = { _ => this.setState({typeHoverId : id})}
                onMouseLeave = { _ => this.setState({typeHoverId : 0})}
                >
                    <td></td>
                    <td>{brand}</td>
                    <td>{name}</td>
                    <td>
                        <div id = 'check-icon' 
                            style = {{display : typeHoverId === id ? 'flex' : 'none'}}
                            // onClick = {_ => this.hanldeEditConfirmation(id)}
                        >
                            <EditIcon/>
                        </div>
                        <div id = 'clear-icon' 
                            style = {{display : typeHoverId === id ? 'flex' : 'none'}}
                            // onClick = { _ => this.setState({ selectedId : null})}
                        >
                            <DeleteIcon/>
                        </div>
                    </td>
                </tr>
            )
        })
    }

    render () {
        const { tabValue, page, rowPerPage, typePage, typeRowPerPage } = this.state
        // console.log(this.props.carBrands)
        return (
            <div className = 'vehicles-main-container'>
                <h1>Vehicles</h1>
                <div className = 'tab-menu'>
                    <TabMenu
                        value = {tabValue}
                        handleTab = {this.handleTab}
                        label1 = 'Cars'
                        label2 = 'Motors'
                    />
                </div>
                <div className = 'table-container'>
                    <div className = 'brand-table'>
                        <Table
                            className = 'table'
                            headerItems = {['Brand']}
                            menuItems = {[10, 15, 20, 25, 30]}
                            optionValue = {rowPerPage}
                            handleOption = {this.handleBrandOption}
                            page = {page}
                            rowPerPage = {rowPerPage}
                            totalPage = {Math.ceil(this.props.carBrandTotal/rowPerPage)}
                            tableBody = {this.tableCarBrand}
                            handlePrevious = {this.handleBrandPrev}
                            handleNext = {this.handleBrandNext}
                            addButton = {true}
                            // handleAdd = 
                        />
                    </div>
                    <div className = 'type-table'>
                        <Table
                            className = 'table'
                            headerItems = {['Brand', 'Name']}
                            menuItems = {[10, 15, 20, 25, 30]}
                            optionValue = {typeRowPerPage}
                            handleOption = {this.handleTypeOption}
                            page = {typePage}
                            rowPerPage = {typeRowPerPage}
                            totalPage = {Math.ceil(this.props.carTypeTotal/typeRowPerPage)}
                            tableBody = {this.tableCarType}
                            handlePrevious = {this.handleTypePrev}
                            handleNext = {this.handleTypeNext}
                            addButton = {true}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStore = ({ carBrands , carBrandTotal, carTypes, carTypeTotal }) => {
    return {
        carBrands : carBrands.carBrands,
        carBrandTotal : carBrandTotal.carBrandTotal,
        carTypes : carTypes.carTypes,
        carTypeTotal : carTypeTotal.carTypeTotal
    }
}

const mapDispatch = () => {
    return {
        getInitialCarBrands, getNextCarBrand, getPrevCarBrands,
        getTotalCarBrands, getInitialCarTypes, getNextCarTypes, 
        getPrevCarTypes, getTotalCarTypes
    }
}

export default connect(mapStore, mapDispatch())(Vehicles)