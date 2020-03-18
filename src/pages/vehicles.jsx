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
    editCarType,
    editMotorBrand,
    editMotorType,
    getCarBrandAll,
    getMotorBrandAll,
    addNewCarBrand,
    addNewMotorBrand,
    deleteCarBrand,
    deleteMotorBrand,
    addNewCarType,
    addNewMotorType,
    deleteCarType,
    deleteMotorType
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
        branHoverId : null,
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
        this.props.getInitialCarBrands(this.state.rowPerPage)
        this.props.getTotalCarBrands()
        this.props.getInitialCarTypes(this.state.typeRowPerPage)
        this.props.getTotalCarTypes()
        this.props.getCarBrandAll()
        this.props.getMotorBrandAll()
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
        const { motorBrandTotal, carBrandTotal, motorBrands, carBrands} = this.props
        // check page
        const totalPage = tabValue ? motorBrandTotal : carBrandTotal
        if (page * rowPerPage >= totalPage) return null
        this.setState({page : page + 1})

        // get last id and do query
        const lastId = tabValue ? motorBrands[rowPerPage - 1].id : carBrands[rowPerPage - 1].id

        // do request by check tab value
        tabValue ? this.props.getNextMotorBrands(lastId, rowPerPage) 
        : this.props.getNextCarBrands(lastId, rowPerPage)
    }

    handleTypeNext = () => {
        const { typePage, typeRowPerPage, tabValue } = this.state
        const { motorTypeTotal, carTypeTotal, motorTypes, carTypes } = this.props
        // check page
        const totalPage = tabValue ? motorTypeTotal : carTypeTotal
        if (typePage * typeRowPerPage >= totalPage) return null
        this.setState({typePage : typePage + 1})

        // get last id and do query
        const lastId = tabValue ? motorTypes[typeRowPerPage -1].id : carTypes[typeRowPerPage - 1].id

        // do request by check tab value
        tabValue ? this.props.getNextMotorTypes(lastId, typeRowPerPage) 
        : this.props.getNextCarTypes(lastId, typeRowPerPage)
    }

    handleBrandPrev = () => {
        const { page, rowPerPage, tabValue } = this.state
        const { motorBrands, carBrands } = this.props
        // check page
        if (page <= 1) return null
        this.setState({page : page - 1})

        // get first id and do query
        const firstId = tabValue ? motorBrands[0].id : carBrands[0].id

        // do request by check tab value
        tabValue ? this.props.getPrevMotorBrands(firstId, rowPerPage) 
        : this.props.getPrevCarBrands(firstId, rowPerPage)
    }

    handleTypePrev = () => {
        const { typePage, typeRowPerPage, tabValue } = this.state
        const { motorTypes, carTypes } = this.props
        // check page
        if (typePage <= 1) return null
        this.setState({typePage : typePage - 1})

        // get first id and do query
        const firstId = tabValue ? motorTypes[0].id : carTypes[0].id

        // do request by check tab value
        tabValue ? this.props.getPrevMotorTypes(firstId, typeRowPerPage) 
        : this.props.getPrevCarTypes(firstId, typeRowPerPage)
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
        const { branHoverId, tabValue, selectedId, editBrand } = this.state
        const { motorBrands, carBrands } = this.props
        return (tabValue ? motorBrands : carBrands).map(({id, brand}) => {
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
                        :
                            <td>
                                <div id = 'edit-icon'
                                    style = {{display : branHoverId === id ? 'flex' : 'none'}}
                                    onClick = { _ => this.handleEditBrand(id, brand)}
                                >
                                    <EditIcon/>
                                </div>
                                <div id = 'delete-icon' 
                                    style = {{display : branHoverId === id ? 'flex' : 'none'}}
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
                            handleOption = {this.handleBrandOption}
                            page = {page}
                            rowPerPage = {rowPerPage}
                            totalPage = {brandPageTotal}
                            tableBody = {this.tableBrand}
                            handlePrevious = {this.handleBrandPrev}
                            handleNext = {this.handleBrandNext}
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
                            handleOption = {this.handleTypeOption}
                            page = {typePage}
                            rowPerPage = {typeRowPerPage}
                            totalPage = {typePageTotal}
                            tableBody = {this.tableType}
                            handlePrevious = {this.handleTypePrev}
                            handleNext = {this.handleTypeNext}
                            addButton = {true}
                            handleClickAdd = { _ => this.setState({ addType : true })}
                        />
                    </div>
                </div>
                {/* MODAL FOR ADD NEW BRAND OR TYPE*/}
                <Modal 
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
                </Modal>
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
        editCarType,
        editMotorBrand,
        editMotorType,
        getCarBrandAll,
        getMotorBrandAll,
        addNewCarBrand,
        addNewMotorBrand,
        deleteCarBrand,
        deleteMotorBrand,
        addNewCarType,
        addNewMotorType,
        deleteCarType,
        deleteMotorType
    }
}

export default connect(mapStore, mapDispatch())(Vehicles)