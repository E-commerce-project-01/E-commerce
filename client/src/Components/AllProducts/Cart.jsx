import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import './Cart.css'

const Cart = () => {
    const [cart, setCart] = useState(null)
    const [error, setError] = useState(null)

    const fetchCart = async () => {
        const token = localStorage.getItem('token')
        if (!token) {
            setError("Please log in to view your cart")
            return
        }

        try {
            const response = await axios.get('http://localhost:3000/cart/itemcart', {
                headers: { 'Authorization': `Bearer ${token}` }
            })
            setCart(response.data)
        } catch (err) {
            setError(err.response?.data?.message || "Unable to load the cart")
        }
    }

    useEffect(() => {
        fetchCart()
    }, [])
    const handleRemoveItem = async (productId) => {
        const token = localStorage.getItem('token');
        if (!token) {
            Swal.fire({ icon: 'error', title: 'Unauthorized', text: 'Please log in' });
            return;
        }
    
        const confirm = await Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to remove this product from your cart?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, remove it!',
            cancelButtonText: 'No, keep it'
        });
    
        if (confirm.isConfirmed) {
            try {
                await axios.delete(`http://localhost:3000/cart/remove/${productId}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
    
                // Update the cart state immediately
                setCart(prevCart => {
                    const updatedProducts = prevCart.Products.filter(product => product.id !== productId);
                    const totalItems = updatedProducts.reduce((sum, product) => sum + product.CartProducts.quantity, 0);
                    const totalAmount = updatedProducts.reduce((sum, product) => sum + (product.CartProducts.priceAtPurchase * product.CartProducts.quantity), 0);
    
                    return {
                        ...prevCart,
                        Products: updatedProducts,
                        totalItems,
                        totalAmount
                    };
                });
    
                Swal.fire({ icon: 'success', title: 'Product Removed', timer: 1500, showConfirmButton: false });
            } catch (err) {
                Swal.fire({ icon: 'error', title: 'Error', text: err.response?.data?.message || 'Unable to remove the product' });
            }
        }
    };

    if (error) return <div className="cart-error">{error}</div>

    const CartItem = ({ product }) => (
        <div key={product.id} className="cart-item">
            <img src={product.image} alt={product.title} className="cart-item-image" />
            <div className="cart-item-details">
                <h3>{product.title}</h3>
                <p className="cart-item-price">{product.CartProducts.priceAtPurchase} ETH</p>
                <p className="cart-item-quantity">Quantity: {product.CartProducts.quantity}</p>
            </div>
            <button className="remove-item-button" onClick={() => handleRemoveItem(product.id)}>❌</button>
        </div>
    )

    if (!cart) return <div className="cart-loading">Loading...</div>

    return (
        <div className="cart-container">
            <h2>My Cart</h2>
            <div className="cart-items">
                {(!cart.Products || cart.Products.length === 0) ? (
                    <div className="cart-empty">Your cart is empty</div>
                ) : (
                    cart.Products.map(product => <CartItem key={product.id} product={product} />)
                )}
            </div>
            {cart && (
                <div className="cart-summary">
                    <p>Total Items: {cart.totalItems || 0}</p>
                    <p>Total Amount: {cart.totalAmount || 0} ETH</p>
                </div>
            )}
        </div>
    )
}

export default Cart
