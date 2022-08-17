import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { read } from "./apiCore";
import Card from "./Card";
import Search from "./Search";
import { useParams } from "react-router-dom";

const Product = () => {
    const [product, setProduct] = useState({})
    const [error, setError] = useState(false)
    let { productId } = useParams()

    const loadSingleProduct = productId => {
        read(productId).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProduct(data);
            }
        });
    };

    useEffect(() => {
        loadSingleProduct(productId)
    }, [])
    return (
        <Layout
            title={product && product.name}
            description={product && product.description && product.description.substring(0,100)}
            className="container-fluid"
        >
            <div className="row">
                <Card product={product} showViewProductButton={false} />
            </div>
        </Layout>
    );
}

export default Product;