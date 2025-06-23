import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [orderInput, setOrderInput] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch orders from Firestore
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, 'orders'));
      const ordersList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setOrders(ordersList);
      setLoading(false);
    };
    fetchOrders();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!orderInput) return;
    await addDoc(collection(db, 'orders'), { name: orderInput, created: new Date() });
    setOrderInput('');
    // Refresh orders
    const querySnapshot = await getDocs(collection(db, 'orders'));
    const ordersList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setOrders(ordersList);
  };

  return (
    <div>
      <h2>Orders</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          value={orderInput}
          onChange={e => setOrderInput(e.target.value)}
          placeholder="Enter order name"
        />
        <button type="submit">Add Order</button>
      </form>
      {loading ? (
        <p>Loading orders...</p>
      ) : (
        <ul>
          {orders.map(order => (
            <li key={order.id}>{order.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Orders;   