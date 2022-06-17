import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import './normalize.css'
import { store } from './store'
import { Provider } from 'react-redux'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter } from 'react-router-dom'
import Router from 'router'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Router></Router>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)

// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log)
