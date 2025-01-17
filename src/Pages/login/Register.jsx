import React from 'react';
import { useForm } from 'react-hook-form';

const Register = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm()
      const onSubmit = data =>{
        console.log(data)
      }

    return (
        <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">SignUp now!</h1>
      <p className="py-6">
        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
        quasi. In deleniti eaque aut repudiandae et a id nisi.
      </p>
    </div>
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <form onSubmit={handleSubmit(onSubmit)} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="text" placeholder="name" name='name'{...register("name",{ required: true })} className="input input-bordered"  />
          {errors.name && <span className=' text-red-600'>This field is required</span>}

        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" placeholder="email" {...register("email",{ required: true })} className="input input-bordered"  />
          {errors.email && <span className=' text-red-600'>This field is required</span>}

        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" placeholder="password"{...register("password",{ required: true,minLength:6,
           maxLength: 20,
           pattern:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/
           })} className="input input-bordered"  />
          {errors.password?.type === 'require' && <span className=' text-red-600'>This field is required</span>}
          {errors.password?.type === 'minLength' && <span className=' text-red-600'>The password must be 6 character </span>}
          {errors.password?.type === 'maxLength' && <span className=' text-red-600'>The password max length is 20</span>}
          {errors.password?.type === 'pattern' && <span className=' text-red-600'>The password must have one upper one lower one special character</span>}
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-6">
        <input className='btn btn-primary ' type='submit' value='sign up'></input>
        </div>
      </form>
    </div>
  </div>
</div>
    );
};

export default Register;