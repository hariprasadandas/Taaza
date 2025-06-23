import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { db } from '../../firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}
 
function Cart() {
  const [cartItems, setCartItems] = useState([])
  const navigate = useNavigate()
 
  useEffect(() => {
    const savedCart = localStorage.getItem('taazaCart')
    if (savedCart) {
      setCartItems(JSON.parse(savedCart))
    }
  }, [])
 
  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(itemId)
      return
    }
 
    const updatedCart = cartItems.map(item =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    )
    setCartItems(updatedCart)
    localStorage.setItem('taazaCart', JSON.stringify(updatedCart))
  }
 
  const removeItem = (itemId) => {
    const updatedCart = cartItems.filter(item => item.id !== itemId)
    setCartItems(updatedCart)
    localStorage.setItem('taazaCart', JSON.stringify(updatedCart))
  }
 
  const clearCart = () => {
    setCartItems([])
    localStorage.removeItem('taazaCart')
  }
 
  const goToHome = () => {
    navigate('/')
  }
 
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0)
  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
 
  const handleCheckout = async () => {
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');

    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }
    
    // Check if the cart is empty
    if (totalPrice <= 0) {
      console.log("Cart is empty or total is zero.");
      alert("Your cart is empty!");
      return;
    }

    console.log("Preparing Razorpay options...");
    const options = {
      key: "rzp_test_Ty2fPZgb35aMIa",
      amount: (totalPrice + 50) * 100, // Amount in paise, including delivery fee
      currency: "INR",
      name: "Taaza",
      description: "Cart Checkout",
      handler: async function (response) {
        const orderData = {
          transactionId: response.razorpay_payment_id,
          paymentMethod: 'Razorpay',
          cartItems: cartItems,
          totalPrice: (totalPrice + 50),
          status: 'Processing',
          createdAt: serverTimestamp(),
        };

        try {
          await addDoc(collection(db, 'orders'), orderData);
          clearCart();
          navigate('/success', { state: { transactionId: response.razorpay_payment_id } });
        } catch (error) {
          console.error("Error saving order to Firestore:", error);
          alert("Payment successful, but failed to save your order. Please contact support.");
        }
      },
      prefill: {
        name: "Test User",
        email: "test@example.com",
        contact: "9999999999"
      },
      theme: {
        color: "#3399cc"
      }
    };

    console.log("Razorpay options:", options);

    try {
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Failed to open Razorpay checkout:", error);
    }
  }
 
  const containerStyle = {
    padding: '2rem',
    backgroundColor: '#f8f9fa',
    minHeight: '100vh'
  }
 
  const headerStyle = {
    textAlign: 'center',
    marginBottom: '2rem'
  }
 
  const titleStyle = {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: '0.5rem'
  }
 
  const emptyCartStyle = {
    textAlign: 'center',
    padding: '3rem',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
  }
 
  const emptyCartTextStyle = {
    fontSize: '1.5rem',
    color: '#666',
    marginBottom: '1rem'
  }
 
  const cartItemStyle = {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '1.5rem',
    marginBottom: '1rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  }
 
  const itemImageStyle = {
    fontSize: '2.5rem'
  }
 
  const itemDetailsStyle = {
    flex: 1
  }
 
  const itemNameStyle = {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: '0.5rem'
  }
 
  const itemPriceStyle = {
    fontSize: '1.1rem',
    color: '#e74c3c',
    fontWeight: 'bold'
  }
 
  const quantityControlStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  }
 
  const quantityButtonStyle = {
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '30px',
    height: '30px',
    fontSize: '1.2rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
 
  const quantityDisplayStyle = {
    fontSize: '1.1rem',
    fontWeight: 'bold',
    minWidth: '40px',
    textAlign: 'center'
  }
 
  const removeButtonStyle = {
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.9rem'
  }
 
  const summaryStyle = {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '1.5rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    marginTop: '2rem'
  }
 
  const summaryRowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '0.5rem',
    fontSize: '1.1rem'
  }
 
  const totalStyle = {
    fontSize: '1.3rem',
    fontWeight: 'bold',
    color: '#e74c3c',
    borderTop: '2px solid #e9ecef',
    paddingTop: '1rem',
    marginTop: '1rem'
  }
 
  const checkoutButtonStyle = {
    backgroundColor: '#27ae60',
    color: 'white',
    border: 'none',
    padding: '1rem 2rem',
    borderRadius: '8px',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    width: '100%',
    marginTop: '1rem'
  }
 
  const clearCartButtonStyle = {
    backgroundColor: '#95a5a6',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    marginTop: '1rem'
  }
 
  const goToHomeButtonStyle = {
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    marginTop: '1rem'
  }
 
  const headerContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem'
  }
 
  const headerLeftStyle = {
    textAlign: 'left'
  }
 
  if (cartItems.length === 0) {
    return (
      <div style={containerStyle}>
        <div style={headerContainerStyle}>
          <div style={headerLeftStyle}>
            <h1 style={titleStyle}>Shopping Cart</h1>
          </div>
          <button
            style={goToHomeButtonStyle}
            onClick={goToHome}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#2980b9'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#3498db'}
          >
            🏠 Go to Home
          </button>
        </div>
        <div style={emptyCartStyle}>
          <div style={emptyCartTextStyle}>🛒 Your cart is empty</div>
          <p style={{ color: '#666' }}>Add some delicious non-veg items to get started!</p>
          <button
            style={goToHomeButtonStyle}
            onClick={goToHome}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#2980b9'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#3498db'}
          >
            🏠 Continue Shopping
          </button>
        </div>
      </div>
    )
  }
 
  return (
    <div style={containerStyle}>
      <div style={headerContainerStyle}>
        <div style={headerLeftStyle}>
          <h1 style={titleStyle}>Shopping Cart</h1>
          <p style={{ color: '#666' }}>Total Items: {totalItems}</p>
        </div>
        <button
          style={goToHomeButtonStyle}
          onClick={goToHome}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#2980b9'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#3498db'}
        >
          🏠 Go to Home
        </button>
      </div>
 
      {/* Cart Items */}
      {cartItems.map(item => (
        <div key={item.id} style={cartItemStyle}>
          <div style={itemImageStyle}>{item.image}</div>
          <div style={itemDetailsStyle}>
            <h3 style={itemNameStyle}>{item.name}</h3>
            <div style={itemPriceStyle}>₹{item.price}/kg</div>
          </div>
          <div style={quantityControlStyle}>
            <button
              style={quantityButtonStyle}
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
            >
              -
            </button>
            <span style={quantityDisplayStyle}>{item.quantity}</span>
            <button
              style={quantityButtonStyle}
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
            >
              +
            </button>
          </div>
          <div style={{ textAlign: 'right', minWidth: '100px' }}>
            <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#2c3e50' }}>
              ₹{item.price * item.quantity}
            </div>
            <button
              style={removeButtonStyle}
              onClick={() => removeItem(item.id)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}
 
      {/* Cart Summary */}
      <div style={summaryStyle}>
        <h3 style={{ marginBottom: '1rem', color: '#2c3e50' }}>Cart Summary</h3>
        <div style={summaryRowStyle}>
          <span>Total Items:</span>
          <span>{totalItems}</span>
        </div>
        <div style={summaryRowStyle}>
          <span>Delivery Fee:</span>
          <span>₹50</span>
        </div>
        <div style={{ ...summaryRowStyle, ...totalStyle }}>
          <span>Total:</span>
          <span>₹{totalPrice + 50}</span>
        </div>
        <button onClick={handleCheckout} style={checkoutButtonStyle}>Proceed to Checkout</button>
        <button
          style={clearCartButtonStyle}
          onClick={clearCart}
        >
          Clear Cart
        </button>
      </div>
    </div>
  )
}
 
export default Cart;
 