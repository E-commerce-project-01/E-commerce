import { useState } from 'react'
import './App.css'
import Admin from './components/Admin/admin'
function App() {
  const [count, setCount] = useState(0)

  return (
      <div>
        <Admin />
      </div>
      
  )
}

export default App