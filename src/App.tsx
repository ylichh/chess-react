import { useState } from 'react'

import './App.css'
import TableroTag from './components/Tablero'

function App() {
  const [count, setCount] = useState(0)

  return (
    <TableroTag>
    </TableroTag>
  )
}

export default App
