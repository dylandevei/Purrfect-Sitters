import React from 'react';
import { useForm } from 'react-hook-form';

export default function PetForm() {

  const { register, handleSubmit, reset, formState: { isSubmitSuccessful, errors } } = useForm();

  const onSubmit = data => {
    const token = window.localStorage.getItem('react-context-jwt');
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': token
      },
      body: JSON.stringify(data)
    };
    fetch('/api/users/pets', req)
      .then(res => res.json())
      .then(() => {
        reset();
      })
      .catch(err => console.error(err));
    // eslint-disable-next-line no-console
    console.log(errors);
  };

  if (isSubmitSuccessful === true) {
    window.location.hash = '#';
  }

  return (
    <div className='container-sm px-4 mt-5'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className='d-flex justify-content-center raleway'>Create A New Pet Profile</h1>
        <div className='row'>
          <div className='col'>
            <input className='form-control mb-2' type="text" placeholder="Image Url" {...register('imageUrl', {})} />
          </div>
        </div>

        <div className='row'>
          <div className='col'>
            <input className='form-control mb-2' type="text" placeholder={'Your Pet\'s Name'} {...register('petName', { required: true })} />
          </div>
          <div className='col'>
            <select className='form-select mb-2' {...register('petType', { required: true })}>
              <option defaultValue=''>Species</option>
              <option value="Cat">Cat</option>
              <option value="Dog">Dog</option>
            </select>
          </div>
          <div className='col'>
            <select className='form-select mb-2' {...register('sex')}>
              <option defaultValue=''>Sex</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
        </div>

        <div className='col'>
          <input className='form-control mb-2' type="text" placeholder={'Your Pet\'s Weight'} {...register('weight', { required: true })} />
        </div>

        <div className='col'>
          <input className='form-control mb-2' type="text" placeholder={'Your Pet\'s Age'} {...register('age', { required: true })} />
        </div>

        <div className='row'>
          <div className='col'>
            <input className='form-control mb-2' type="text" placeholder={'Your Pet\'s Breed'} {...register('breed', { required: true })} />
          </div>
          <div className='col'>
            <input className='form-control mb-2' type="text" placeholder={'Your Pet\'s Favorite Toy'} {...register('favoriteToy', { required: true })} />
          </div>
        </div>

        <div className='row'>
          <div className='col'>
            <select className='form-select mb-2' {...register('spayedNeutered', { required: true })}>
              <option defaultValue=''>Spayed or Neutered?</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <div className='col'>
            <select className='form-select mb-2' {...register('friendlyWithChildren', { required: true })}>
              <option defaultValue=''>Friendly with Kids?</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <div className='col'>
            <select className='form-select mb-2' {...register('friendlyWithAnimals', { required: true })}>
              <option defaultValue=''>Friendly with Animals?</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

        </div>

      <div className='row'>
        <div className='col'>
            <input className='form-control mb-2' type="tel" placeholder="Vet Contact Phone Number" {...register('vetContact', { required: true })} />
       </div>
      </div>

      <div className='row'>
        <div className='col'>
          <input className='form-control mb-2' type="text" placeholder="Food Type (Brand, Style, etc.)" {...register('foodType', { required: true })} />
        </div>
      </div>

        <textarea className='form-control mb-2' placeholder={'Tell Us About Your Pet\'s Food Routine'} {...register('foodSchedule', { required: true })} />
        <textarea className='form-control mb-2' placeholder={'Tell Us About Your Pet\'s Bathroom Routine'} {...register('bathroomRoutine', { required: true })} />
        <textarea className='form-control mb-2' placeholder="Tell Us About Your Pet and Any Useful Information" {...register('additionalInformation', { required: true })} />

      <div className='d-grid gap-2'>
          <input className='custom-button mb-5' type="submit" />
      </div>

      </form>
    </div>
  );
}
