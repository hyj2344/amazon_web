import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { cartClearFunction, cartRemoveProductFunction, cartQuantityFunction } from "../../store/cart";

import "./style/Cart.css";

function Cart() {
    const navigate = useNavigate()
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch()
    const [subtotal, setSubtotal] = useState(0);
    const [total, setTotal] = useState(0);
    const [submit, setSubmit] = useState(true);
    const [selectQuantity, setSelectQuantity] = useState(0)
    const realPrice = (price, discount = 0) => price * (1 - (discount / 100));
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

    const handleOrder = async () => {
        debugger
        const response = await fetch("/api/defaddresses", { method: 'GET' })
        const responseJSON = await response.json();
        if (responseJSON.length == 0) alert("please set your default address");
        else {
            await fetch("/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/JSON" },
                body: JSON.stringify({ subtotal: subtotal, cart: cart }),
            });
            await dispatch(cartClearFunction())
            navigate("/orders")
        }

    }

    const handleRemoveProduct = async (id) => {
        await dispatch(cartRemoveProductFunction(id))
    }

    const handleSubmit = async (id) => {
        setSubmit(!submit)
        await dispatch(cartQuantityFunction(id, selectQuantity))
    }

    useEffect(() => {
        let sum = 0; let sum1 = 0;
        for (let i = 0; i < cart.length; i++) {
            if (cart[i][0].discount) {
                sum += realPrice(cart[i][0].price, cart[i][0].discount) * cart[i][1];
                sum1 += cart[i][0].price * cart[i][1];
            }
            else {
                sum += cart[i][0].price * cart[i][1];
                sum1 += cart[i][0].price * cart[i][1];
            }
        }
        setSubtotal(sum.toFixed(2));
        setTotal(sum1.toFixed(2))
    }, [cart, submit])

    return (
        <div id="Cart">
            <div id="Cart-d1">
                <div id="Cart-d1d1">
                    {
                        (cart.length > 0) && (
                            <>
                                <div id="Cart-d1d1d1">
                                    <span id="Cart-d1d1d1s1">Shopping Cart</span>
                                </div>
                                <div id="Cart-d1d1d2">
                                    {
                                        cart.map(element => {
                                            const [product, quantity] = element;
                                            return (
                                                <div className="Cart-d1d1d2-card">
                                                    <div className="Cart-d1d1d2d1d1">
                                                        <img className="Cart-d1d1d2d1d1i1" src={product.medias[0].url} />
                                                    </div>
                                                    <div className="Cart-d1d1d2d1d2">
                                                        <NavLink style={{ textDecoration: 'none' }} to={`/products/${product.id}`}><span>{product.name}</span></NavLink>
                                                        {/* <div className="Cart-d1d1d2d1d2d1">
                                                            <button className="Cart-d1d1d2d1d2d1b1" type="button" onClick={() => handleRemoveProduct(product.id)}>Remove</button>
                                                        </div> */}
                                                        <div className="Cart-d1d1d2d1d2d2">
                                                            {/* <ProductQuantity {...{ element }} /> */}
                                                            <div className="Card-d2d1d2d1">
                                                                <span className="Card-d2d1d2d1s1">Quantity</span>
                                                                <select className="Card-d2d1d2d1sel1" onChange={(e) => setSelectQuantity(e.target.value)}>
                                                                    <option selected value={quantity} disabled>{quantity}</option>
                                                                    {/* <option selected="true" disabled="disabled">--Please choose an option--</option> */}
                                                                    {
                                                                        numbers.map(number => {
                                                                            return (
                                                                                <option value={number}>{number}</option>
                                                                            )
                                                                        })
                                                                    }
                                                                </select>
                                                                <button className="Card-d2d1d2d1b1" type="button" onClick={() => handleSubmit(product.id)}>Submit</button>
                                                            </div>

                                                            <div className="Cart-d1d1d2d1d2d1">
                                                                <button className="Cart-d1d1d2d1d2d1b1" type="button" onClick={() => handleRemoveProduct(product.id)}>Remove</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="Cart-d1d1d2d1d3">
                                                        <div>
                                                            <span>{`$${(realPrice(product.price, product.discount)).toFixed(2)}`}</span>
                                                        </div>
                                                        <div id='ProductInformation-d2d1d2'>
                                                            <span id='ProductInformation-d2d1d2s1'>List Price: $</span>
                                                            <span id='ProductInformation-d2d1d2s2'>{product.price}</span>
                                                        </div>

                                                    </div>

                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                {/* <div id="Cart-d1d1d3">
                                    <span id="Cart-d1d1d3s1">{`Subtotal: `}</span>
                                    <span id="Cart-d1d1d3s2">{`$${subtotal}`}</span>
                                </div> */}
                            </>
                        )
                    }
                    {
                        (!cart.length) && <span id="Cart-d1d1d1s1">Your amazon Cart is empty</span>
                    }
                </div>
            </div>
            <div id="Cart-d2">
                <div id="Cart-d2d1">
                    <div id="Cart-d2d1d1">
                        <span id="Cart-d1d1d3s1">{`Subtotal:`}</span>
                        <span id="Cart-d1d1d3s2">{`$${subtotal}`}</span>

                    </div>
                    <div>
                        <span id="Cart-d1d1d3s1">{`You saved:`}</span>
                        <span id="Cart-d1d1d3s2">{`$${(total - subtotal).toFixed(2)}`}</span>
                    </div>
                    {
                        (cart.length > 0) && <div id="Cart-d2d1d2">
                            <button id="Cart-d2d1d2b1" onClick={() => handleOrder()} type="button">Place your order</button>
                        </div>
                    }

                </div>
            </div>
        </div>
    )
}

export default Cart;
