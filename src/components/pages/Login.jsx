import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// We'll use react-icons for social media icons
import { FcGoogle } from 'react-icons/fc';
import { FaApple, FaFacebookF } from 'react-icons/fa';

// Import your illustration
// import loginIllustration from '../assets/login-illustration.svg';

const LoginPage = () => {
  // --- STATE MANAGEMENT ---
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [isPotentialAdmin, setIsPotentialAdmin] = useState(false);

  const navigate = useNavigate();

  // Define admin credentials
  const ADMIN_NAME = 'vikas reddy';
  const ADMIN_PHONE = '8897309219';
  const ADMIN_PASSWORD = 'password123';

  // This effect checks if the user might be an admin
  useEffect(() => {
    const nameMatch = name.trim().toLowerCase() === ADMIN_NAME;
    const phoneMatch = phoneNumber.trim() === ADMIN_PHONE;

    if (nameMatch && phoneMatch) {
      setIsPotentialAdmin(true);
    } else {
      setIsPotentialAdmin(false);
    }
  }, [name, phoneNumber]);

  // --- FORM VALIDATION ---
  // 1. Create a variable to determine if the login button should be disabled.
  const isLoginDisabled =
    // Condition 1: Basic fields must not be empty
    !name.trim() || !phoneNumber.trim() ||
    // Condition 2: If the user is an admin, the password must also not be empty
    (isPotentialAdmin && !password.trim());


  // Handlers for input changes
  const handleNameChange = (event) => setName(event.target.value);
  const handleNumberChange = (event) => setPhoneNumber(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  // Form submission handler
  const handleLoginSubmit = (event) => {
    event.preventDefault();

    // Although the button is disabled, this is an extra safeguard
    if (isLoginDisabled) {
        alert("Please fill all required fields.");
        return;
    }

    if (isPotentialAdmin) {
      if (password === ADMIN_PASSWORD) {
        console.log('Admin login successful!');
        navigate('/Admin');
      } else {
        alert('Incorrect Admin Password!');
        setPassword('');
      }
    } else {
      console.log('Regular user login.');
      navigate('/Home');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-5xl flex rounded-2xl shadow-xl bg-white">
        {/* Left Side */}
        <div className="hidden md:flex w-1/2 items-center justify-center bg-indigo-50 rounded-2xl p-8">
          <div className="text-center">
            <h1 className="text-7xl font-bold text-black-800 mt-6">Taaza</h1>
            <p className="text-gray-600 font-[cursive] mt-2">
              Freshness Delivered
            </p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-800">Hello !</h2>
          <p className="text-gray-600 mt-2">Welcome </p>
          
          <form onSubmit={handleLoginSubmit} className="mt-8 flex flex-col gap-6">
            {/* Name Input */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="name">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={handleNameChange}
                placeholder="Vikas"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                autoComplete="name"
              />
            </div>

            {/* Phone Number Input */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="phone">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                value={phoneNumber}
                onChange={handleNumberChange}
                placeholder="889****219"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                autoComplete="tel"
              />
            </div>

            {/* Conditionally render the password field */}
            {isPotentialAdmin && (
              <div>
                <label className="block text-gray-700 font-semibold mb-2" htmlFor="password">
                  Admin Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="Enter your admin password"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                  autoComplete="current-password"
                />
              </div>
            )}
            
            {/* 2. ADD the `disabled` attribute and styling for the disabled state */}
            <button
              type="submit"
              disabled={isLoginDisabled} // Button is disabled based on our condition
              className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition-colors
                         disabled:bg-gray-400 disabled:cursor-not-allowed" // Styles for the disabled state
            >
              Login
            </button>
          </form>
          {/* ... */}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;