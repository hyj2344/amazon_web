import { useState } from "react";
import "./style/OrderCard.css"
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function OrderCard({ element, setReload, index }) {

    const navigate = useNavigate();
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ]
    const date = new Date(element.created_at);
    const day = date.getDate()
    const month = date.getMonth()
    const year = date.getFullYear()

    const handleCancelOrder = async () => {
        await fetch(`/api/orders/${element.id}`, { method: "DELETE" });
        setReload(true)
    }

    const submitReturn = async (innerElement) => {
        await fetch(`/api/orders_products/${innerElement.id}/return`, {
            method: "PUT",
            headers: { "Content-Type": "application/JSON" },
            body: JSON.stringify({ re: true })
        });
        navigate(`/return/${innerElement.id}`)
    }

    const realPrice = (price, discount = 0) => price * (1 - (discount / 100));

    return (
        <div className="OrderCard">
            <div className="OrderCard-d1">
                <div className="OrderCard-d1d1">
                    <span>ORDER PLACED</span>
                    <span>{`${months[month]} ${day}, ${year}`}</span>
                </div>
                <div className="OrderCard-d1d2">
                    <span>TOTAL</span>
                    <span>${element.subtotal}</span>
                </div>
                <div className="OrderCard-d1d3">
                    {/* <span>{`ORDER # ${element.id}`}</span> */}
                    <span>{`ORDER # ${index + 1}`}</span>
                </div>
            </div>
            <div className="OrderCard-d2">
                {
                    element.orders_products.map((innerElement) => {
                        const product = innerElement.product
                        return (
                            <div className="OrderCard-d2d1">
                                <div className="OrderCard-d2d1d1">
                                    <div className="OrderCard-d2d1d1d1">
                                        <img className="OrderCard-d2d1d1d1i1" src={product.medias[0].url} />
                                    </div>
                                    <div className="OrderCard-d2d1d1d2">
                                        {/* <span>{product.name}</span> */}
                                        <NavLink style={{ textDecoration: 'none' }} to={`/products/${product.id}`}><span>{product.name}</span></NavLink>
                                    </div>
                                    <div className="OrderCard-d2d1d1d3">
                                        <div>
                                            <span>{`$${realPrice(product.price, product.discount).toFixed(2)} x `}</span>
                                            <span>{innerElement.quantity}</span>
                                        </div>

                                        {
                                            (innerElement.re == false) && (
                                                <button className="OrderCard-d2d1d1d4d1" onClick={() => submitReturn(innerElement)} type="button">Submit Return</button>
                                            )
                                        }
                                        {
                                            (innerElement.re == true) && (
                                                <span>Returned</span>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className="OrderCard-d3">
                <button className="OrderCard-d3b1" onClick={() => handleCancelOrder()} type="button">Cancel Order</button>
            </div>
        </div>
    )
}

export default OrderCard;
