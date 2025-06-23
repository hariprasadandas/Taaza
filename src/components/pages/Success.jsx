import React from 'react';
import { useLocation, Link } from 'react-router-dom';

function Success() {
  const location = useLocation();
  const transactionId = location.state?.transactionId;

  const containerStyle = {
    textAlign: 'center',
    padding: '4rem 2rem',
    backgroundColor: '#f8f9fa',
    minHeight: '80vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const successBoxStyle = {
    backgroundColor: 'white',
    padding: '3rem',
    borderRadius: '12px',
    boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
    maxWidth: '600px',
  };

  const titleStyle = {
    color: '#27ae60',
    fontSize: '2.5rem',
    marginBottom: '1rem',
  };

  const messageStyle = {
    fontSize: '1.2rem',
    lineHeight: '1.6',
    marginBottom: '1.5rem',
  };

  const transactionIdStyle = {
    fontSize: '1rem',
    color: '#555',
    backgroundColor: '#e9ecef',
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    display: 'inline-block',
    marginTop: '1rem',
  };

  const buttonStyle = {
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    textDecoration: 'none',
    marginTop: '2rem',
  };

  if (!transactionId) {
    return (
      <div style={containerStyle}>
        <div style={successBoxStyle}>
          <h1 style={{ ...titleStyle, color: '#e74c3c' }}>Oops!</h1>
          <p style={messageStyle}>Something went wrong. No transaction details found.</p>
          <Link to="/" style={buttonStyle}>Go to Homepage</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <div style={successBoxStyle}>
        <h1 style={titleStyle}>Thank You!</h1>
        <p style={messageStyle}>
          Your order has been placed successfully. It will be delivered within 2-4 hours.
        </p>
        <div>
          Your Transaction ID:
          <div style={transactionIdStyle}>
            <strong>{transactionId}</strong>
          </div>
        </div>
        <Link to="/track-order" style={buttonStyle}>Track Your Order</Link>
      </div>
    </div>
  );
}

export default Success; 