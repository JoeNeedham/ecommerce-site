import React, { useState, useEffect } from 'react'
import Layout from './Layout'
import { getProducts } from './apiCore';

function Home() {
    const [productsBySell, setProductsBySell] = useState([])
    const [productsByArrival, setProductsByArrival] = useState([])
    const [error, setError] = useState([])

    return (
        <Layout title="Home Page" description="Node React E-Commerce App">
            
        </Layout>
    )
}

export default Home