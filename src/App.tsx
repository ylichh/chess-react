import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Tablero from './components/Tablero'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Tablero>
    </Tablero>
  )
}

export default App
