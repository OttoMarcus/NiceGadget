import './App.css';
import Header from "./components/HeaderComp/Header";
import Main from "./components/MainComp/Main";
import Footer from "./components/FooterComp/Footer";
import Order from "./components/RouteComp/Order/Order";
import {Routes, Route, Link} from "react-router-dom";
import Tablets from "./components/RouteComp/Tablets/Tablets";
import Accessories from "./components/RouteComp/Accessories/Accessories";
import ShoppingCart from "./components/RouteComp/ShopppingCart/ShoppingCart";
import Phones from "./components/RouteComp/Phones/Phones";
import Favorites from "./components/RouteComp/Favorites/Favorites";
import Login from "./components/RouteComp/LogIn/Login";
import Logout from "./components/RouteComp/LogOut/Logout";
import Registration from "./components/RouteComp/Registration/Registration";

const App = () => {


    return (
        <>
            <div className="container">
                <Header/>
                <Routes>
                    <Route path="/" element={<Main/>}/>
                    <Route path="/order" element={<Order/>}/>
                    <Route path="/accessories" element={<Accessories/>}/>
                    <Route path="/phones" element={<Phones/>}/>
                    <Route path="/favorites" element={<Favorites/>}/>
                    <Route path="/shopingcart" element={<ShoppingCart/>}/>
                    <Route path="/tablets" element={<Tablets/>}/>
                    <Route path="/registration" element={<Registration/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/logout" element={<Logout/>}/>
                </Routes>
                <Footer/>
            </div>
        </>
    );
}

export default App;
