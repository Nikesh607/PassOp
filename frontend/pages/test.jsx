<div className='min-h-[80vh] flex items-center justify-center'>
      <div className="flex flex-col gap-10 w-1/2 mx-auto border border-red-500 p-6">
        {/* Header Section */}
        <div className="flex flex-col items-center justify-center gap-4 bg-slate-900 p-6 rounded-lg">
          <div className="text-4xl flex justify-center items-center font-bold mb-2">
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
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
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
              className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-12 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-150"
            >
              {isSubmitting ? 'Processing...' : (isLoginView ? 'Login' : 'Register')}
            </button>
          </div>
        </form>
  
        {/* Toggle between login and register */}
        <div className="text-center">
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