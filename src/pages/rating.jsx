import React from 'react'
import { connect } from 'react-redux'
import StarIcon from '@material-ui/icons/Star'

// import actions creator
import { getPathAction, getRating, getTotalRating } from '../actions'

// import table
import Table from '../components/table'
import Loading from '../components/loading'

// import style
import '../styles/rating.scss'

class Rating extends React.Component {
    state = {
        page : 1,
        rowPerPage : 10,
    }

    componentDidMount() {
        this.props.getPathAction('rating')
        this.props.getRating(this.state.rowPerPage)
        this.props.getTotalRating()
    }

    handleOption = (value) => {
        this.setState({ rowPerPage : value, page : 1})
        this.props.getRating(value)
    }

    onButtonNext = () => {
        const { page, rowPerPage } = this.state

        // check page
        if (page * rowPerPage >= this.props.total) return null
        this.setState({page : page + 1})

        // get last id and do query
        const lastId = this.props.ratings[rowPerPage - 1].id

        // do request by check tab value
        this.props.getRating(rowPerPage, lastId)
    }

    onButtonPrev = () => {
        const { page, rowPerPage } = this.state

        // check page
        if (page <= 1) return null
        this.setState({page : page - 1})

        // get last id and do query
        const firstId = this.props.ratings[0].id

        // do request by check tab value
        this.props.getRating(rowPerPage, null, firstId)
    }

    tableRating = () => {
        return this.props.ratings.map(({id, username, rating, message, date, place_name}) => (
            <tr key = {id}>
                <td></td>
                <td>{username}</td>
                <td>
                    {
                        new Array(rating).fill(0).map((item, index) => (<StarIcon key = {index} style ={{ color : '#ffb900'}}/>))
                    }
                </td>
                <td>{message}</td>
                <td>{date}</td>
                <td>{place_name}</td>
                <td></td>
            </tr>
        ))
    }

    render () {
        const { rowPerPage, page } = this.state
        return (
            <div className = 'rating-main-container'>
                <h1>Rating</h1>
                <div className = 'rating-table-container'>
                    <Table
                    className = 'table'
                    headerItems = {['username', 'rating', 'message', 'date', 'place']}
                    menuItems = {[10, 15, 20, 25, 30]}
                    optionValue = {rowPerPage}
                    handleOption = {this.handleOption}
                    page = {page}
                    rowPerPage = {rowPerPage}
                    totalPage = {Math.ceil(this.props.total / rowPerPage)}
                    tableBody = {this.tableRating}
                    handlePrevious = {this.onButtonPrev}
                    handleNext = {this.onButtonNext}
                    addButton = {false}
                    />
                </div>
                <Loading open = {this.props.loading}/>
            </div>
        )
    }
}

const mapStore = ({ rating }) => {
    return {
        ratings : rating.data,
        total : rating.total,
        loading : rating.loading
    }
}

const mapDispatch = () => {
    return {
        getPathAction,
        getRating,
        getTotalRating
    }
}

export default connect(mapStore, mapDispatch())(Rating)