import React, { useContext, useState, useRef } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FaGoogle, FaEye, FaEyeSlash, FaLock, FaEnvelope, FaUser, FaShieldAlt } from 'react-icons/fa';

const Login = () => {
    const { signIn, googleSignIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const handleGoogleLogin = () => {
        setIsLoading(true);
        googleSignIn()
            .then((result) => {
                const user = result.user;
                Swal.fire({
                    title: 'Google Login Successful!',
                    icon: 'success',
                });
                navigate(from, { replace: true });
            })
            .catch((error) => {
                console.error(error.message);
                Swal.fire({
                    title: 'Error!',
                    text: error.message,
                    icon: 'error',
                });
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const handleQuickLogin = (email, password) => {
        if (emailRef.current && passwordRef.current) {
            emailRef.current.value = email;
            passwordRef.current.value = password;
        }
    };

    const handleLogin = e => {
        e.preventDefault();
        setIsLoading(true);
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        
        signIn(email, password)
            .then(result => {
                const user = result.user;
                Swal.fire({
                    title: "Login Successful",
                    showClass: {
                        popup: `
                          animate__animated
                          animate__fadeInUp
                          animate__faster
                        `
                    },
                    hideClass: {
                        popup: `
                          animate__animated
                          animate__fadeOutDown
                          animate__faster
                        `
                    }
                });
                navigate(from, { replace: true });
            })
            .catch((error) => {
                Swal.fire({
                    title: 'Error!',
                    text: error.message,
                    icon: 'error',
                });
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl w-full grid lg:grid-cols-2 gap-8 items-center">
                {/* Left Side - Welcome Section */}
                <div className="hidden lg:block">
                    <div className="text-center lg:text-left">
                        {/* Logo/Brand Section */}
                        <div className="flex items-center justify-center lg:justify-start mb-8">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-700 rounded-xl flex items-center justify-center shadow-lg">
                                <FaShieldAlt className="w-6 h-6 text-white" />
                            </div>
                            <div className="ml-3">
                                <h2 className="text-2xl font-bold text-gray-800">MediBazer</h2>
                                <p className="text-sm text-gray-500">Secure Healthcare Platform</p>
                            </div>
                        </div>

                        <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
                            Welcome Back!
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                            Access your healthcare dashboard and manage your medical information securely.
                        </p>

                        {/* Features */}
                        <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                                    </svg>
                                </div>
                                <p className="text-gray-600">Secure patient data management</p>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                                    </svg>
                                </div>
                                <p className="text-gray-600">24/7 healthcare support</p>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                                    <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                                    </svg>
                                </div>
                                <p className="text-gray-600">Advanced analytics dashboard</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Login Form */}
                <div className="w-full max-w-md mx-auto lg:mx-0">
                    <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
                        {/* Mobile Logo */}
                        <div className="lg:hidden flex items-center justify-center mb-8">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-700 rounded-xl flex items-center justify-center shadow-lg">
                                <FaShieldAlt className="w-6 h-6 text-white" />
                            </div>
                            <div className="ml-3">
                                <h2 className="text-2xl font-bold text-gray-800">MediBazer</h2>
                                <p className="text-sm text-gray-500">Healthcare Platform</p>
                            </div>
                        </div>

                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-gray-800 mb-2">Sign In</h2>
                            <p className="text-gray-600">Enter your credentials to access your account</p>
                        </div>

                        {/* Quick Login Buttons */}
                        <div className="mb-6 space-y-3">
                            <div className="grid grid-cols-2 gap-3">
                                {/* Admin Login Button */}
                                <button
                                    type="button"
                                    onClick={() => handleQuickLogin('med@for28.com', 'asdfR1@')}
                                    className="py-2 px-3 rounded-lg border-2 border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 transition-all duration-200 flex items-center justify-center gap-2 text-sm"
                                >
                                    <FaShieldAlt className="w-4 h-4" />
                                    Admin
                                </button>

                                {/* Seller Login Button */}
                                <button
                                    type="button"
                                    onClick={() => handleQuickLogin('seller@example.gmail.com', 'asdfR12@')}
                                    className="py-2 px-3 rounded-lg border-2 border-green-600 text-green-600 font-semibold hover:bg-green-50 transition-all duration-200 flex items-center justify-center gap-2 text-sm"
                                >
                                    <FaUser className="w-4 h-4" />
                                    Seller
                                </button>
                            </div>
                            <p className="text-xs text-gray-500 text-center">Click to auto-fill credentials</p>
                        </div>

                        <div className="relative mb-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">Or login manually</span>
                            </div>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-6">
                            {/* Email Field */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaEnvelope className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        ref={emailRef}
                                        type="email"
                                        name="email"
                                        placeholder="Enter your email"
                                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 bg-gray-50 focus:bg-white"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password Field */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaLock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        ref={passwordRef}
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder="Enter your password"
                                        className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 bg-gray-50 focus:bg-white"
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? (
                                            <FaEyeSlash className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                        ) : (
                                            <FaEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Forgot Password */}
                            <div className="text-right">
                                <a href="#" className="text-sm text-blue-600 hover:text-blue-500 transition-colors duration-200">
                                    Forgot password?
                                </a>
                            </div>

                            {/* Login Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <div className="flex items-center space-x-2">
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        <span>Signing in...</span>
                                    </div>
                                ) : (
                                    <>
                                        <FaUser className="w-4 h-4 mr-2" />
                                        Sign In
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="mt-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300" />
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                                </div>
                            </div>
                        </div>

                        {/* Google Login */}
                        <button
                            onClick={handleGoogleLogin}
                            disabled={isLoading}
                            className="mt-6 w-full flex justify-center items-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <FaGoogle className="w-5 h-5 mr-3 text-red-500" />
                            Sign in with Google
                        </button>

                        {/* Sign Up Link */}
                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-600">
                                New to MediBazer?{' '}
                                <Link
                                    to="/signup"
                                    className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200"
                                >
                                    Create an account
                                </Link>
                            </p>
                        </div>
                    </div>

                    {/* Trust Indicators */}
                    <div className="mt-8 text-center">
                        <div className="flex items-center justify-center space-x-6 text-xs text-gray-500">
                            <div className="flex items-center space-x-1">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
                                </svg>
                                <span>SSL Secured</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                                </svg>
                                <span>HIPAA Compliant</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                                <span>Privacy Protected</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;