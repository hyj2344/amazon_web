import { NavLink, useParams } from "react-router-dom";
import { Routes, Route } from 'react-router-dom';

import Header from "../misc/Header";
import Footer from "../misc/Footer";
import Root from "./Root";
import ProductsList from "./ProductsList";
import ProductById from './ProductById';
import Cart from "./Cart";
import Orders from "./Orders";
import ReviewFormPage from "./ReviewFormPage";
import Account from "./Account";
import Addresses from "./Addresses";
import FormAddress from "./FormAddress";
import ReturnPage from "./ReturnPage"
import "./style/Main.css"

import React, { useLayoutEffect, useState } from 'react';

import { useWindowSize } from 'usehooks-ts'

export default function Main() {
  let { width, height } = useWindowSize()
    width = width-5;
  return (
    <div id="Main" style={{ width: width, height: height}}>
        <Header />
        <Routes>

            <Route path="/"element={ <Root /> }/>
            <Route path="/account"element={ <Account /> }/>
            <Route path="addresses"element={ <Addresses /> }/>
            <Route path="addresses/new"element={ <FormAddress /> }/>
            <Route path="addresses/edit/:addressId"element={ <FormAddress /> }/>
            <Route path="cart" element={ <Cart /> } />
            <Route path="orders" element={ <Orders /> } />
            <Route path="products" element={ <ProductsList /> } />
            <Route path="products/:productId" element={ <ProductById />  } />
            <Route path="products/:productId/reviews" element={ <ReviewFormPage />  } />
            <Route path="products/:productId/reviews/:reviewId" element={ <ReviewFormPage />  } />
            <Route path="return/:orders_productsId" element={ <ReturnPage />  } />
        </Routes>
        <Footer />
    </div>
)
}
