import React from 'react'
import { connect } from 'react-redux'
import { IconButton, CircularProgress } from '@material-ui/core'
import { API_URL } from '../helpers/apiUrl'

// import icons
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import CameraAltIcon from '@material-ui/icons/CameraAlt'

// import actions creator
import { 
    getPathAction,
    getParkng, 
    editParking, 
    uploadParkingImage, 
    deleteParking,
    addParking 
} from '../actions'

// import components
import Table from '../components/table'
import Modal from '../components/modal'
import Loading from '../components/loading'

// import styles
import '../styles/parkingArea.scss'


class ParkingArea extends React.Component {
    state = {
        hoverId : null,
        edit : null,
        add : false,
        deleteId : null,
        image : null,
        address : '',
        city : '',
        province : '',
        carCost : '',
        motorCost : '',
        carSlot : '',
        motorSlot : '',
        placeName : '',
        imageHover : false
    }

    componentDidMount () {
        this.props.getPathAction('parking')
        this.props.getParkng()
    }

    onButtonEdit = (id, index) => {
        const data = this.props.area[index]
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
            edit : null,
            add : false,
            image : null,
            address : '',
            city : '',
            province : '',
            carCost : '',
            motorCost : '',
            carSlot : '',
            motorSlot : '',
            placeName : ''
        })
    }

    onEditConfirm = () => {
        const data = {
            address : this.state.address,
            city : this.state.city,
            province : this.state.province,
            car_cost : this.state.carCost,
            motor_cost : this.state.motorCost,
            car_slot : this.state.carSlot,
            motor_slot : this.state.motorSlot,
            place_name : this.state.placeName
        }
        if (this.state.edit) {
            this.props.editParking(this.state.edit, data)
        } else {
            this.props.addParking(data)
        }
        this.onButtonCancel()
    }

    onChooseImage = (e) => {
        const data = new FormData()
        data.append('IMG', e.target.files[0])

        // do upload request
        this.props.uploadParkingImage(this.state.edit, data)
    }

    onButtonDelete = () => {
        this.props.deleteParking(this.state.deleteId)
        this.setState({ deleteId : null })
    }
    
    tableParking = () => {
        const { hoverId } = this.state
        return this.props.area.map(({
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
                        onClick = { _ => this.setState({ deleteId : id })}
                    >
                        <DeleteIcon/>
                    </div>
                </td>
            </tr>
        ))
    }

    renderButtonUpload = () => (
        <IconButton 
        variant="contained" 
        component="label"
        className ='upload-button-choose'
        >
            <input type = "file" 
                accept = "image/*" 
                style = {{ display: "none" }} 
                name = "IMG"
                onChange = {e => this.onChooseImage(e)}
            />
            <CameraAltIcon fontSize = 'large'/>
        </IconButton>
    )

    render () {
        const { 
            edit,
            add,
            deleteId, 
            image, 
            address, 
            city, 
            province, 
            carCost, 
            motorCost, 
            carSlot, 
            motorSlot, 
            placeName,
            imageHover 
        } = this.state
        const styles = {
            input : {
                height : 40,
                width : 300,
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
            },
            imageContainer : {
                height : '100%', 
                width : '100%', 
                cursor : 'pointer', 
                display : 'flex',
                justifyContent : 'center', 
                alignItems : 'center',
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
                        handleClickAdd = { _ => this.setState({ add : true})}
                    />
                </div>
                <Modal 
                    open = {Boolean(edit) || add} //editIndex === 0 ? true : Boolean(editIndex)
                    onClose = { _ => this.onButtonCancel()}
                    title = 'Edit Parking Area'
                    handleOk = {this.onEditConfirm}
                    cancelButton = {true}
                    handleCancel = { _ => this.onButtonCancel()}
                    style = {{ display : 'flex', flexDirection : 'row'}}
                >
                    <div style = {{marginRight : 15}}>
                        <h1 style = {styles.title}>addres</h1>
                        <input type = 'text' autoFocus
                            value = {address}
                            style = {styles.input}
                            onChange = { e => this.setState({ address : e.target.value })}
                        />
                        <h1 style = {styles.title}>city</h1>
                        <input type = 'text' 
                            value = {city}
                            style = {styles.input}
                            onChange = { e => this.setState({ city : e.target.value })}
                        />
                        <h1 style = {styles.title}>province</h1>
                        <input type = 'text' 
                            value = {province}
                            style = {styles.input}
                            onChange = { e => this.setState({ province : e.target.value })}
                        />
                        <h1 style = {styles.title}>car cost (per-10 minutes)</h1>
                        <input type = 'number' 
                            value = {carCost}
                            style = {styles.input}
                            onChange = { e => this.setState({ carCost : e.target.value })}
                        />
                        <h1 style = {styles.title}>motor cost (per-10 minute)</h1>
                        <input type = 'number' 
                            value = {motorCost}
                            style = {styles.input}
                            onChange = { e => this.setState({ motorCost : e.target.value })}
                        />
                    </div>
                    <div>
                        <h1 style = {styles.title}>car slot</h1>
                        <input type = 'number' 
                            value = {carSlot}
                            style = {styles.input}
                            onChange = { e => this.setState({ carSlot : e.target.value })}
                        />
                        <h1 style = {styles.title}>motor slot</h1>
                        <input type = 'number' 
                            value = {motorSlot}
                            style = {styles.input}
                            onChange = { e => this.setState({ motorSlot : e.target.value })}
                        />
                        <h1 style = {styles.title}>place name</h1>
                        <input type = 'text' 
                            value = {placeName}
                            style = {styles.input}
                            onChange = { e => this.setState({ placeName : e.target.value })}
                        />
                        <form encType="multipart/form-data" method = 'POST' style = {styles.upload}>
                            {
                                image ?
                                <div 
                                    style = {styles.imageContainer}
                                    onMouseEnter = { _ => this.setState({ imageHover : true })}
                                    onMouseLeave = { _ => this.setState({ imageHover : false })}
                                >
                                    {
                                        imageHover ? 
                                        this.renderButtonUpload() 
                                        : <img src = {API_URL + '/' + image} alt = 'area=img' width = '300px'/>
                                    }
                                </div>
                                :
                                this.props.loading ?
                                <CircularProgress variant="determinate" value = {this.props.progress}/>
                                :
                                this.renderButtonUpload()
                            }
                        </form>
                    </div>
                </Modal>
                {/* MOADAL FOR DELETE CONFIRMATION */}
                <Modal
                    open = {Boolean(deleteId)}
                    onClose = { _ => this.setState({deleteId : null})}
                    title = 'Delete confirmation ?'
                    handleOk = {this.onButtonDelete}
                />
                <Loading open = {this.props.loading}/>
            </div>
        )
    }
}

const mapStore = ({ parking }) => {
    return {
        area : parking.area,
        loading : parking.loading,
        progress : parking.progress
    }
}

const mapDispatch = () => {
    return {
        getParkng,
        getPathAction,
        editParking,
        uploadParkingImage,
        deleteParking,
        addParking
    }
}

export default connect(mapStore, mapDispatch())(ParkingArea)