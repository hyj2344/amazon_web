import { useEffect } from "react";
import { useSelector, useStore } from "react-redux";
import { useNavigate } from "react-router-dom";


import ProductInformationCard from "../misc/ProductInformationCard";

import "./style/ProductsList.css"

function ProductsList() {
    const navigate = useNavigate();
    const products = useSelector((state) => state.products);

    return (
        <div id='ProductsList'>

            {
                products && (
                    <ul id="ProductsList-ul1">
                        {
                            Object.values(products).map((product) => <ProductInformationCard {...{ product }} />)
                        }
                    </ul>
                )
            }
            {
                !products && (
                    <h1>Not products found</h1>
                )
            }
        </div>
    )
}

export default ProductsList;
