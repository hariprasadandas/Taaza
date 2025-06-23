import React from 'react';

function RazorpayButton() {
  const handlePayment = () => {
    const options = {
      key: "rzp_test_Ty2fPZgb35aMIa", // Your Key ID is now added
      amount: 50000, // Amount in paise (50000 = ₹500)
      currency: "INR",
      name: "Taaza Demo",
      description: "Test Transaction",
      // image: "https://your-logo-url.com/logo.png", // Optional: add your logo URL
      handler: function (response) {
        alert("Payment successful! Payment ID: " + response.razorpay_payment_id);
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
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <button onClick={handlePayment} style={{ padding: '10px 20px', background: '#3399cc', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
      Pay ₹500 (Test Mode)
    </button>
  );
}

export default RazorpayButton; 