import React from 'react';
import reactDom from 'react-dom';
import { useForm } from 'react-hook-form';

export default function SignUp() {

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
    fetch(`/api/auth/sign-up`, req)
      .then(res => res.json())
      .catch(err => next(err));
    reset();
  }

    return (
      <div className='d-flex justify-content-center mt-5'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-5 mt-5'>
            <label className='form-label'>Username</label>
            <input className='form-control form-control-lg' type="text" placeholder="username" {...register("username", { required: true, min: 3 })} />
          </div>
          <div className='mb-3'>
            <label className='form-label'>Password</label>
            <input className='form-control form-control-lg' type="password" placeholder="password" {...register("password", { required: true, min: 6 })} />
          </div>
          <button type="submit" className='btn btn-primary mb-5'>Register</button>
        </form>
      </div>
    );
  }
