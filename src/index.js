import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

// setup redux
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import ReduxThunk from 'redux-thunk'

// import main component
import Main from './main'

// import style
import './styles/index.scss'

ReactDOM.render(
    <BrowserRouter>
        <Main/>
    </BrowserRouter>
    ,document.getElementById('root')
)