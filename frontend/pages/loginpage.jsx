import React, { useState } from 'react';
import axios from 'axios';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate, replace } from 'react-router-dom';


const loginpage = () => {

  const navigate = useNavigate();

  // State to track which form is currently active
  const [isLoginView, setIsLoginView] = useState(true);

  // State to handle form inputs
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  // State for form submission status and errors
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Toggle between login and register forms
  const toggleForm = () => {
    setIsLoginView(!isLoginView);
    setError('');
    setSuccess('');
    // Reset form fields when switching views
    setFormData({
      name: '',
      email: '',
      password: ''
    });
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsSubmitting(true);

    try {
      // Client-side validation
      if (!formData.email || !formData.password || (!isLoginView && !formData.name)) {
        throw new Error('Please fill in all fields');
      }

      // Simple email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error('Please enter a valid email address');
      }

      // Define the API endpoint based on the current view
      const endpoint = isLoginView
        ? 'https://passop-qllt.onrender.com/user/login'
        : 'https://passop-qllt.onrender.com/user/register';

      // Prepare the data to send
      const dataToSend = isLoginView
        ? { email: formData.email, password: formData.password }
        : formData;

      // Make the API request
      const response = await axios.post(endpoint, dataToSend);

      // Store token if it's in the response
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        // Set the token for future requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      }

      // Handle successful response
      if (response) {
        if (isLoginView) {
          setSuccess('Login successful! Redirecting...');
          // Redirect to dashboard
          navigate('/home', { replace: true })
        } else {
          setSuccess('Registration successful! You can now login.');

          // Automatically switch to login view after successful registration
          setTimeout(() => {
            setIsLoginView(true);
            setFormData({
              name: '',
              email: formData.email, // Keep email for convenience
              password: ''
            });
            setSuccess('');
          }, 2000);
        }
      }
    } catch (err) {
      // Handle error responses from the server
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError(err.message || 'An error occurred. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className='min-h-[80vh] flex items-center justify-center'>
        <div className="flex flex-col gap-10 w-1/2 mx-auto p-6 height">
          {/* Header Section */}
          <div className="flex flex-col items-center justify-center gap-4 bg-slate-900 p-6 rounded-lg marginbottom">
            <div className="size flex justify-center items-center font-bold mb-2">
              <div className="text-gray-800">&lt;</div>
              <div className="text-green-600">pass</div>
              <div className="text-green-500">OP</div>
              <div className="text-gray-800">/&gt;</div>
            </div>
            <p className="text-green-800">
              {isLoginView ? 'Access your password manager:)' : 'Create your password manager:)'}
            </p>
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 formwidth">
            {/* Name field - only shown for registration */}
            {!isLoginView && (
              <div>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="w-full h-10 px-3 py-2 rounded-full border border-green-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            )}

            {/* Email field */}
            <div>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="w-full h-10 px-3 py-2 rounded-full border border-green-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Password field with toggle */}
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full h-10 px-6 py-2 rounded-full border border-green-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent pr-12"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute eyeposition right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <EyeOff size={20} className="text-green-700" />
                ) : (
                  <Eye size={20} className="text-green-700" />
                )}
              </button>
            </div>

            {/* Submit button */}
            <div className="flex justify-center pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-green-500 hover:bg-green-600 text-white buttonwidth font-medium py-2 px-12 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-150"
              >
                {isSubmitting ? 'Processing...' : (isLoginView ? 'Login' : 'Register')}
              </button>
            </div>
          </form>

          {/* Toggle between login and register */}
          <div className="text-center margintop">
            <p className="text-green-800">
              {isLoginView ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={toggleForm}
                type="button"
                className="text-green-600 hover:text-green-800 font-medium focus:outline-none underline"
              >
                {isLoginView ? 'Register here' : 'Login here'}
              </button>
            </p>
          </div>
        </div>
      </div>


    </div>
  );
};

export default loginpage;
