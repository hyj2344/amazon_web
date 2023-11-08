import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";

import './style/CartBar.css';

function CartBar() {
    const user = useSelector(state => state.user)
    const cart = useSelector(state => state.cart);

    const navigate = useNavigate()
    const [length, setLength] = useState(cart.length)
    const handleCart = () => {
        if (user) navigate("/cart")
        else navigate("/signin")
    }
    useEffect(() => {
        setLength(cart.length);
    }, [cart.length])

    useEffect(() => {
        if (!user) navigate("/")
    }, [user])
    return (
        <div id='CartBar' onClick={() => handleCart()}>
            <div>
                <img id="CartBar-i1" alt="image" src="/cart-icon.png" />
                {
                    (cart.length>0) && (<span class='badge badge-warning' id='lblCartCount'> {length} </span>)
                }

            </div>

            <span className="headerspanbot">Cart</span>
        </div>
    )
}


export default CartBar;
