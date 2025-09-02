import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Providers/AuthProvider";
import { imageUpload } from "../../Hooks/utilities/utils";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { 
  FaGoogle, 
  FaUser, 
  FaEnvelope, 
  FaLock, 
  FaImage, 
  FaEye, 
  FaEyeSlash,
  FaShieldAlt,
  FaUserPlus 
} from "react-icons/fa";
import { TbFidgetSpinner } from "react-icons/tb";

const Register = () => {
  const { createUser, updateUserProfile, googleSignIn } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    const image = data.file[0];
    try {
      const photoURL = await imageUpload(image);
      const result = await createUser(data.email, data.password);
      const loggedUser = result.user;

      // Update user profile
      await updateUserProfile(data.name, photoURL);
      Swal.fire({
        title: "Sign Up Successful!",
        icon: "success",
        showClass: {
          popup: "animate__animated animate__fadeInUp animate__faster",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutDown animate__faster",
        },
      });

      navigate("/");
    } catch (error) {
      console.error(error.message);
      Swal.fire({
        title: "Error!",
        text: error.message,
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    setLoading(true);
    googleSignIn()
      .then((result) => {
        Swal.fire({
          title: "Google Login Successful!",
          icon: "success",
        });
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.error(error.message);
        Swal.fire({
          title: "Error!",
          text: error.message,
          icon: "error",
        });
      })
      .finally(() => setLoading(false));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Welcome Section */}
        <div className="hidden lg:block">
          <div className="text-center lg:text-left">
            {/* Logo/Brand Section */}
            <div className="flex items-center justify-center lg:justify-start mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                <FaShieldAlt className="w-6 h-6 text-white" />
              </div>
              <div className="ml-3">
                <h2 className="text-2xl font-bold text-gray-800">MediBazer</h2>
                <p className="text-sm text-gray-500">Secure Healthcare Platform</p>
              </div>
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
              Join MediBazer
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Create your account and start managing your healthcare information with our secure platform.
            </p>

            {/* Benefits */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                </div>
                <p className="text-gray-600">Free account setup in minutes</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                </div>
                <p className="text-gray-600">Secure data encryption</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                </div>
                <p className="text-gray-600">Access from anywhere, anytime</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                </div>
                <p className="text-gray-600">Professional healthcare support</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Register Form */}
        <div className="w-full max-w-md mx-auto lg:mx-0">
          <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
            {/* Mobile Logo */}
            <div className="lg:hidden flex items-center justify-center mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                <FaShieldAlt className="w-6 h-6 text-white" />
              </div>
              <div className="ml-3">
                <h2 className="text-2xl font-bold text-gray-800">MediBazer</h2>
                <p className="text-sm text-gray-500">Healthcare Platform</p>
              </div>
            </div>

            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h2>
              <p className="text-gray-600">Fill in your information to get started</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Profile Image Upload */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center border-2 border-dashed border-gray-300 overflow-hidden">
                    {selectedImage ? (
                      <img 
                        src={selectedImage} 
                        alt="Profile preview" 
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <FaImage className="w-8 h-8 text-gray-400" />
                    )}
                  </div>
                  <label className="absolute bottom-0 right-0 w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:shadow-xl transition-all duration-200">
                    <FaUser className="w-3 h-3 text-white" />
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      {...register("file", { required: true })}
                      onChange={(e) => {
                        handleImageChange(e);
                        register("file").onChange(e);
                      }}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
              {errors.file && (
                <p className="text-red-600 text-sm text-center -mt-4">Please upload a profile image</p>
              )}

              {/* Name Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    {...register("name", { required: true })}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors duration-200 bg-gray-50 focus:bg-white"
                  />
                </div>
                {errors.name && (
                  <p className="text-red-600 text-sm mt-1">Name is required</p>
                )}
              </div>

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
                    type="email"
                    placeholder="Enter your email"
                    {...register("email", { required: true })}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors duration-200 bg-gray-50 focus:bg-white"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-600 text-sm mt-1">Email is required</p>
                )}
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
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    {...register("password", {
                      required: true,
                      minLength: 6,
                      maxLength: 20,
                      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/,
                    })}
                    className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors duration-200 bg-gray-50 focus:bg-white"
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
                {errors.password?.type === "required" && (
                  <p className="text-red-600 text-sm mt-1">Password is required</p>
                )}
                {errors.password?.type === "minLength" && (
                  <p className="text-red-600 text-sm mt-1">Password must be at least 6 characters</p>
                )}
                {errors.password?.type === "maxLength" && (
                  <p className="text-red-600 text-sm mt-1">Password must not exceed 20 characters</p>
                )}
                {errors.password?.type === "pattern" && (
                  <p className="text-red-600 text-sm mt-1">
                    Password must include uppercase, lowercase, digit, and special character
                  </p>
                )}
              </div>

              {/* Password Requirements */}
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-600 font-medium mb-2">Password must contain:</p>
                <div className="grid grid-cols-2 gap-1 text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                    <span>6-20 characters</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                    <span>One uppercase</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                    <span>One lowercase</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                    <span>One special char</span>
                  </div>
                </div>
              </div>

              {/* Sign Up Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <TbFidgetSpinner className="w-4 h-4 animate-spin" />
                    <span>Creating account...</span>
                  </div>
                ) : (
                  <>
                    <FaUserPlus className="w-4 h-4 mr-2" />
                    Create Account
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
                  <span className="px-2 bg-white text-gray-500">Or sign up with</span>
                </div>
              </div>
            </div>

            {/* Google Sign Up */}
            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="mt-6 w-full flex justify-center items-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaGoogle className="w-5 h-5 mr-3 text-red-500" />
              {loading ? "Loading..." : "Sign up with Google"}
            </button>

            {/* Sign In Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="font-medium text-purple-600 hover:text-purple-500 transition-colors duration-200"
                >
                  Sign in here
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
                <span>Secure Signup</span>
              </div>
              <div className="flex items-center space-x-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                <span>Data Protected</span>
              </div>
              <div className="flex items-center space-x-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span>No Spam</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;