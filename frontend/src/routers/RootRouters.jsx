import React from "react";
import { Route, Routes } from "react-router-dom";
import Order from "../Components/RouteComp/Order/Order";
import Accessories from "../Components/RouteComp/Accessories/Accessories";
import Phones from "../Components/RouteComp/Phones/Phones";
import Favorites from "../Components/RouteComp/Favorites/Favorites";
import Tablets from "../Components/RouteComp/Tablets/Tablets";
import ShoppingCart from "../Components/RouteComp/ShopppingCart/ShoppingCart";
import Login from "../Components/RouteComp/LogIn/Login";
import Logout from "../Components/RouteComp/LogOut/Logout";
import Registration from "../Components/RouteComp/Registration/Registration";

import HomePage from "../pages/HomePage/HomePage";

const RootRouters = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/order" element={<Order />} />
      <Route path="/accessories" element={<Accessories />} />
      <Route path="/phones" element={<Phones />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/shopingcart" element={<ShoppingCart />} />
      <Route path="/tablets" element={<Tablets />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />
    </Routes>
  );
};

export default RootRouters;
