import React from 'react'
import { connect } from 'react-redux'
import { Select, MenuItem } from '@material-ui/core'

// import icons
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import ClearIcon from '@material-ui/icons/Clear'
import CheckIcon from '@material-ui/icons/Check'

// import actions creator
import { 
    getInitialCarBrands, 
    getNextCarBrands, 
    getPrevCarBrands,
    getTotalCarBrands, 
    getInitialCarTypes, 
    getNextCarTypes, 
    getPrevCarTypes,
    getTotalCarTypes, 
    getInitialMotorBrands, 
    getInitialMotorTypes, 
    getTotalMotorBrands,
    getTotalMotorTypes, 
    getNextMotorBrands, 
    getPrevMotorBrands, 
    getNextMotorTypes, 
    getPrevMotorTypes,
    getPathAction,
    editCarBrand,
    getCarBrandAll,
    getMotorBrandAll
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
        typeHoverId : null,
        selectedId : null,
        editBrand : null,
        selectedTypeId : null,
        editType : null,
        addModal : false,
        editTypeOption : 1
    }
    componentDidMount () {
        this.props.getPathAction('vehicles')
        this.props.getInitialCarBrands(this.state.rowPerPage)
        this.props.getTotalCarBrands()
        this.props.getInitialCarTypes(this.state.typeRowPerPage)
        this.props.getTotalCarTypes()
        this.props.getCarBrandAll()
        // this.props.getCarTypes()
    }

    handleTab = () => {
        const { tabValue } = this.state
        this.setState({ 
            tabValue : tabValue ? 0 : 1, 
            rowPerPage : 10, 
            typeRowPerPage : 10, 
            page : 1, 
            typePage : 1 },
            () => {
                if (this.state.tabValue) { // tabValue === 1
                    this.props.getTotalMotorBrands()
                    this.props.getTotalMotorTypes()
                    this.props.getInitialMotorBrands(this.state.rowPerPage)
                    this.props.getInitialMotorTypes(this.state.typeRowPerPage)
                    return
                }
                this.props.getTotalCarBrands()
                this.props.getTotalCarTypes()
                this.props.getInitialCarBrands(this.state.rowPerPage)
                this.props.getInitialCarTypes(this.state.typeRowPerPage)
            }
        )
    }

    handleBrandOption = (value) => {
        this.setState({ rowPerPage : value, page : 1 })

        // get initial data by tabValue
        this.state.tabValue ? this.props.getInitialMotorBrands(value) 
        : this.props.getInitialCarBrands(value)
    }

    handleTypeOption = (value) => {
        this.setState({ typeRowPerPage : value, typePage : 1})

        // get initial data by tabValue
        this.state.tabValue ? this.props.getInitialMotorTypes(value) 
        : this.props.getInitialCarTypes(value)
    }

    handleBrandNext = () => {
        const { page, rowPerPage, tabValue } = this.state
        // check page
        const totalPage = tabValue ? this.props.motorBrandTotal : this.props.carBrandTotal
        if (page * rowPerPage >= totalPage) return null
        this.setState({page : page + 1})

        // get last id and do query
        const lastId = tabValue ? this.props.motorBrands[rowPerPage - 1].id 
        : this.props.carBrands[rowPerPage - 1].id

        // do request by check tab value
        tabValue ? this.props.getNextMotorBrands(lastId, rowPerPage) 
        : this.props.getNextCarBrands(lastId, rowPerPage)
    }

    handleTypeNext = () => {
        const { typePage, typeRowPerPage, tabValue } = this.state
        // check page
        const totalPage = tabValue ? this.props.motorTypeTotal : this.props.carTypeTotal
        if (typePage * typeRowPerPage >= totalPage) return null
        this.setState({typePage : typePage + 1})

        // get last id and do query
        const lastId = tabValue ? this.props.motorTypes[typeRowPerPage -1].id 
        : this.props.carTypes[typeRowPerPage - 1].id

        // do request by check tab value
        tabValue ? this.props.getNextMotorTypes(lastId, typeRowPerPage) 
        : this.props.getNextCarTypes(lastId, typeRowPerPage)
    }

    handleBrandPrev = () => {
        const { page, rowPerPage, tabValue } = this.state
        // check page
        if (page <= 1) return null
        this.setState({page : page - 1})

        // get first id and do query
        const firstId = tabValue ? this.props.motorBrands[0].id 
        : this.props.carBrands[0].id

        // do request by check tab value
        tabValue ? this.props.getPrevMotorBrands(firstId, rowPerPage) 
        : this.props.getPrevCarBrands(firstId, rowPerPage)
    }

    handleTypePrev = () => {
        const { typePage, typeRowPerPage, tabValue } = this.state
        // check page
        if (typePage <= 1) return null
        this.setState({typePage : typePage - 1})

        // get first id and do query
        const firstId = tabValue ? this.props.motorTypes[0].id : this.props.carTypes[0].id

        // do request by check tab value
        tabValue ? this.props.getPrevMotorTypes(firstId, typeRowPerPage) 
        : this.props.getPrevCarTypes(firstId, typeRowPerPage)
    }

    handleEditBrand = (id) => {
        this.setState({ selectedId : id })
    }

    handleConfirmEditBrand = (id) => {
        this.props.editCarBrand(id, this.props.carBrands[0].id, this.state.editBrand,  this.state.rowPerPage)
        this.setState({ selectedId : null, editBrand : null})
    }

    handleEditType = (id) => {
        this.setState({ selectedTypeId : id })
    }

    tableBrand = () => {
        const { branHoverId, tabValue, selectedId } = this.state
        return (tabValue ? this.props.motorBrands : this.props.carBrands).map(({id, brand}) => {
            return (
                <tr key = {id}
                    onMouseEnter = { _ => this.setState({branHoverId : id})}
                    onMouseLeave = { _ => this.setState({branHoverId : 0})}
                >
                    <td></td>
                    <td>
                        {
                            selectedId === id ? (
                                <input 
                                    type = 'text' 
                                    id = 'edit-input' 
                                    autoFocus 
                                    style = {{ paddingLeft : 15}}
                                    onChange = { e => this.setState({ editBrand : e.target.value})}
                                />
                            ) : brand
                        }
                    </td>
                    {
                        selectedId === id ? (
                            <td>
                                <div id = 'check-icon'
                                    style = {{display : branHoverId === id ? 'flex' : 'none'}}
                                    onClick = { _ => this.handleConfirmEditBrand(id)}
                                >
                                    <CheckIcon/>
                                </div>
                                <div id = 'clear-icon' 
                                    style = {{display : branHoverId === id ? 'flex' : 'none'}}
                                    onClick = { _ => this.setState({ selectedId : null, editBrand : null})}
                                >
                                    <ClearIcon/>
                                </div>
                            </td>
                        ) 
                        : (
                            <td>
                                <div id = 'edit-icon'
                                    style = {{display : branHoverId === id ? 'flex' : 'none'}}
                                    onClick = { _ => this.handleEditBrand(id)}
                                >
                                    <EditIcon/>
                                </div>
                                <div id = 'delete-icon' 
                                    style = {{display : branHoverId === id ? 'flex' : 'none'}}
                                    // onClick = { _ => this.setState({ selectedId : null})}
                                >
                                    <DeleteIcon/>
                                </div>
                            </td>
                        )
                    }
                </tr>
            )
        })
    }

    tableType = () => {
        const { typeHoverId, tabValue, selectedTypeId, editTypeOption } = this.state
        // console.log(this.state.carBrand)
        return (tabValue ? this.props.motorTypes : this.props.carTypes).map(({id, brand, name}) => {
            return (
                <tr key = {id}
                onMouseEnter = { _ => this.setState({typeHoverId : id})}
                onMouseLeave = { _ => this.setState({typeHoverId : 0})}
                >
                    <td></td>
                    <td>
                        {
                            selectedTypeId == id ? (
                                <Select
                                value = {editTypeOption}
                                onChange = {(e) => this.setState({editTypeOption : e.target.value})}
                                disableUnderline = {true}
                            >
                                {
                                    this.props.allCarBrands.map(({id, brand}) => (
                                        <MenuItem key = {id} value={id}>{brand}</MenuItem>
                                    ))
                                }
                            </Select>
                            ) : brand
                        }
                    </td>
                    <td>
                        {
                            selectedTypeId === id ? (
                                <input 
                                    type = 'text' 
                                    id = 'edit-input' 
                                    autoFocus 
                                    style = {{ paddingLeft : 15}}
                                    onChange = { e => this.setState({ editType : e.target.value})}
                                />
                            ) : name
                        }
                    </td>
                    {
                        selectedTypeId === id ? (
                            <td>
                                <div id = 'check-icon'
                                    style = {{display : typeHoverId === id ? 'flex' : 'none'}}
                                    // onClick = { _ => this.handleConfirmEditBrand(id)}
                                >
                                    <CheckIcon/>
                                </div>
                                <div id = 'clear-icon' 
                                    style = {{display : typeHoverId === id ? 'flex' : 'none'}}
                                    onClick = { _ => this.setState({ selectedTypeId : null, editType : null})}
                                >
                                    <ClearIcon/>
                                </div>
                            </td>
                        ) 
                        : (
                            <td>
                                <div id = 'edit-icon'
                                    style = {{display : typeHoverId === id ? 'flex' : 'none'}}
                                    onClick = { _ => this.handleEditType(id)}
                                >
                                    <EditIcon/>
                                </div>
                                <div id = 'delete-icon' 
                                    style = {{display : typeHoverId === id ? 'flex' : 'none'}}
                                    // onClick = { _ => this.setState({ selectedId : null})}
                                >
                                    <DeleteIcon/>
                                </div>
                            </td>
                        )
                    }
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
                            totalPage = {tabValue ? Math.ceil(this.props.motorBrandTotal / rowPerPage) 
                                : Math.ceil(this.props.carBrandTotal / rowPerPage)}
                            tableBody = {this.tableBrand}
                            handlePrevious = {this.handleBrandPrev}
                            handleNext = {this.handleBrandNext}
                            addButton = {true}
                            handleClickAdd = {this.handleAddBrand}
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
                            totalPage = {tabValue ? Math.ceil(this.props.motorTypeTotal / typeRowPerPage) : 
                                Math.ceil(this.props.carTypeTotal/typeRowPerPage)}
                            tableBody = {this.tableType}
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

const mapStore = ({ 
    carBrands , 
    carBrandTotal, 
    carTypes, 
    carTypeTotal, 
    motorBrandTotal, 
    motorBrands, 
    motorTypeTotal,
    motorTypes,
    allBrands 
}) => {
    return {
        carBrands : carBrands.carBrands,
        carBrandTotal : carBrandTotal.carBrandTotal,
        carTypes : carTypes.carTypes,
        carTypeTotal : carTypeTotal.carTypeTotal,
        motorBrands : motorBrands.motorBrands,
        motorBrandTotal : motorBrandTotal.motorBrandTotal,
        motorTypes : motorTypes.motorTypes,
        motorTypeTotal : motorTypeTotal.motorTypeTotal,
        allCarBrands : allBrands.car,
        allMotorBrands : allBrands.motor
    }
}

const mapDispatch = () => {
    return {
        getInitialCarBrands, 
        getNextCarBrands, 
        getPrevCarBrands,
        getTotalCarBrands, 
        getInitialCarTypes, 
        getNextCarTypes, 
        getPrevCarTypes,
        getTotalCarTypes, 
        getInitialMotorBrands, 
        getInitialMotorTypes, 
        getTotalMotorBrands,
        getTotalMotorTypes, 
        getNextMotorBrands, 
        getPrevMotorBrands, 
        getNextMotorTypes, 
        getPrevMotorTypes,
        getPathAction,
        editCarBrand,
        getCarBrandAll,
        getMotorBrandAll
    }
}

export default connect(mapStore, mapDispatch())(Vehicles)