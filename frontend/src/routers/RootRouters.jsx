import React from "react";
import { Route, Routes } from "react-router-dom";
import Order from "../Components/RouteComp/Order/Order";
import AccessoriesPage from "../pages/AccessoriesPage/AccessoriesPage";
import Phones from "../Components/RouteComp/Phones/Phones";
import Favorites from "../Components/RouteComp/Favorites/Favorites";
import Tablets from "../Components/RouteComp/Tablets/Tablets";
import ShoppingCart from "../Components/RouteComp/ShopppingCart/ShoppingCart";
import Login from "../pages/LogIn/Login";
// import Logout from "../Components/RouteComp/LogOut/Logout";
import Registration from "../pages/Registration/Registration";
import HomePage from "../pages/HomePage/HomePage";
import WrongRoute from "../pages/WrongRoutePage/WrongRoute";
import SingleProductPage from "../pages/SIngleProductPage/SingleProductPage";
import SingleAccessoriesPage from "../pages/SingleAccessoriesPage/SingleAccessoriesPage";

const RootRouters = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/order" element={<Order />} />
      <Route path="/accessories" element={<AccessoriesPage />} />
      <Route
        path="/accessories/:accessoryId"
        element={<SingleAccessoriesPage />}
      />
      <Route path="/phones" element={<Phones />} />
      <Route path="/phones/:modelId" element={<SingleProductPage />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/shopingcart" element={<ShoppingCart />} />
      <Route path="/tablets" element={<Tablets />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/login" element={<Login />} />
      {/* <Route path="/logout" element={<Logout />} /> */}
      <Route path="*" element={<WrongRoute />} />
    </Routes>
  );
};

export default RootRouters;
