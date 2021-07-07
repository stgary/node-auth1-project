import React, { useState } from 'react'
import axios from 'axios';

const initFormValues = {
  username: '',
  password: '',
}

export default function Register() {
  const [formValues, setFormValues] = useState(initFormValues);
  const ENDPOINT = 'http://localhost:5000/api/auth/register';

  const onChange = e => {
    const { name } = e.target;
    const { value } = e.target;

    setFormValues({...formValues, [name]: value })
    console.log(formValues);
  }

  const onValueChange = e => {
    const { value } = e.target;

    setFormValues({...formValues, role: value })
    console.log(formValues);
  }

  const onSubmit = e => {
    e.preventDefault();
    axios.post(ENDPOINT, {
      username: formValues.username.trim(),
      password: formValues.password.trim(),
      role: formValues.role,
    })
      .then(res => {
        console.log(res.data);
      })
      .catch(error => {
        console.log(error);
      });
      setFormValues(initFormValues);
  }

  return (
    <div className='register-outerContainer'>    
      <div className='register-innerContainer'>
        <form className='register-form' onSubmit={ onSubmit }>
          <input 
            className='register-input'
            type='text'
            name='username'
            value={ formValues.username }
            placeholder='username'
            onChange={ onChange }
          />
          <input 
            className='register-input'
            type='password'
            name='password'
            value={ formValues.password }
            placeholder='password'
            onChange={ onChange }
          />
          <div className='radio-container'>
            <label>admin
              <input
                className='radio'
                type='radio'
                name='role'
                value={ 1 }
                onChange={ onValueChange }
              />
            </label>
            <label>user
              <input
                className='radio'
                type='radio'
                name='role'
                value={ 2 }
                onChange={ onValueChange }
              />
            </label>
          </div>
          <button className='register-button'>Register</button>
        </form>
      </div>
    </div>
  )
}
