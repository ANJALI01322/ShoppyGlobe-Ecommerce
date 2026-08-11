import { Route, Routes } from "react-router-dom"
import Home from "./components/Home"
import Header from "./Features/Header"
import Notfound from "./components/Notfound"
import Cart from "./components/Cart"
import ProductList from "./components/ProductList"
import Productdetail from "./components/Productdetail"
import Checkout from "./components/Checkout"
import Login from "./components/login.jsx";      
import Register from "./components/Register.jsx";
import ProtectedRoute from "./components/ProtectedRoute"



function App() {

  return (
    <>
    <Header/>
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/productlist" element={<ProductList />} />
      <Route path="/productdetail/:productId" element={<Productdetail />} />
      
      <Route path="/checkout" element={<Checkout/>}></Route>
      <Route path="*" element={<Notfound/>}></Route>
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register />} />
      <Route path="/cart" element={<Cart />} />
</Routes>


 
  </>
  )
}

export default App
