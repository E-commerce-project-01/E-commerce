import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation,useNavigate } from 'react-router-dom';
import '../Admin/Brandproducts.css'; // Import your CSS for styling

const BrandProducts = () => {
    const navigate=useNavigate()
    const location = useLocation();
    const { brandId } = location.state; // Get the brand ID from the state
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/products/${brandId}`); // Adjust the endpoint as necessary
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, [brandId]); // Fetch products when brandId changes

    return (
        <div className="product-grid-container">
            {products.map((product) => (
                <div className="product-card" key={product.id}>
                    <h3 className="product-name">{product.title}</h3>
                    <img src={product.image} alt={product.name} className="product-image" />
                    <p className="product-price">${product.price}</p>
                </div>
            ))}
            <button className="Users" onClick={() => navigate("/brandsAdmin")}>
                Back
            </button>
        </div>
    );
};

export default BrandProducts;