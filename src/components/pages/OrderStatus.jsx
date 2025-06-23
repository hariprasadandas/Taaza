import React, { useState } from 'react';
import { db } from '../../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

function OrderStatus() {
  const [transactionId, setTransactionId] = useState('');
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTrackOrder = async () => {
    if (!transactionId.trim()) {
      setError('Please enter a valid Transaction ID.');
      return;
    }
    setLoading(true);
    setError('');
    setOrder(null);

    try {
      const q = query(collection(db, 'orders'), where('transactionId', '==', transactionId.trim()));
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        setError('No order found with this ID. Please check the ID and try again.');
        setOrder(null);
      } else {
        // Assuming transactionId is unique, we take the first result
        const orderData = querySnapshot.docs[0].data();
        setOrder({ id: querySnapshot.docs[0].id, ...orderData });
      }
    } catch (err) {
      console.error("Error fetching order:", err);
      setError('An error occurred while fetching your order. Please try again later.');
    }
    setLoading(false);
  };

  // Styles
  const containerStyle = { padding: '2rem', maxWidth: '800px', margin: 'auto' };
  const inputStyle = { width: '100%', padding: '12px', marginBottom: '1rem', borderRadius: '6px', border: '1px solid #ccc' };
  const buttonStyle = { width: '100%', padding: '12px', backgroundColor: '#3498db', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '1rem' };
  const errorStyle = { color: 'red', marginTop: '1rem' };
  const orderDetailsStyle = { marginTop: '2rem', padding: '2rem', backgroundColor: '#f8f9fa', borderRadius: '8px' };
  
  return (
    <div style={containerStyle}>
      <h2>Track Your Order</h2>
      <p>Enter the transaction ID you received on the success page.</p>
      <input 
        type="text"
        value={transactionId}
        onChange={(e) => setTransactionId(e.target.value)}
        placeholder="Enter Transaction ID"
        style={inputStyle}
      />
      <button onClick={handleTrackOrder} disabled={loading} style={buttonStyle}>
        {loading ? 'Searching...' : 'Track Order'}
      </button>

      {error && <p style={errorStyle}>{error}</p>}

      {order && (
        <div style={orderDetailsStyle}>
          <h3>Order Details</h3>
          <p><strong>Transaction ID:</strong> {order.transactionId}</p>
          <p><strong>Status:</strong> <span style={{fontWeight: 'bold', color: '#27ae60'}}>{order.status}</span></p>
          <p><strong>Total Price:</strong> ₹{order.totalPrice.toFixed(2)}</p>
          <h4>Items:</h4>
          <ul>
            {order.cartItems.map(item => (
              <li key={item.id}>{item.name} - {item.quantity} x ₹{item.price}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default OrderStatus; 