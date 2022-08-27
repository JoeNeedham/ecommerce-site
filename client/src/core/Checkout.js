import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getProducts } from "./apiCore";
import Card from "./Card";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";

const Checkout = ({products}) => {
    const getTotal = () =>{
        // .reduce method will take the 
        return products.reduce((currentValue, nextValue) =>{
            return currentValue + nextValue.count * nextValue.price;
        }, 0);
    };
    const showCheckout = () => {
        return isAuthenticated() ? (
            <button className="btn btn-success">Checkout</button>
        ) : (
            <Link to="/signin">
                <button className="btn btn-primary">
                    Sign in to checkout
                </button>
            </Link>
        )
    };
    
    return (
        <div>
            <h2>Total: ${getTotal()}</h2>
            {showCheckout()}
            {/* update */}
        </div>
    );
};

export default Checkout