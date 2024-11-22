import './App.css'
import Home from './components/home/Home'
import Signup from './Components/signup/Signup.jsx'
import Login from './Components/signup/Login.jsx';
import CreatePost from './Components/Profile/CreatePost.jsx';
import Profile from './Components/Profile/Profile.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
function App() {

  return (
   
    <Router>
    <Routes>
      
     <Route path="/user/signup" element={<Signup />} />
     <Route path="/" element={<Login />} />
     <Route path="/home" element={<Home />} />
     <Route path="/profile" element={<Profile />} />
     <Route path="/create-post" element={<CreatePost />} />
     </Routes>
   </Router>
      
  )
}

export default App