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
    getBrand,
    addVehicle,
    editVehicle,
    deleteVehicle
 } from '../actions'

// import components
import TabMenu from '../components/tabs'
import Table from '../components/table'
import Modal from '../components/modal'
import Loading from '../components/loading'

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
        // edit state
        selectedBrand : null,
        selectedType : null,
        editBrand : null,
        editType : null,
        brandId : null, // type name
        // delete state
        deleteBrand : null,
        deleteType : null,
        // add state
        addBrand : null,
        addType : null,
        addBrandId : null
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
        this.props.getBrand()
    }

    handleTab = () => {
        const { tabValue } = this.state
        this.setState({ 
            tabValue : tabValue ? 0 : 1, 
            rowPerPage : 10, 
            typeRowPerPage : 10, 
            page : 1, 
            typePage : 1,
            selectedBrand : null,
            selectedType : null
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
        const lastId = tabValue ? motorBrands[motorBrands.length - 1].id : carBrands[carBrands.length - 1].id

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
        const lastId = tabValue ? motorTypes[motorTypes.length - 1].id : carTypes[carTypes.length - 1].id

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

    onButtonEdit = (key, ...args) => {
        console.log(args)
        key === 'brand' ?
        this.setState({selectedBrand : args[0], selectedType : null, editBrand : args[1]}) :
        this.setState({selectedBrand : null, selectedType : args[0], editType : args[1], brandId : args[2]})
    }

    onButtonCancel = (key) => {
        key === 'brand' ?
        this.setState({selectedBrand : null, editBrand : null}) :
        this.setState({selectedType : null, editType : null, brandId : null})
    }

    onButtonConfirmEdit = (key) => {
        const { tabValue, selectedBrand, selectedType, editBrand, editType, brandId, rowPerPage, typeRowPerPage } = this.state
        const { carBrands, motorBrands } = this.props
        if (key === 'brand') {
            if (tabValue) {
                this.props.editVehicle('motor_brand', selectedBrand, {brand : editBrand}, motorBrands[0].id, rowPerPage) 
                this.props.getTotalVehicle('motor_brand')
            } else {
                this.props.editVehicle('car_brand', selectedBrand, {brand : editBrand}, carBrands[0].id, rowPerPage)
                this.props.getTotalVehicle('car_brand')
            }
        } else {
            if (tabValue) {
                this.props.editVehicle('motor_type', selectedType, {name : editType, brand_id : brandId}, motorBrands[0].id, typeRowPerPage)
                this.props.getTotalVehicle('motor_type')
            } else {
                this.props.editVehicle('car_type', selectedType, {name : editType, brand_id : brandId}, carBrands[0].id, typeRowPerPage)
                this.props.getTotalVehicle('car_type')
            }
        }
        this.props.getBrand()
        this.onButtonCancel(key)
    }

    onButtonConfirmDelete = (key) => {
        const { tabValue, deleteBrand, deleteType, rowPerPage, typeRowPerPage } = this.state
        const { carBrands, motorBrands } = this.props
        if (key === 'brand') {
            if (tabValue) {
                this.props.deleteVehicle('motor_brand', deleteBrand, motorBrands[0].id, rowPerPage)
                this.props.getTotalVehicle('motor_brand')
            } else {
                this.props.deleteVehicle('car_brand', deleteBrand, carBrands[0].id, rowPerPage)
                this.props.getTotalVehicle('car_brand')
            }
        } else {
            if (tabValue) {
                this.props.deleteVehicle('motor_type', deleteType, motorBrands[0].id, typeRowPerPage)
                this.props.getTotalVehicle('motor_type')
            } else {
                this.props.deleteVehicle('car_type', deleteType, carBrands[0].id, typeRowPerPage)
                this.props.getTotalVehicle('car_type')
            }
        }
        this.props.getBrand()
        this.setState({deleteBrand : null, deleteType : null})
    }

    onButtonConfirmAdd = () => {
        const { tabValue, addBrand, addBrandId, rowPerPage, typeRowPerPage } = this.state
        if (addBrand) {
            const brand = this.refs.newbrand.value.toUpperCase()
            if (brand.length === 0) return this.setState({addBrand : null})
            if (tabValue) {
                this.props.addVehicle('motor_brand', {brand}, rowPerPage)
                this.props.getTotalVehicle('motor_brand')
            } else {
                this.props.addVehicle('car_brand', {brand}, rowPerPage)
                this.props.getTotalVehicle('car_brand')
            }
        } else {
            const type = this.refs.newtype.value
            if (type.length === 0) return this.setState({addType : null, addBrandId : null})
            if (tabValue) {
                this.props.addVehicle('motor_type', {name : type, brand_id : addBrandId}, typeRowPerPage)
                this.props.getTotalVehicle('motor_type')
            } else {
                this.props.addVehicle('car_type', {name : type, brand_id : addBrandId}, typeRowPerPage)
                this.props.getTotalVehicle('car_type')
            }
        }
        this.props.getBrand()
        this.setState({addBrand : false, addType : false, addBrandId : null})
    }

    tableBrand = () => {
        const { brandHoverId, tabValue, selectedBrand, editBrand } = this.state
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
                            selectedBrand === id ? (
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
                        selectedBrand === id ?
                            <td>
                                <div id = 'check-icon'
                                    style = {{display : brandHoverId === id ? 'flex' : 'none'}}
                                    onClick = { _ => this.onButtonConfirmEdit('brand')}
                                >
                                    <CheckIcon/>
                                </div>
                                <div id = 'clear-icon' 
                                    style = {{display : brandHoverId === id ? 'flex' : 'none'}}
                                    onClick = { _ => this.onButtonCancel('brand')}
                                >
                                    <ClearIcon/>
                                </div>
                            </td>
                        :
                            <td>
                                <div id = 'edit-icon'
                                    style = {{display : brandHoverId === id ? 'flex' : 'none'}}
                                    onClick = { _ => this.onButtonEdit('brand', id, brand)}
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
        const { typeHoverId, tabValue, selectedType, brandId, editType } = this.state
        const { carTypes, motorTypes, car, motor } = this.props
        return (tabValue ? motorTypes : carTypes).map(({id, name, brand, brand_id}) => {
            return (
                <tr key = {id}
                onMouseEnter = { _ => this.setState({typeHoverId : id})}
                onMouseLeave = { _ => this.setState({typeHoverId : 0})}
                >
                    <td></td>
                    <td>
                        {
                            selectedType === id ? (
                                <Select
                                    value = {brandId}
                                    onChange = {(e) => this.setState({brandId : e.target.value})}
                                    disableUnderline = {true}
                                >
                                    {
                                        (tabValue ? motor : car).map(({id, brand}) => (
                                            <MenuItem key = {id} value={id}>{brand}</MenuItem>
                                        ))
                                    }
                                </Select>
                            ) : brand
                        }
                    </td>
                    <td>
                        {
                            selectedType === id ?
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
                        selectedType === id ?
                            <td>
                                <div id = 'check-icon'
                                    style = {{display : typeHoverId === id ? 'flex' : 'none'}}
                                    onClick = { _ => this.onButtonConfirmEdit('type')}
                                >
                                    <CheckIcon/>
                                </div>
                                <div id = 'clear-icon' 
                                    style = {{display : typeHoverId === id ? 'flex' : 'none'}}
                                    onClick = { _ => this.onButtonCancel('type')}
                                >
                                    <ClearIcon/>
                                </div>
                            </td>
                        :
                            <td>
                                <div id = 'edit-icon'
                                    style = {{display : typeHoverId === id ? 'flex' : 'none'}}
                                    onClick = { _ => this.onButtonEdit('type', id, name, brand_id)}
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
        const { tabValue, page, rowPerPage, typePage, typeRowPerPage, addBrand, deleteBrand, addType, deleteType } = this.state
        const { motorBrandTotal, carBrandTotal, motorTypeTotal, carTypeTotal, car, motor } = this.props
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
                <Modal 
                    open = {addBrand || addType}
                    onClose = { _ => this.setState({ addBrand : false })}
                    title = { addBrand ? 'Add new brand' : 'Add new type'}
                    handleOk = {this.onButtonConfirmAdd}
                    cancelButton = {true}
                    handleCancel = { _ => this.setState({ addBrand : false, addType : false, addBrandId : null })}
                >
                    {
                        addBrand ?
                        <input
                            type = 'text' 
                            placeholder = 'add your new brand'
                            ref = 'newbrand'
                            autoFocus
                            style = {{ height : 40, padding : 10}}
                        />
                        :
                        <>
                        <Select
                            value = {addBrand || 1}
                            onChange = {(e) => this.setState({addBrandId : e.target.value})}
                            disableUnderline = {true}
                            style = {{ width : 200, marginRight : 20}}
                        >
                        {
                            (tabValue ? motor : car).map(({id, brand}) => (
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
                        </>

                    }
                </Modal>
                {/* MOADAL FOR DELETE CONFIRMATION */}
                <Modal
                    open = {Boolean(deleteBrand)}
                    onClose = { _ => this.setState({deleteBrand : null})}
                    title = 'Delete confirmation ?'
                    handleOk = { _ => this.onButtonConfirmDelete('brand')}
                />
                <Modal
                    open = {Boolean(deleteType)}
                    onClose = { _ => this.setState({deleteType : null})}
                    title = 'Delete confirmation ?'
                    handleOk = { _ => this.onButtonConfirmDelete('type')}
                />
                <Loading open = {this.props.loading}/>
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
        car : vehicle.car,
        motor : vehicle.motor,
        loading : vehicle.loading
    }
}

const mapDispatch = () => {
    return {
        getPathAction,
        getTotalVehicle,
        getVehicle,
        getBrand,
        addVehicle,
        editVehicle,
        deleteVehicle
    }
}

export default connect(mapStore, mapDispatch())(Vehicles)