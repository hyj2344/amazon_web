import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from "react-router-dom";


import { productsSearchFunction } from '../../store/products';


import './style/SearchBar.css'


function SearchBar() {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [searchInput, setSearchInput] = useState("");

    const handleSearch = async () => {
        await dispatch(productsSearchFunction({ "data": searchInput }))
        navigate("/products")

    }
    let a = location.pathname
    // let http = window.location.href
    // if(window.location.href!="http://localhost:3000/products") setSearchInput("")
    useEffect(() => {
        if(location.pathname!="/products") setSearchInput("")
    }, [location])
    return (
        <div id='SearchBar'>
            <form id='SearchBar-f1'>
                {/* <select id='SearchBar-f1s1' name="">
                    <option value="">All departments</option>
                    <option value="">Appilances</option>
                    <option value="">Computers</option>
                </select> */}
                <div id='SearchBar-temp-d1'>
                    <span id='SearchBar-temp-d1s1'>Search</span>
                </div>
                <input id='SearchBar-f1in1' type="text" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
                <button id='SearchBar-f1b1' type="button" onClick={() => handleSearch()}>
                    <img id='SearchBar-f1b1i1' src="/search.png" />
                </button>
            </form>
        </div>
    )
}


export default SearchBar;
