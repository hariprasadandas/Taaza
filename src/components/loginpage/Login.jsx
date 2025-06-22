import React,{useState} from 'react';
// We'll use react-icons for social media icons
import { FcGoogle } from 'react-icons/fc';
import { FaApple, FaFacebookF } from 'react-icons/fa';

// Import your illustration
// Make sure the path is correct based on your project structure
// import  from '../assets/login-illustration.svg'; 

const LoginPage= () => {
     const [inputValuename, setInputValuename] = useState('');
     const [inputValuenumber, setInputValuenumber] = useState('');
     const handleChange = (event) => {
        setInputValuename(event.target.value); 
        console.log(event.target.value); 
    };
    const handleChangenumber = (event) => {
        setInputValuenumber(event.target.value);
        console.log(event.target.value);
    };

  return (
    // Main container
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-5xl flex rounded-2xl shadow-xl bg-white">
        
        {/* Left Side: Illustration */}
        <div className="hidden md:flex w-1/2 items-center justify-center bg-indigo-50 rounded-2xl p-8">
          <div className="text-center">
            {/* <img 
              src={loginIllustration} 
              alt="Login Illustration" 
              className="max-w-md w-full"
            /> */}
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

          <form className="mt-8 flex flex-col gap-6">
            {/* Name Input */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="name">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                value={inputValuename}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
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
                value={inputValuenumber}
                onChange={handleChangenumber}
                placeholder="+91 1527817890"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition-colors"
            >
              Login
            </button>
          </form>

          {/* Divider
          <div className="mt-8 flex items-center justify-between">
            <hr className="w-full border-gray-300" />
            <span className="px-4 text-gray-500">OR</span>
            <hr className="w-full border-gray-300" />
          </div> */}

          {/* Social Login Buttons
          <div className="mt-8 flex justify-center gap-4">
            <button className="p-3 border border-gray-300 rounded-xl hover:bg-gray-100 transition">
              <FcGoogle size={24} />
            </button>
            <button className="p-3 border border-gray-300 rounded-xl hover:bg-gray-100 transition text-blue-600">
              <FaFacebookF size={24} />
            </button>
            <button className="p-3 border border-gray-300 rounded-xl hover:bg-gray-100 transition">
              <FaApple size={24} />
            </button>
          </div> */}

          {/* Sign-up Link
          <div className="mt-10 text-center text-sm">
            <p className="text-gray-600">
              Not a member?{' '}
              <a href="#" className="font-semibold text-indigo-600 hover:underline">
                Register now
              </a>
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;