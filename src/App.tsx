import React from 'react'
import logo from './logo.svg'
import './App.css'

import { useGetYunlinWeatherQuery } from 'api/weather'

function App() {
  const { data, isLoading } = useGetYunlinWeatherQuery({
    Authorization: process.env.REACT_APP_OPENDATA_KEY,
  })

  console.log(data)

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {isLoading && <p>isLoading...</p>}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App
