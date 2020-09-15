import React, { useState } from 'react'
import axios from 'axios';

const initFormValues = {
  username: '',
  password: '',
}

export default function Register() {
  const [formValues, setFormValues] = useState(initFormValues);
  const [user, setUser] = useState();
  const ENDPOINT = 'localhost:5000/register';

  const onChange = e => {
    const { name } = e.target;
    const { value } = e.target;

    setFormValues({ [name]: value })
  }

  const onValueChange = e => {
    const { value } = e.target;

    setFormValues({ role: value })
  }

  const onSubmit = e => {
    const user = {
      username: formValues.username.trim(),
      password: formValues.password.trim(),
      role: formValues.role,
    }

    axios.post(ENDPOINT, user)
      .then(res => {
        setUser(res.data)
      })
      .catch(error => {
        console.log(error);
      });
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
            onChange={ onValueChange }
          />
          <div className='radio-container'>
            <label>admin
              <input
                className='radio'
                type='radio'
                name='role'
                value='admin'
                checked={ role === 1 }
                onChange={ onValueChange }
              />
            </label>
            <label>user
              <input
                className='radio'
                type='radio'
                name='role'
                value='user'
                checked={ role === 2 }
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
