import { Routes, Route, useLocation } from "react-router-dom";

import Home from "./components/Home";
import Header from "./Features/Header";
import Notfound from "./components/Notfound";
import Cart from "./components/Cart";
import ProductList from "./components/ProductList";
import Productdetail from "./components/Productdetail";
import Checkout from "./components/Checkout";
import Login from "./components/login.jsx";
import Register from "./components/Register.jsx";
import ProtectedRoute from "./components/ProtectedRoute";
import Wishlist from "./components/Wishlist";
import Profile from "./components/Profile";
import Address from "./components/Address";
import Orders from "./components/Orders";
import AiAssistant from "./components/AiAssistant";

function App() {
  const location = useLocation();

  const hideHeaderRoutes = ["/login", "/register"];

  const shouldHideHeader = hideHeaderRoutes.includes(
    location.pathname.toLowerCase()
  );

  return (
    <>
      {!shouldHideHeader && <Header />}

      <Routes>
        {/* MAIN HOME PAGE */}
        <Route path="/" element={<Home />} />

        {/* PRODUCT COLLECTION PAGE */}
        <Route path="/productlist" element={<ProductList />} />

        {/* PRODUCT DETAILS */}
        <Route
          path="/productdetail/:productId"
          element={<Productdetail />}
        />

        {/* PROTECTED ROUTES */}
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />

        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />

        <Route
          path="/address"
          element={
            <ProtectedRoute>
              <Address />
            </ProtectedRoute>
          }
        />

        {/* 404 */}
        <Route path="*" element={<Notfound />} />
      </Routes>

      <AiAssistant />
    </>
  );
}

export default App;