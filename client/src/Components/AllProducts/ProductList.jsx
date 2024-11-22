import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductList.css';
import Sidebar from './Sidebar/Sidebar';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({});
    const [likedProducts, setLikedProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = () => {
            axios.get('http://localhost:3000/products', { params: filters })
                .then(response => {
                    setProducts(response.data);
                })
                .catch(error => {
                    setError('Failed to load products');
                });
        };

        fetchProducts();
    }, [filters]);

    const handleFilterChange = (newFilters) => {
        setFilters(prevFilters => ({ ...prevFilters, ...newFilters }));
    };

    const handleLike = (productId) => {
        if (likedProducts.includes(productId)) {
            setLikedProducts(prevLiked => prevLiked.filter(id => id !== productId));
        } else {
            setLikedProducts(prevLiked => [...prevLiked, productId]);
        }
    };

    if (error) return <div className="error">{error}</div>;

    return (
        <div className="product-list-container">
            <div className="sidebar-container">
                <Sidebar onFilterChange={handleFilterChange} />
            </div>
            <div className="product-grid">
                {products.map(product => (
                    <div key={product.id} className="product-card">
                        <div className="product-image-container">
                            <img src={product.image} alt={product.title} className="product-image" />
                        </div>
                        <div className="product-info">
                            <div className="product-header">
                                <span className={`rarity-badge ${product.rarity.toLowerCase().replace(' ', '-')}`}>
                                    {product.rarity}
                                </span>
                                <span className="chains">{product.chains}</span>
                            </div>
                            <div className="product-title-price">
                                <h2 className="product-title">{product.title}</h2>
                                <span className="product-price">{product.price} ETH</span>
                            </div>
                            <div className="product-footer">
                                <button
                                    className={`like-button ${likedProducts.includes(product.id) ? 'liked' : ''}`}
                                    onClick={() => handleLike(product.id)}
                                >
                                    {likedProducts.includes(product.id) ? '❤️' : '🤍'}
                                </button>
                                <button className="buy-button">Buy Now</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductList;