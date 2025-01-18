


import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Providers/AuthProvider";
import { imageUpload } from "../../Hooks/utilities/utils";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { FaGoogle } from "react-icons/fa";
import { TbFidgetSpinner } from "react-icons/tb";

const Register = () => {
  const { createUser, updateUserProfile, googleSignIn } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
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

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Sign Up now!</h1>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Name"
                name="name"
                aria-label="Enter your name"
                {...register("name", { required: true })}
                className="input input-bordered"
              />
              {errors.name && <span className="text-red-600">This field is required</span>}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Email"
                {...register("email", { required: true })}
                className="input input-bordered"
              />
              {errors.email && <span className="text-red-600">This field is required</span>}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  maxLength: 20,
                  pattern:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/,
                })}
                className="input input-bordered"
              />
              {errors.password?.type === "required" && (
                <span className="text-red-600">This field is required</span>
              )}
              {errors.password?.type === "minLength" && (
                <span className="text-red-600">The password must be at least 6 characters</span>
              )}
              {errors.password?.type === "maxLength" && (
                <span className="text-red-600">The password must not exceed 20 characters</span>
              )}
              {errors.password?.type === "pattern" && (
                <span className="text-red-600">
                  The password must include one uppercase, one lowercase, one digit, and one special character
                </span>
              )}
              <label className="label">
                <button
                  onClick={() => navigate("/reset-password")}
                  className="label-text-alt link link-hover"
                >
                  Forgot password?
                </button>
              </label>
            </div>
            <div>
              <input
                type="file"
                name="image"
                accept="image/*"
                {...register("file", { required: true })}
                className="file-input w-full max-w-xs"
              />
              {errors.file && <span className="text-red-600">Please upload an image file</span>}
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">
                {loading ? (
                  <TbFidgetSpinner className="animate-spin m-auto"></TbFidgetSpinner>
                ) : (
                  "Sign Up"
                )}
              </button>
            </div>
          </form>
          <div>
            <button onClick={handleGoogleLogin} className="flex btn">
              <FaGoogle className="mr-2" />
              {loading ? "Loading..." : "Login with Google"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
