import React, { useContext } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';
import { Link } from 'react-router-dom';

const Login = () => {
    const {signIn}=useContext(AuthContext)
    const handleLogin = e =>{
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email,password)
        signIn(email,password)
        .then(result =>{
            const user = result.user;
            console.log(user)
        })
    }
    return (
        <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Login now!</h1>
    </div>
    <div className="card bg-base-100  shrink-0 shadow-2xl">
      <form onSubmit={handleLogin} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" name='email' placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" name='password' placeholder="password" className="input input-bordered" required />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-3">
          <button className="btn btn-primary">Login</button>
        </div>
      </form>
      <p className=' mb-3 ml-5'><small>New Here?<Link to='/signup'>Create an account</Link></small></p>
    </div>
  </div>
</div>
    );
};

export default Login;