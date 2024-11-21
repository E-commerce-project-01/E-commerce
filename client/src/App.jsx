import { useState } from 'react'
import Signup from './Components/signup/Signup.jsx'
import Login from './Components/signup/Login.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
    <Routes>
     <Route path="/user/signup" element={<Signup />} />
     <Route path="/" element={<Login />} />


     </Routes>
   
   
   </Router>
      
  )
}

export default App