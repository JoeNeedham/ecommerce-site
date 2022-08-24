import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ShowImage from './ShowImage'
import moment from 'moment';
import { addItem } from './cartHelpers';

const Card = ({ product,
        showViewProductButton = true,
        showAddToCartButton = true,
        cartUpdate = false,
}) => {
    const[redirect, setRedirect] = useState(false)

    const navigate = useNavigate()

    const showViewButton = showViewProductButton => {
        return(
            showViewProductButton && (
                <Link to={`/product/${product._id}`} className='mr-2'>
                    <button className="btn btn-outline-primary mt-2 mb-2">
                        View Product
                    </button>
                </Link>
            )
        )
    };

    const addToCart = () => {
        addItem(product, () => {
            setRedirect(true)
        })
    };

    const shouldRedirect = redirect => {
        if(redirect){
            return navigate('/cart')
        }
    }

    const showAddToCart = (showAddToCartButton) => {
        return (
            showAddToCartButton && (
            <button onClick={addToCart} className='btn btn-outline-warning mt-2 mb-2'>
                Add to cart
            </button>
            )
        );
    }

    const showStock = (quantity) => {
        return quantity > 0 ? ( <span className='badge badge-primary badge-pill'>In Stock</span> ) : (
            <span className='badge badge-primary badge-pill'>Out of Stock</span>
        );
    };

    const showCartUpdateOptions = cartUpdate => {
        return cartUpdate && <div>
            <div className='input-group m-3'>
                
            </div>
        </div>
    }

    return (
        <div className="card">
            <div className="card-header name">{product.name}</div>
            <div className="card-body">
                {shouldRedirect(redirect)}
                <ShowImage item={product} url='product' />
                <p className='lead mt-2'>{product && product.description && product.description.substring(0, 100)}</p>
                <p className='black-10'>${product.price}</p>
                <p className='black-9'>Category: {product.category && product.category.name}</p>
                <p className='black-8'>
                    Added on {moment(product.createdAt).fromNow()}
                </p>
                {showStock(product.quantity)}
                <br />
                {showViewButton(showViewProductButton)}
                {showAddToCart(showAddToCartButton)}
                {showCartUpdateOptions(cartUpdate)}
            </div>
        </div>
    )
}

export default Card;