import { useState } from 'react'
import Router from 'react-router-dom'
import Header from "./shared/Header"
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Header />
    </Router>
  )
}

export default App
