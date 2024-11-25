import './App.css';
import Home from './components/home/Home.jsx';
import Signup from './components/signup/Signup.jsx';
import Login from './components/signup/Login.jsx';
import Products from './components/AllProducts/ProductList.jsx';
import Cart from './components/AllProducts/Cart.jsx';
import AboutUs from './components/About/About.jsx'; 
import CreatePost from './components/Profile/CreatePost.jsx';
import Profile from './components/Profile/Profile.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
 



function App() {
  return (


<Router>
    <Routes>
     <Route path="/user/signup" element={<Signup />} />
     <Route path="/" element={<Login />} />
     <Route path="/home" element={<Home />} />
     <Route path="/products" element={<Products />} />  
     <Route path="/cart" element={<Cart />} />
     <Route path="/about" element={<AboutUs />} />
     <Route path="/profile" element={<Profile />} />
     <Route path="/create-post" element={<CreatePost />} />
     </Routes>
     </Router>
      
  )
}

export default App;
