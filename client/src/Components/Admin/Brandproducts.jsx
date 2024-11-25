import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import '../Admin/Brandproducts.css';

const AdminBrandProducts = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { brandId } = location.state; 
    const [products, setProducts] = useState([]);
    const [showDropdown, setShowDropdown] = useState({}); 
    const [newPrice, setNewPrice] = useState(''); 
    const [refresh, setrefresh] = useState(false); 


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
    }, [brandId,refresh]); 

    const handlePriceUpdate = (productId) => {
        axios.put(`http://localhost:3000/api/products/${productId}`, { price: newPrice })
            .then(() => {
                
                setNewPrice(''); 
                setShowDropdown((prev) => ({ ...prev, [productId]: false })); // Hide dropdown after submission
                // Fetch updated products if necessary
                setrefresh(!refresh)
            })
            .catch((error) => {
                console.error("Error updating price:", error);
            });
    };

    return (
        <div className="admin-product-grid-container">
            {products.map((product) => (
                <div className="admin-product-card" key={product.id}>
                    <h3 className="admin-product-name">{product.title}</h3>
                    <div className="admin-image-container">
                        <img src={product.image} alt={product.name} className="admin-product-image" />
                    </div>
                    <p className="admin-product-price">${product.price}</p>
                    <button onClick={() => setShowDropdown((prev) => ({ ...prev, [product.id]: !prev[product.id] }))}>
                        Update Price
                    </button>
                    {showDropdown[product.id] && ( // Conditional rendering of the dropdown
                        <div className="price-update-dropdown">
                            <input 
                                type="number" 
                                value={newPrice} 
                                onChange={(e) => setNewPrice(e.target.value)} 
                                placeholder="Enter new price" 
                            />
                            <button onClick={() => handlePriceUpdate(product.id)}>Submit</button>
                        </div>
                    )}
                </div>
            ))}
            <button className="Users" onClick={() => navigate("/brandsAdmin")}>
                Back
            </button>
        </div>
    );
};

export default AdminBrandProducts;