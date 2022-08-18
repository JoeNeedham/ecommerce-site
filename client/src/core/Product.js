import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { read, listRelated } from "./apiCore";
import Card from "./Card";
import Search from "./Search";
import { useParams } from "react-router-dom";

const Product = () => {
    const [product, setProduct] = useState({})
    const [relatedProduct, setRelatedProduct] = useState({})
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true);


    let { productId } = useParams()

    const loadSingleProduct = productId => {
        read(productId).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProduct(data);
                // fetch related products
                listRelated(data._id).then(data => {
                    if(data.error) {
                        setError(data.error)
                    } else {
                        console.log(data)
                        setRelatedProduct(data);
                    }
                })
            }
        });
    };

    useEffect(() => {
        if(loading) {
            setTimeout(() => {
                setLoading(false);
                }, 2000);
        }
        loadSingleProduct(productId)
    }, [productId])
    if(loading === true) {
        return <div>
            <div>
                loading
            </div>
        </div>
    } else
    return (
        <Layout
            title={product && product.name}
            description={product && product.description && product.description.substring(0,100)}
            className="container-fluid"
        >
            <div className="row">
                <div className="col-8">
                    {product && product.description && <Card product={product} showViewProductButton={false} />}
                </div>

                <div className="col-4">
                    <h4>Related products</h4>
                    {relatedProduct.length < 1 ? (
                        <div>
                            <h2>No related products</h2>
                        </div>
                    ) : (
                        relatedProduct.map((p, i) => (
                        <div className="mb-3" key={i}>
                            <Card product={p} />
                        </div>
                        ))
                    )}
                </div>
            </div>
        </Layout>
    );
}

export default Product;