import React, { useState, useEffect } from 'react'
import Layout from './Layout'
import { getProducts } from './apiCore';

function Home() {
    const [productsBySell, setProductsBySell] = useState([])
    const [productsByArrival, setProductsByArrival] = useState([])
    const [error, setError] = useState([])

    const loadProductsBySell = () => {
        getProducts('sold').then(data => {
            if(data.error) {
                setError(data.error)
            } else {
                setProductsBySell(data)
            }
        });
    }

    const loadProductsByArrival = () => {
        getProducts('createdAt').then(data => {
            if(data.error) {
                setError(data.error)
            } else {
                setProductsByArrival(data)
            }
        });
    }

    useEffect(() => {
        loadProductsByArrival()
        loadProductsBySell()
    },[])

    return (
        <Layout title="Home Page" description="Node React E-Commerce App">
            {JSON.stringify(productsBySell)}
            <br/>
            <br/>
            {JSON.stringify(productsByArrival)}
        </Layout>
    )
}

export default Home