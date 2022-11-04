import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { loadUser } from "./actions/userAction";
import "./App.scss";
import Navbar from "./components/Navbar/Navbar";
import PrivetRoute from "./components/PrivetRoute/PrivetRoute";
import Sidebar from "./components/Sidebar/Sidebar";
import CreateProduct from "./pages/CreateProduct/CreateProduct";
import CreateUser from "./pages/CreateUser/CreateUser";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import UpdateProduct from "./pages/ProductDetails/UpdateProduct";
import ProductList from "./pages/ProductList/ProductList";
import Register from "./pages/Register/Register";
import UserDetails from "./pages/UserDetails/UserDetails";
import UserList from "./pages/UserList";
import store from "./store";

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <div>
      <div className="dashboard">
        <Sidebar />

        <div className="workspace">
          <Navbar />
          <Routes>
            {/* Dashboard */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/create-user"
              element={
                <PrivetRoute>
                  <CreateUser />
                </PrivetRoute>
              }
            />
            <Route
              path="/product-list"
              element={
                <PrivetRoute>
                  <ProductList />
                </PrivetRoute>
              }
            />
            <Route
              path="/users"
              element={
                <PrivetRoute>
                  <UserList />
                </PrivetRoute>
              }
            />
            <Route
              path="/user/:id"
              element={
                <PrivetRoute>
                  <UserDetails />
                </PrivetRoute>
              }
            />
            <Route
              path="/create-product"
              element={
                <PrivetRoute>
                  <CreateProduct />
                </PrivetRoute>
              }
            />
            <Route
              path="/product-details/:id"
              element={
                <PrivetRoute>
                  <ProductDetails />
                </PrivetRoute>
              }
            />
            <Route
              path="/update/:id"
              element={
                <PrivetRoute>
                  <UpdateProduct />
                </PrivetRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
