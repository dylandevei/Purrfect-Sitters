import React from 'react';
import reactDom from 'react-dom';
import { useForm } from 'react-hook-form';

export default function SignIn() {

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
    fetch(`/api/auth/sign-in`, req)
      .then(res => res.json())
      .catch(err => next(err));
    reset();
  }

  return (
    <>
    <h2 className='raleway text-center mt-5'>Login</h2>
    <div className='d-flex justify-content-center'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-3 mt-2'>
          <label className='form-label lato'>Username</label>
          <input className='form-control form-control-lg lato' type="text" placeholder="username" {...register("username", { required: true, min: 3 })} />
        </div>
        <div className='mb-3'>
          <label className='form-label lato'>Password</label>
          <input className='form-control form-control-lg mb-3 lato' type="password" placeholder="password" {...register("password", { required: true, min: 6 })} />
        <div className='mb-3 text-center lato'>
            <p>Don't have an account? create one <a href="#sign-up">here</a></p>
        </div>
        </div>
        <button type="submit" className='btn btn-primary mb-5 float-end'>Login</button>
      </form>
    </div>
    </>

  );
}
