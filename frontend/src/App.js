import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Tablets from "./components/RouteComp/Tablets/Tablets";
import Accessories from "./components/RouteComp/Accessories/Accessories";
import ShoppingCart from "./components/RouteComp/ShopppingCart/ShoppingCart";
import Phones from "./components/RouteComp/Phones/Phones";
import Favorites from "./components/RouteComp/Favorites/Favorites";
import Login from "./components/RouteComp/LogIn/Login";
import Logout from "./components/RouteComp/LogOut/Logout";
import Registration from "./components/RouteComp/Registration/Registration";
import Order from "./components/RouteComp/Order/Order";
import Main from "./components/RouteComp/Main/Main";

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/order" element={<Order />} />
          <Route path="/accessories" element={<Accessories />} />
          <Route path="/products/color=blue" element={<Phones />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/shopingcart" element={<ShoppingCart />} />
          <Route path="/tablets" element={<Tablets />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
