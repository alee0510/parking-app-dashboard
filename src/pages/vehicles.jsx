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
    getPathAction,
    getTotalVehicle,
    getVehicle,
    addVehicle,
    editVehicle,
    deleteVehicle
 } from '../actions'

// import components
import TabMenu from '../components/tabs'
import Table from '../components/table'
import Modal from '../components/modal'

// import style
import '../styles/vehicle.scss'
class Vehicles extends React.Component {
    state = {
        tabValue : 0,
        page : 1, 
        rowPerPage : 10,
        typePage : 1,
        typeRowPerPage : 10,
        brandHoverId : null,
        typeHoverId : null,
        selectedId : null,
        editBrand : null,
        selectedTypeId : null,
        editType : null,
        addBrand : false,
        editTypeOption : 1,
        deleteBrand : null,
        addType : false,
        addTypeOption : 1,
        deleteType : null
    }
    componentDidMount () {
        this.props.getPathAction('vehicles')

        // get initial data
        this.props.getTotalVehicle('car_brand')
        this.props.getTotalVehicle('car_type')
        this.props.getTotalVehicle('motor_brand')
        this.props.getTotalVehicle('motor_type')
        this.props.getVehicle('car_brand', this.state.rowPerPage)
        this.props.getVehicle('car_type', this.state.rowPerPage)
    }

    handleTab = () => {
        const { tabValue } = this.state
        this.setState({ 
            tabValue : tabValue ? 0 : 1, 
            rowPerPage : 10, 
            typeRowPerPage : 10, 
            page : 1, 
            typePage : 1,
            selectedId : null,
            selectedTypeId : null
        },
            () => {
                if (this.state.tabValue) { // tabValue === 1
                    this.props.getVehicle('motor_brand', this.state.rowPerPage)
                    this.props.getVehicle('motor_type', this.state.typeRowPerPage)
                    return
                }
                this.props.getVehicle('car_brand', this.state.rowPerPage)
                this.props.getVehicle('car_type', this.state.typeRowPerPage)
            }
        )
    }

    onBrandOption = (value) => {
        this.setState({ rowPerPage : value, page : 1 })

        // get initial data by tabValue
        this.state.tabValue ? 
        this.props.getVehicle('motor_brand', value) : 
        this.props.getVehicle('car_brand', value)
    }

    onTypeOption = (value) => {
        this.setState({ typeRowPerPage : value, typePage : 1})

        // get initial data by tabValue
        this.state.tabValue ? 
        this.props.getVehicle('motor_type', value) : 
        this.props.getVehicle('car_type', value)
    }

    onButtonBrandNext = () => {
        const { page, rowPerPage, tabValue } = this.state
        const { motorBrandTotal, carBrandTotal, motorBrands, carBrands} = this.props

        // check page
        const totalPage = tabValue ? motorBrandTotal : carBrandTotal
        if (page * rowPerPage >= totalPage) return null
        this.setState({page : page + 1})

        // get last id and do query
        const lastId = tabValue ? motorBrands[rowPerPage - 1].id : carBrands[rowPerPage - 1].id

        // do request by check tab value
        tabValue ? 
        this.props.getVehicle('motor_brand', rowPerPage, lastId) : 
        this.props.getVehicle('car_brand', rowPerPage, lastId) 
    }

    onButtonTypeNext = () => {
        const { typePage, typeRowPerPage, tabValue } = this.state
        const { motorTypeTotal, carTypeTotal, motorTypes, carTypes } = this.props
        // check page
        const totalPage = tabValue ? motorTypeTotal : carTypeTotal
        if (typePage * typeRowPerPage >= totalPage) return null
        this.setState({typePage : typePage + 1})

        // get last id and do query
        const lastId = tabValue ? motorTypes[typeRowPerPage -1].id : carTypes[typeRowPerPage - 1].id

        // do request by check tab value
        tabValue ? 
        this.props.getVehicle('motor_type', typeRowPerPage, lastId)  : 
        this.props.getVehicle('car_type', typeRowPerPage, lastId) 
    }

    onButtonBrandPrev = () => {
        const { page, rowPerPage, tabValue } = this.state
        const { motorBrands, carBrands } = this.props
        // check page
        if (page <= 1) return null
        this.setState({page : page - 1})

        // get first id and do query
        const firstId = tabValue ? motorBrands[0].id : carBrands[0].id

        // do request by check tab value
        tabValue ? 
        this.props.getVehicle('motor_brand', rowPerPage, null, firstId) : 
        this.props.getVehicle('car_brand', rowPerPage, null, firstId)
    }

    onButtonTypePrev = () => {
        const { typePage, typeRowPerPage, tabValue } = this.state
        const { motorTypes, carTypes } = this.props
        // check page
        if (typePage <= 1) return null
        this.setState({typePage : typePage - 1})

        // get first id and do query
        const firstId = tabValue ? motorTypes[0].id : carTypes[0].id

        // do request by check tab value
        tabValue ? 
        this.props.getVehicle('motor_type', typeRowPerPage, null, firstId) : 
        this.props.getVehicle('car_type', typeRowPerPage, null, firstId)
    }

    handleEditBrand = (id, brand) => {
        this.setState({ selectedId : id, editBrand : brand , selectedTypeId : null })
    }

    handleConfirmEditBrand = (id, type) => {
        const { editBrand, rowPerPage, tabValue } = this.state
        const { carTypes, carBrands, motorTypes, motorBrands } = this.props

        // check value
        if(editBrand) {
            tabValue ? 
            this.props.editMotorBrand(id, motorBrands[0].id, motorTypes[0].id, editBrand, rowPerPage)
            : this.props.editCarBrand(id, carBrands[0].id, carTypes[0].id, editBrand, rowPerPage)
        }
        this.setState({ selectedId : null, editBrand : null})
    }

    handleEditType = (id, type, brand_id) => {
        this.setState({ selectedTypeId : id, editType : type, editTypeOption : brand_id, selectedId : null })
    }

    handleConfirmEditType = (id) => {
        const { editType, editTypeOption, typeRowPerPage, tabValue } = this.state
        const { carTypes, motorTypes } = this.props
        if(editType) {
            const data = {
                name : editType,
                brand_id : editTypeOption
            }
            tabValue ? this.props.editMotorType(id, motorTypes[0].id, data, typeRowPerPage)
            : this.props.editCarType(id, carTypes[0].id, data, typeRowPerPage)
        }
        this.setState({ selectedTypeId : null, editType : null })
    }

    handleAddBrand = () => {
        const { tabValue } = this.state
        const brand = this.refs.newbrand.value.toUpperCase()

        // check input value
        if (brand.length === 0) return this.setState({ addBrand : false })
        console.log(brand.toUpperCase())

        // do request
        tabValue ? this.props.addNewMotorBrand({brand})
        : this.props.addNewCarBrand({brand})

        tabValue ? this.props.getTotalMotorBrands() : this.props.getTotalCarBrands()

        // reset
        this.setState({ addBrand : false, page : 1, rowPerPage : 10})
    }
    
    handleDeleteBrand = () => {
        const { deleteBrand, rowPerPage, tabValue } = this.state
        const { carBrands, motorBrands } = this.props

        // do request
        tabValue ? this.props.deleteMotorBrand(deleteBrand, motorBrands[0].id, rowPerPage)
        : this.props.deleteCarBrand(deleteBrand, carBrands[0].id, rowPerPage)

        tabValue ? this.props.getTotalMotorBrands() : this.props.getTotalCarBrands()

        // reset state
        this.setState({ deleteBrand : null })
    }

    handleAddType = () => {
        const { addTypeOption, tabValue } = this.state
        const type = this.refs.newtype.value

        // check input value
        if(type.length === 0) return this.setState({ addType : false })

        // do request
        tabValue ? this.props.addNewMotorType({name : type, brand_id : addTypeOption})
        : this.props.addNewCarType({name : type, brand_id : addTypeOption})

        tabValue ? this.props.getTotalMotorTypes() : this.props.getTotalCarTypes()

        this.setState({ addType : false, typePage : 1, typeRowPerPage : 10 })
    }

    handleDeleteType = () => {
        const { deleteType, typeRowPerPage, tabValue } = this.state
        const { carTypes, motorTypes } = this.props

        // do request
        tabValue ? this.props.deleteMotorType(deleteType, motorTypes[0].id, typeRowPerPage)
        : this.props.deleteCarType(deleteType, carTypes[0].id, typeRowPerPage)
        
        tabValue ? this.props.getTotalMotorTypes() : this.props.getTotalCarTypes()

        // reset state
        this.setState({ deleteType : null })
    }

    tableBrand = () => {
        const { brandHoverId, tabValue, selectedId, editBrand } = this.state
        const { motorBrands, carBrands } = this.props
        return (tabValue ? motorBrands : carBrands).map(({id, brand}) => {
            return (
                <tr key = {id}
                    onMouseEnter = { _ => this.setState({brandHoverId : id})}
                    onMouseLeave = { _ => this.setState({brandHoverId : 0})}
                >
                    <td></td>
                    <td>
                        {
                            selectedId === id ? (
                                <input 
                                    type = 'text' 
                                    id = 'edit-input' 
                                    autoFocus
                                    value = {editBrand} 
                                    style = {{ paddingLeft : 15}}
                                    onChange = { e => this.setState({ editBrand : e.target.value})}
                                />
                            ) : brand
                        }
                    </td>
                    {
                        selectedId === id ?
                            <td>
                                <div id = 'check-icon'
                                    style = {{display : brandHoverId === id ? 'flex' : 'none'}}
                                    onClick = { _ => this.handleConfirmEditBrand(id)}
                                >
                                    <CheckIcon/>
                                </div>
                                <div id = 'clear-icon' 
                                    style = {{display : brandHoverId === id ? 'flex' : 'none'}}
                                    onClick = { _ => this.setState({ selectedId : null, editBrand : null})}
                                >
                                    <ClearIcon/>
                                </div>
                            </td>
                        :
                            <td>
                                <div id = 'edit-icon'
                                    style = {{display : brandHoverId === id ? 'flex' : 'none'}}
                                    onClick = { _ => this.handleEditBrand(id, brand)}
                                >
                                    <EditIcon/>
                                </div>
                                <div id = 'delete-icon' 
                                    style = {{display : brandHoverId === id ? 'flex' : 'none'}}
                                    onClick = { _ => this.setState({ deleteBrand : id })}
                                >
                                    <DeleteIcon/>
                                </div>
                            </td>
                    }
                </tr>
            )
        })
    }

    tableType = () => {
        const { typeHoverId, tabValue, selectedTypeId, editTypeOption, editType } = this.state
        const { motorTypes, carTypes, allCarBrands, allMotorBrands } = this.props
        return (tabValue ? motorTypes : carTypes).map(({id, name, brand, brand_id}) => {
            return (
                <tr key = {id}
                onMouseEnter = { _ => this.setState({typeHoverId : id})}
                onMouseLeave = { _ => this.setState({typeHoverId : 0})}
                >
                    <td></td>
                    <td>
                        {
                            selectedTypeId === id ? (
                                <Select
                                    value = {editTypeOption}
                                    onChange = {(e) => this.setState({editTypeOption : e.target.value})}
                                    disableUnderline = {true}
                                >
                                    {
                                        (tabValue ? allMotorBrands : allCarBrands).map(({id, brand}) => (
                                            <MenuItem key = {id} value={id}>{brand}</MenuItem>
                                        ))
                                    }
                                </Select>
                            ) : brand
                        }
                    </td>
                    <td>
                        {
                            selectedTypeId === id ?
                                <input 
                                    type = 'text' 
                                    id = 'edit-input' 
                                    autoFocus 
                                    value = {editType}
                                    style = {{ paddingLeft : 15}}
                                    onChange = { e => this.setState({ editType : e.target.value})}
                                />
                            : name
                        }
                    </td>
                    {
                        selectedTypeId === id ?
                            <td>
                                <div id = 'check-icon'
                                    style = {{display : typeHoverId === id ? 'flex' : 'none'}}
                                    onClick = { _ => this.handleConfirmEditType(id)}
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
                        :
                            <td>
                                <div id = 'edit-icon'
                                    style = {{display : typeHoverId === id ? 'flex' : 'none'}}
                                    onClick = { _ => this.handleEditType(id, name, brand_id)}
                                >
                                    <EditIcon/>
                                </div>
                                <div id = 'delete-icon' 
                                    style = {{display : typeHoverId === id ? 'flex' : 'none'}}
                                    onClick = { _ => this.setState({ deleteType : id})}
                                >
                                    <DeleteIcon/>
                                </div>
                            </td>
                    }
                </tr>
            )
        })
    }

    render () {
        const { 
            tabValue, 
            page, 
            rowPerPage, 
            typePage, 
            typeRowPerPage, 
            addBrand, 
            deleteBrand,
            addType,
            addTypeOption,
            deleteType 
        } = this.state
        const { motorBrandTotal, carBrandTotal, motorTypeTotal, carTypeTotal, allCarBrands, allMotorBrands } = this.props
        const brandPageTotal = tabValue ? Math.ceil(motorBrandTotal/rowPerPage) : Math.ceil(carBrandTotal/rowPerPage)
        const typePageTotal = tabValue ? Math.ceil(motorTypeTotal/typeRowPerPage) : Math.ceil(carTypeTotal/typeRowPerPage)

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
                            handleOption = {this.onBrandOption}
                            page = {page}
                            rowPerPage = {rowPerPage}
                            totalPage = {brandPageTotal}
                            tableBody = {this.tableBrand}
                            handlePrevious = {this.onButtonBrandPrev}
                            handleNext = {this.onButtonBrandNext}
                            addButton = {true}
                            handleClickAdd = { _ => this.setState({ addBrand : true })}
                        />
                    </div>
                    <div className = 'type-table'>
                        <Table
                            className = 'table'
                            headerItems = {['Brand', 'Name']}
                            menuItems = {[10, 15, 20, 25, 30]}
                            optionValue = {typeRowPerPage}
                            handleOption = {this.onTypeOption}
                            page = {typePage}
                            rowPerPage = {typeRowPerPage}
                            totalPage = {typePageTotal}
                            tableBody = {this.tableType}
                            handlePrevious = {this.onButtonTypePrev}
                            handleNext = {this.onButtonTypeNext}
                            addButton = {true}
                            handleClickAdd = { _ => this.setState({ addType : true })}
                        />
                    </div>
                </div>
                {/* MODAL FOR ADD NEW BRAND OR TYPE*/}
                {/* <Modal 
                    open = {addBrand}
                    onClose = { _ => this.setState({ addBrand : false })}
                    title = 'Add new brand'
                    handleOk = {this.handleAddBrand}
                    cancelButton = {true}
                    handleCancel = { _ => this.setState({ addBrand : false })}
                >
                    <input
                        type = 'text' 
                        placeholder = 'add your new brand'
                        ref = 'newbrand'
                        autoFocus
                        style = {{ height : 40, padding : 10}}
                    />
                </Modal>
                <Modal
                    open = {addType}
                    onClose = { _ => this.setState({ addType : false})}
                    title = 'Add new type'
                    handleOk = {this.handleAddType}
                    cancelButton = {true}
                    handleCancel = { _ => this.setState({ addType : false})}
                >
                    <Select
                        value = {addTypeOption}
                        onChange = {(e) => this.setState({addTypeOption : e.target.value})}
                        disableUnderline = {true}
                        style = {{ width : 200, marginRight : 20}}
                    >
                    {
                        (tabValue ? allMotorBrands : allCarBrands).map(({id, brand}) => (
                            <MenuItem key = {id} value={id}>{brand}</MenuItem>
                        ))
                    }
                    </Select>
                    <input
                        type = 'text' 
                        placeholder = 'add your new type'
                        ref = 'newtype'
                        autoFocus
                        style = {{ height : 40, padding : 10 }}
                    />
                </Modal> */}
                {/* MOADAL FOR DELETE CONFIRMATION */}
                <Modal
                    open = {Boolean(deleteBrand)}
                    onClose = { _ => this.setState({deleteBrand : null})}
                    title = 'Delete confirmation ?'
                    handleOk = {this.handleDeleteBrand}
                />
                <Modal
                    open = {Boolean(deleteType)}
                    onClose = { _ => this.setState({deleteType : null})}
                    title = 'Delete confirmation ?'
                    handleOk = {this.handleDeleteType}
                />
            </div>
        )
    }
}

const mapStore = ({ vehicle }) => {
    return {
        carBrands : vehicle.car_brand,
        carBrandTotal : vehicle.car_brand_total,
        carTypes : vehicle.car_type,
        carTypeTotal : vehicle.car_type_total,
        motorBrands : vehicle.motor_brand,
        motorBrandTotal : vehicle.motor_brand_total,
        motorTypes : vehicle.motor_type,
        motorTypeTotal : vehicle.motor_type_total,
        loading : vehicle.loading
    }
}

const mapDispatch = () => {
    return {
        getPathAction,
        getTotalVehicle,
        getVehicle,
        addVehicle,
        editVehicle,
        deleteVehicle
    }
}

export default connect(mapStore, mapDispatch())(Vehicles)