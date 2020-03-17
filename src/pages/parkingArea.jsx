import React from 'react'
import { connect } from 'react-redux'
import { IconButton } from '@material-ui/core'

// import icons
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import CameraAltIcon from '@material-ui/icons/CameraAlt'

// import actions creator
import { getParkng, getPathAction, editParking } from '../actions'

// import components
import Table from '../components/table'
import Modal from '../components/modal'

// import styles
import '../styles/parkingArea.scss'


class ParkingArea extends React.Component {
    state = {
        hoverId : null,
        edit : null,
        add : null,
        image : null,
        address : '',
        city : '',
        province : '',
        carCost : null,
        motorCost : null,
        carSlot : '',
        motorSlot : '',
        placeName : '',
    }

    componentDidMount () {
        this.props.getPathAction('parking')
        this.props.getParkng()
    }

    onButtonEdit = (id, index) => {
        const data = this.props.parking[index]
        this.setState({ 
            edit : id,
            image : data.image,
            address : data.address,
            city : data.city,
            province : data.province,
            carCost : data.car_cost,
            motorCost : data.motor_cost,
            carSlot : data.car_slot,
            motorSlot : data.motor_slot,
            placeName : data.place_name
        })
    }

    onButtonCancel = () => {
        this.setState({ 
            edit : false,
            image : '',
            address : '',
            city : '',
            province : '',
            carCost : null,
            motorCost : null,
            carSlot : null,
            motorSlot :null,
            placeName : ''
        })
    }

    onEditConfirm = () => {
        this.setState({edit : true})
    }

    tableParking = () => {
        const { hoverId } = this.state
        return this.props.parking.map(({
            id, 
            company, 
            city,
            car_cost, 
            motor_cost, 
            car_slot,
            motor_slot, 
            place_name,
        }, index) => (
            <tr 
                key = {id}
                onMouseEnter = { _ => this.setState({ hoverId : id })}
                onMouseLeave = { _ => this.setState({ hoverId : 0 })}
            >
                <td></td>
                <td>{company}</td>
                <td>{city}</td>
                <td>{car_cost}</td>
                <td>{motor_cost}</td>
                <td>{car_slot}</td>
                <td>{motor_slot}</td>
                <td>{place_name}</td>
                <td>
                    <div id = 'edit-icon' 
                        style = {{display : hoverId === id ? 'flex' : 'none'}}
                        onClick = { _ => this.onButtonEdit(id, index)}
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
        const { 
            edit, 
            image, 
            address, 
            city, 
            province, 
            carCost, 
            motorCost, 
            carSlot, 
            motorSlot, 
            placeName 
        } = this.state
        const { parking } = this.props
        const styles = {
            input : {
                height : 40,
                width : '100%',
                padding : 10,
                marginBottom : 15,
            },
            title : {
                fontSize : 16,
                fontWeigth : 600,
                textTransform : 'capitalize',
                paddingBottom : 10
            },
            upload : {
                height : 160, 
                width : '100%', 
                backgroundColor : '#f2f2f2',
                display : 'flex',
                justifyContent : 'center',
                alignItems : 'center'
            }
        }

        return (
            <div className = 'parking-main-container'>
                <h1>Parking Area</h1>
                <div className = 'parking-table-container'>
                    <Table
                        className = 'table'
                        headerItems = {['company', 'city', 'car (rp)', 'motor (rp)', 'car slot', 'motor slot', 'place']}
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
                <Modal 
                    open = {Boolean(edit)} //editIndex === 0 ? true : Boolean(editIndex)
                    onClose = { _ => this.onButtonCancel()}
                    title = 'Edit Parking Area'
                    handleOk = {this.handleAddBrand}
                    cancelButton = {true}
                    handleCancel = { _ => this.onButtonCancel()}
                    style = {{ display : 'flex', flexDirection : 'row', width : '100%'}}
                >
                    <form style = {{marginRight : 15}}>
                        <h1 style = {styles.title}>addres</h1>
                        <input
                            type = 'text' 
                            value = {address}
                            autoFocus
                            style = {styles.input}
                        />
                        <h1 style = {styles.title}>city</h1>
                        <input
                            type = 'text' 
                            value = {city}
                            style = {styles.input}
                        />
                        <h1 style = {styles.title}>province</h1>
                        <input
                            type = 'text' 
                            value = {province}
                            style = {styles.input}
                        />
                        <h1 style = {styles.title}>car cost (per-10 minutes)</h1>
                        <input
                            type = 'number' 
                            value = {carCost}
                            style = {styles.input}
                        />
                        <h1 style = {styles.title}>motor cost (per-10 minute)</h1>
                        <input
                            type = 'number' 
                            value = {motorCost}
                            style = {styles.input}
                        />
                    </form>
                    <form>
                        <h1 style = {styles.title}>car slot</h1>
                        <input
                            type = 'number' 
                            value = {carSlot}
                            style = {styles.input}
                        />
                        <h1 style = {styles.title}>motor slot</h1>
                        <input
                            type = 'number' 
                            value = {motorSlot}
                            style = {styles.input}
                        />
                        <h1 style = {styles.title}>place name</h1>
                        <input
                            type = 'text' 
                            value = {placeName}
                            style = {styles.input}
                        />
                        <div style = {styles.upload}>
                            {
                                image ? 
                                <image src = {image} alt = 'area-img'/> 
                                :
                                <IconButton>
                                    <CameraAltIcon fontSize="large" />
                                </IconButton>
                            }
                        </div>
                    </form>
                </Modal>
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