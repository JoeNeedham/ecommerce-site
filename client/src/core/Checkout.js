import React, { useState, useEffect } from "react";
import {
    getBraintreeClientToken,
    processPayment,
    createOrder
} from "./apiCore";
import {emptyCart} from './cartHelpers';
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import DropIn from 'braintree-web-drop-in-react'

const Checkout = ({products}) => {
    const [data, setData] = useState({
        loading: false,
        success: false,
        clientToken: null,
        error: '',
        instance: {},
        address: ''
    });

    const userId = isAuthenticated() && isAuthenticated().user._id
    const token = isAuthenticated() && isAuthenticated().token

    const getToken = (userId, token) => {
        getBraintreeClientToken(userId, token).then(data => {
            
            if(data.error) {
                setData({ ...data, error: data.error});
            } else {
                setData({ clientToken: data.clientToken })
            }
        });
    };

    useEffect(() => {
        getToken(userId, token)
        // eslint-disable-next-line
    },[]);
    
    const handleAddress = event => {
        setData({...data, address: event.target.value});
    };

    const getTotal = () =>{
        // .reduce method will take the 
        return products.reduce((currentValue, nextValue) =>{
            return currentValue + nextValue.count * nextValue.price;
        }, 0);
    };
    const showCheckout = () => {
        return isAuthenticated() ? (
            <div>{showDropIn()}</div>
        ) : (
            <Link to="/signin">
                <button className="btn btn-primary">
                    Sign in to checkout
                </button>
            </Link>
        )
    };

    let deliveryAddress = data.address

    const buy = () => {
        setData({ loading: true });
        // send the noce to your server
        // nonce = data.instance.requestPaymentMethod()
        let nonce;
        // eslint-disable-next-line
        let getNonce  = data.instance.requestPaymentMethod().then(data1 => {
            console.log(data1)
            nonce = data.nonce
            // once you have nonce (card type, card number) send nonce as 'paymentMethodNonce'
            // and also total to be charged
            // console.log('send nonce and total to process:', nonce, getTotal(products))
            const paymentData = {
                paymentMethodNonce: nonce,
                amount: getTotal(products)
            }

            processPayment(userId, token, paymentData)
                .then(response => {
                    //empty cart
                    //create order
                    console.log(response)
                    
                    const createOrderData = {
                        products: products,
                        transaction_id: response.transaction.id,
                        amount: response.transaction.amount,
                        address: deliveryAddress
                    };

                    createOrder(userId, token, createOrderData);

                    setData({ ...data, success: response.success });
                    emptyCart(() => {
                        console.log('payment success and empty cart')
                        setData({ loading: false })
                    })
                })
                .catch( error => {
                    console.log(error);
                    setData({ loading: false});
                });
        })
        .catch(error => {
            console.log('dropin error:', error)
            setData({...data, error: error.message})
        });
    };

    const showDropIn = () => (
        <div onBlur={() => setData({ ...data, error: ""})}>
            {data.clientToken !== null && products.length > 0 ? (
                <div>
                    <div className="form-group mb-3">
                    <label className="text-muted">Delivery address:</label>
                        <textarea
                            onChange={handleAddress}
                            className='form-control'
                            value={data.address}
                            placeholder="type your delivery address here..."
                        />
                    </div>
                    <DropIn options={{
                        authorization: data.clientToken,
                        paypal:{
                            flow: "vault"
                        }
                    }} onInstance={instance => (data.instance = instance)} />
                    <button onClick={buy} className="btn btn-success">
                        Pay
                    </button>
                </div>
            ) : null}
        </div>
    )

    const showError = error => (
        <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
            {error}
        </div>
    )

    const showSuccess = success => (
        <div className="alert alert-info" style={{display: success ? '' : 'none'}}>
            Thanks! Your payment was succesful!
        </div>
    )

    const showLoading = (loading) => (
        loading && <h2>Loading...</h2>
    );
    
    return (
        <div>
            <h2>Total: ${getTotal()}</h2>
            {showLoading(data.loading)}
            {showSuccess(data.success)}
            {showError(data.error)}
            {showCheckout()}
        </div>
    );
};

export default Checkout