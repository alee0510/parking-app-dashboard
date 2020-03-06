import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

// from react-slick
import "~slick-carousel/slick/slick.css"
import "~slick-carousel/slick/slick-theme.css"

// setup redux
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import ReduxThunk from 'redux-thunk'
import allReducers from './reducers'

// import main component
import Main from './main'

// import style
import './styles/index.scss'

// create store
const store = createStore(allReducers, {}, composeWithDevTools(applyMiddleware(ReduxThunk)))

ReactDOM.render(
    <Provider store = {store}>
        <BrowserRouter>
            <Main/>
        </BrowserRouter>
    </Provider>, document.getElementById('root')
)