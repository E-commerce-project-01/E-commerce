import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import './Cart.css'

const Cart = () => {
    const [cart, setCart] = useState(null)
    const [error, setError] = useState(null)

    const fetchCart = async () => {
        try {
            const token = localStorage.getItem('token')
            const response = await axios.get('http://localhost:3000/cart/itemcart', {
                headers: { Authorization: `Bearer ${token}` },
            })
            setCart(response.data)
        } catch (err) {
            setError(err.response?.data?.message || 'Unable to load the cart')
        }
    }

    useEffect(() => {
        fetchCart()
    }, [])


    const handleConfirmOrder = async () => {
        const result = await Swal.fire({
          title: 'Confirm Order',
          text: 'Are you sure you want to place this order?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Yes, confirm order',
          cancelButtonText: 'Cancel'
        });
      
        if (result.isConfirmed) {
          try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:3000/cart/confirm-order', {}, {
              headers: { Authorization: `Bearer ${token}` }
            });
      
            Swal.fire({
              icon: 'success',
              title: 'Order Confirmed!',
              text: 'Check your email for order confirmation details.',
              timer: 2000,
              showConfirmButton: false
            });
      
            setCart({
              ...cart,
              Products: [],
              totalItems: 0,
              totalAmount: 0
            });
          } catch (err) {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: err.response?.data?.message || 'Failed to confirm order'
            });
          }
        }
      };
      const handleowner = ()=>{
        
      }

    const handleRemoveItem = async (productId) => {
        const confirm = await Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to remove this product from your cart?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, remove it!',
            cancelButtonText: 'No, keep it',
        })

        if (confirm.isConfirmed) {
            try {
                const token = localStorage.getItem('token')
                await axios.delete(`http://localhost:3000/cart/remove/${productId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                })

                setCart((prevCart) => {
                    const updatedProducts = prevCart.Products.filter((element) => element.id !== productId)
                    const totalItems = updatedProducts.reduce(
                        (sum, el) => sum + el.CartProducts.quantity,
                        0
                    )
                    const totalAmount = updatedProducts.reduce(
                        (sum, elm) => sum + elm.CartProducts.priceAtPurchase * elm.CartProducts.quantity,
                        0
                    )

                    return { ...prevCart, Products: updatedProducts, totalItems, totalAmount }
                })

                Swal.fire({ icon: 'success', title: 'Product Removed', timer: 1500, showConfirmButton: false })
            } catch (err) {
                Swal.fire({ icon: 'error', title: 'Error', text: err.response?.data?.message || 'Unable to remove the product' })
            }
        }
    }

    if (error) return <div className="cart-error">{error}</div>
    if (!cart) return <div className="cart-loading">Loading...</div>

    return (
        <div className="cart-container">
            <h2>My Cart</h2>
            <div className="cart-items">
                {cart.Products.length === 0 ? (
                    <div className="cart-empty">Your cart is empty</div>
                ) : (
                    cart.Products.map((product) => (
                        <div key={product.id} className="cart-item">
                            <img src={product.image} alt={product.title} className="cart-item-image" />
                            <div className="cart-item-details">
                                <h3>{product.title}</h3>
                                <p className="cart-item-price">{product.CartProducts.priceAtPurchase} ETH</p>
                                <p className="cart-item-quantity">Quantity: {product.CartProducts.quantity}</p>
                            </div>
                            <button className="remove-item-button" onClick={() => handleRemoveItem(product.id)}>
                                ❌
                            </button>
                        </div>
                    ))
                )}
            </div>
            <div className="cart-summary">
                <p>Total Items: {cart.totalItems || 0}</p>
                <p>Total Amount: {cart.totalAmount || 0} ETH</p>
                <button 
                    className="confirm-order-button"
                    onClick={()=>{handleConfirmOrder(),handleowner()}}
                    disabled={!cart.Products || cart.Products.length === 0}
                >
                    Confirm Order
                </button>
            </div>
        </div>
    )
}

export default Cart
