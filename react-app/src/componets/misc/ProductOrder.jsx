import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom';

import { cartAddByOneFunction, cartRemoveByOneFunction } from "../../store/cart";

import './style/ProductOrder.css'


function ProductOrder({ product, productId }) {
    const dispatch = useDispatch()
    const [intNum, setIntNum] = useState(0)
    const [decNum, setDecNum] = useState(0)
    const navigate = useNavigate()
    const options = [];
    for (let index = 1; index <= 30; index++) {
        options.push(index)
    }

    const handleAddCart = () => {
        dispatch(cartAddByOneFunction(product));
        // navigate(`/products/${productId}`)
    }

    const handleRemoveCart = () => dispatch(cartRemoveByOneFunction(product.id))

    useEffect(() => {
        let price  = 0
        if(product.discount) {
            price = product.price * (1 - (product.discount / 100));
            setIntNum(parseInt(price));
            setDecNum(parseInt(100 * (price % 1).toFixed(2)));
        } else {
            price = product.price;
            setIntNum(parseInt(price));
            setDecNum(parseInt(100 * (price % 1).toFixed(2)));
        }
    }, [])
    return (
        <div id='ProductOrder'>
            <div id='ProductOrder-d1'>
                <span id='ProductOrder-d1d1'>$</span>
                <span id='ProductOrder-d1d2'>{intNum}</span>
                <span id='ProductOrder-d1d3'>{decNum}</span>
            </div>
            <span id='ProductOrder-s1'>In Stock</span>
            <button id='ProductOrder-NL1' onClick={() => handleAddCart()} type="button">Add to Cart</button>
        </div>
    )
}


export default ProductOrder;
