import React from 'react';
import { useForm } from 'react-hook-form';

export default function SitterForm() {

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

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
    fetch('/api/sitters', req)
      .then(res => res.json())
      .then(() => {
        reset();
      })
      .catch(err => console.error(err));
    // eslint-disable-next-line no-console
    console.error(errors);
  };

  return (
    <div className='container-sm px-4 mt-5'>
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1 className='d-flex justify-content-center raleway'>Become a Pet Sitter</h1>
      <div className='row'>
        <div className='col'>
          <input className='form-control mb-2' type="text" placeholder="Full Name" {...register('fullName', { required: true, min: 1 })} />
        </div>
        <div className='col'>
          <input className='form-control mb-2' type="text" placeholder="Phone Number" {...register('phoneNumber', { required: true })} />
        </div>
      </div>

      <div className='row'>
        <div>
          <input className='form-control mb-2' type="text" placeholder="Tagline" {...register('tagline', {})} />
        </div>
        <div>
          <input className='form-control mb-2' type="text" placeholder="Image Url" {...register('imageUrl', {})} />
        </div>
      </div>

      <div className='row'>
        <div>
          <input className='form-control mb-2' type="text" placeholder="Street Address" {...register('streetAddress', { required: true })} />
        </div>
        <div className='col'>
          <input className='form-control mb-2' type="text" placeholder="City" {...register('city', { required: true })} />
        </div>
        <div className='col'>
          <select className='form-select mb-4' {...register('state', { required: true })}>
            <option defaultValue='' disabled>State</option>
            <option value="AL">AL</option>
            <option value="AK">AK</option>
            <option value="AZ">AZ</option>
            <option value="AR">AR</option>
            <option value="AS">AS</option>
            <option value="CA">CA</option>
            <option value="CO">CO</option>
            <option value="CT">CT</option>
            <option value="DE">DE</option>
            <option value="DC">DC</option>
            <option value="FL">FL</option>
            <option value="GA">GA</option>
            <option value="GU">GU</option>
            <option value="HI">HI</option>
            <option value="ID">ID</option>
            <option value="IL">IL</option>
            <option value="IN">IN</option>
            <option value="IA">IA</option>
            <option value="KS">KS</option>
            <option value="KY">KY</option>
            <option value="LA">LA</option>
            <option value="ME">ME</option>
            <option value="MD">MD</option>
            <option value="MA">MA</option>
            <option value="MI">MI</option>
            <option value="MN">MN</option>
            <option value="MS">MS</option>
            <option value="MO">MO</option>
            <option value="MT">MT</option>
            <option value="NE">NE</option>
            <option value="NV">NV</option>
            <option value="NH">NH</option>
            <option value="NJ">NJ</option>
            <option value="NM">NM</option>
            <option value="NY">NY</option>
            <option value="NC">NC</option>
            <option value="ND">ND</option>
            <option value="CM">CM</option>
            <option value="OH">OH</option>
            <option value="OK">OK</option>
            <option value="OR">OR</option>
            <option value="PA">PA</option>
            <option value="PR">PR</option>
            <option value="RI">RI</option>
            <option value="SC">SC</option>
            <option value="SD">SD</option>
            <option value="TN">TN</option>
            <option value="TX">TX</option>
            <option value="TT">TT</option>
            <option value="UT">UT</option>
            <option value="VT">VT</option>
            <option value="VA">VA</option>
            <option value="VI">VI</option>
            <option value="WA">WA</option>
            <option value="WV">WV</option>
            <option value="WI">WI</option>
            <option value="WY">WY</option>
          </select>
        </div>
        <div className='col'>
          <input className='form-control mb-1' type="text" placeholder="Zip Code" {...register('zipCode', { required: true })} />
        </div>
      </div>
      <div className='row'>
        <h1 className='d-flex justify-content-center raleway'>Services</h1>
        <div className='col'>
          <select className='form-select mb-1' {...register('service1', { required: true })}>
              <option defaultValue=''>-Select a Service-</option>
            <option value="Boarding">Boarding</option>
            <option value="House Sitting"> House Sitting</option>
            <option value="Doggy Day Care"> Doggy Day Care</option>
            <option value="Dog-Walking"> Dog-Walking</option>
            <option value="Drop-By Visits"> Drop-By Visits</option>
            <option value="Holiday Rate"> Holiday Rate</option>
            <option value="Puppy Care"> Puppy Care</option>
            <option value="Kitten Care"> Kitten Care</option>
            <option value="Drop-In Visits "> Drop-In Visits </option>
          </select>
        </div>
        <div className='col'>
          <input className='form-control' type="text" placeholder="Price for Service" {...register('service1Price', { required: true })} />
        </div>
      </div>

      <div className='row'>
        <div className='col'>
          <select className='form-select mb-1'{...register('service2', { required: true })}>
              <option defaultValue=''>-Select a Service-</option>
            <option value="Boarding">Boarding</option>
            <option value="House Sitting"> House Sitting</option>
            <option value="Doggy Day Care"> Doggy Day Care</option>
            <option value="Dog-Walking"> Dog-Walking</option>
            <option value="Drop-By Visits"> Drop-By Visits</option>
            <option value="Holiday Rate"> Holiday Rate</option>
            <option value="Puppy Care"> Puppy Care</option>
            <option value="Kitten Care"> Kitten Care</option>
            <option value="Drop-In Visits "> Drop-In Visits </option>
          </select>
        </div>
        <div className='col'>
          <input className='form-control' type="text" placeholder="Price for Service" {...register('service2Price', { required: true })} />
        </div>
      </div>

      <div className='row'>
        <div className='col'>
          <select className='form-select mb-1'{...register('service3', { required: true })}>
              <option defaultValue=''>-Select a Service-</option>
            <option value="Boarding">Boarding</option>
            <option value=" House Sitting"> House Sitting</option>
            <option value=" Doggy Day Care"> Doggy Day Care</option>
            <option value=" Dog-Walking"> Dog-Walking</option>
            <option value=" Drop-By Visits"> Drop-By Visits</option>
            <option value=" Holiday Rate"> Holiday Rate</option>
            <option value=" Puppy Care"> Puppy Care</option>
            <option value=" Kitten Care"> Kitten Care</option>
            <option value=" Drop-In Visits "> Drop-In Visits </option>
          </select>
        </div>
        <div className='col'>
          <input className='form-control' type="text" placeholder="Price for Service" {...register('service3Price', { required: true })} />
        </div>
      </div>

      <div className='row'>
        <div className='col'>
          <select className='form-select' {...register('service4', { required: true })}>
              <option defaultValue=''>-Select a Service-</option>
            <option value="Boarding">Boarding</option>
            <option value="House Sitting"> House Sitting</option>
            <option value="Doggy Day Care"> Doggy Day Care</option>
            <option value="Dog-Walking"> Dog-Walking</option>
            <option value="Drop-By Visits"> Drop-By Visits</option>
            <option value="Holiday Rate"> Holiday Rate</option>
            <option value="Puppy Care"> Puppy Care</option>
            <option value="Kitten Care"> Kitten Care</option>
            <option value="Drop-In Visits "> Drop-In Visits </option>
          </select>
        </div>
        <div className='col'>
          <input className='form-control mb-4' type="text" placeholder="Price for Service" {...register('service4Price', { required: true })} />
        </div>
      </div>

      <div className='row'>
        <div className='d-flex justify-content-center mb-4'>
          <select className='form-select' {...register('petSpecialty', { required: true })}>
              <option defaultValue=''>-Animal Specialty-</option>
            <option value="Cat">Cat</option>
            <option value="Dog">Dog</option>
            <option value="Both">Both</option>
          </select>
        </div>
      </div>

      <textarea className='form-control mb-2' placeholder='Tell us about yourself!' {...register('aboutMe', { required: true })} />
      <div className='d-grid gap-2'>
        <input type="submit" className='custom-button mb-5' />
      </div>

    </form>
    </div>
  );
}
