import React from "react";
import { Route, Routes } from "react-router-dom";
import Order from "../Components/RouteComp/Order/Order";
import AccessoriesPage from "../pages/AccessoriesPage/AccessoriesPage";
import PhonesPage from "../pages/PhonesPage/PhonesPage";
import FavoritesPage from "../pages/FavoritesPage/FavoritesPage";
import TabletsPage from "../pages/TabletsPage/TabletsPage";
import CartPage from "../pages/CartPage/CartPage";
import Login from "../pages/LogIn/Login";
import Registration from "../pages/Registration/Registration";
import HomePage from "../pages/HomePage/HomePage";
import WrongRoute from "../pages/WrongRoutePage/WrongRoute";
import SingleProductPage from "../pages/SIngleProductPage/SingleProductPage";
import SingleAccessoriesPage from "../pages/SingleAccessoriesPage/SingleAccessoriesPage";
import Right from "../pages/Right/Right";
import Contacts from "../pages/Contacts/Contacts";
import User from "../pages/User/User";
import SearchPage from "../pages/SearchPage/SearchPage";
import UserUpdatePass from "../pages/User/UserUpdatePass/UserUpdatePass";
import CheckoutPage from "../pages/CheckoutPage/CheckoutPage";
import UserDataInformation from "../pages/User/UserDataInformation/UserDataInformation";
import AdminPage from "../pages/AdminPage/AdminPage";

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
      <Route path="/phones" element={<PhonesPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/phones/:modelId" element={<SingleProductPage />} />
      <Route path="/favorites" element={<FavoritesPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/tablets" element={<TabletsPage />} />
      <Route path="/tablets/:modelId" element={<SingleProductPage />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/login" element={<Login />} />
      <Route path="/user" element={<User />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/data-information" element={<UserDataInformation />} />
      <Route path="/update-password" element={<UserUpdatePass />} />
      <Route path="/right" element={<Right />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/contacts" element={<Contacts />} />
      <Route path="*" element={<WrongRoute />} />
    </Routes>
  );
};

export default RootRouters;
