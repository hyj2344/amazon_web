import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import SearchBar from "./SearchBar";
import UserBar from "./UserBar";
import OrdersBar from "./OrdersBar";
import CartBar from "./CartBar";

import './style/Header.css'

function Header() {
    const navigate = useNavigate();

    const handleLogo = () => navigate("/")

    return (
        <div id='Header'>
            <div id='Header-d1'>
                <div id='Header-d1d1'>
                    {/* <img src="/amazon-logo-white.png" alt="" style={ { height: '40px' } } onClick={ () => handleLogo() } /> */}
                    <NavLink id='Header-d1d1nl1' to={"/"}><span id='Header-d1d1nl1s1'>amaz</span><span id='Header-d1d1nl1s2'>on</span></NavLink>
                </div>
                <div id='Header-d1d2'>
                    <SearchBar />
                </div>
                <div id='Header-d1d3'>
                    <UserBar />
                    <OrdersBar />
                    <CartBar />
                </div>
            </div>
        </div>
    )
}


export default Header;
