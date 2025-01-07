import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {  Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import PagenotFound from "./pages/PagenotFound";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";

import PrivateRoute from "./components/privateRoutes/PrivateRoute";
import ForgotPassword from "./pages/auth/ForgotPassword";
import AdminPrivateRoute from "./pages/admin/AdminPrivateRoute";

import UserProfile from "./pages/user/UserProfile";
import Order from "./pages/user/Order";
import CreateCategory from "./pages/admin/CreateCategory";
import CreateProduct from "./pages/admin/CreateProduct";
import Products from "./pages/admin/Products";
import UpdateProduct from "./pages/admin/UpadateProduct";
import SearchResult from "./pages/SearchResult";
import ProductDetail from "./pages/ProductDetail";
import Category from "./pages/Category";
import CategoryProduct from "./pages/CategoryProduct";
import CartPage from "./pages/CartPage";
import UserProfileDashboard from "./pages/user/DashBoard";
import AdminOrders from "./pages/admin/AdminOrder";
import Users from "./pages/admin/Users";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product-detail/:slug" element={<ProductDetail />} />
        <Route path="/category" element={<Category/>} />
        <Route path="/category/:slug" element={<CategoryProduct/>} />
        
        <Route path="/cart" element={<CartPage/>} />

        <Route path="/search" element={<SearchResult />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<UserProfileDashboard />} />
          <Route path="user/profile" element={<UserProfile />} />
          <Route path="user/order" element={<Order />} />
        </Route>
        <Route path="/dashboard" element={<AdminPrivateRoute />}>
          <Route path="admin" element={<Users />} />
          <Route path="admin/create-category" element={<CreateCategory/>} />
          <Route path="admin/create-products" element={<CreateProduct />} />
          <Route path="admin/products" element={<Products/>} />
          <Route path="admin/edit-order" element={<AdminOrders/>} />
          <Route path="admin/update-product/:slug" element={<UpdateProduct/>} />
        </Route>
        <Route path="/login" element={<Login />} />
        
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="*" element={<PagenotFound />} />
      </Routes>
    </>
  );
}

export default App;
