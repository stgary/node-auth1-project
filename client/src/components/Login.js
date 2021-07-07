import React, { useState } from 'react'
import axios from 'axios';

const initFormValues = {
  username: '',
  password: '',
}

export default function Login() {
	const [formValues, setFormValues] = useState(initFormValues);
	const [loggedIn, setLoggedIn] = useState(false);
	const [users, setUsers] = useState([]);

	const INENDPOINT = 'http://localhost:5000/api/auth/login';
	const OUTENDPOINT = 'http://localhost:5000/api/auth/logout';
	const USERENDPOINT = 'http://localhost:5000/api/users';

	const getUsers = () => {
		axios(USERENDPOINT, {
			method: 'get',
			withCredentials: true
		})
			.then(res => {
				setUsers(res.data)
				console.log(res.data);
			})
			.catch(error => {
				console.log(error.data);
			})
	}


  const onChange = e => {
    const { name } = e.target;
    const { value } = e.target;

    setFormValues({
			...formValues, 
			[name]: value 
		})
  }

  const onSubmit = e => {
		e.preventDefault();
		axios(INENDPOINT, {
			method: 'post',
			data: {
      	username: formValues.username.trim(),
      	password: formValues.password.trim(),
			},
			withCredentials: true,
		})
      .then(res => {
				console.log(res.data);
				getUsers();
      })
      .catch(error => {
        console.log(error);
			});
			setFormValues(initFormValues);
	}
	
	const logout = () => {
		axios.get(OUTENDPOINT)
			.then(res => {
				console.log(res.data);
				setLoggedIn(false);
			})
			.catch(error => {
				console.log(error);
			});
	}

  return (
    <div className='login-outerContainer'>    
      <div className='login-innerContainer'>
        <form className='login-form' onSubmit={ onSubmit }>
          <input 
            className='login-input'
            type='text'
            name='username'
            value={ formValues.username }
            placeholder='username'
            onChange={ onChange }
          />
          <input 
            className='login-input'
            type='password'
            name='password'
            value={ formValues.password }
            placeholder='password'
            onChange={ onChange }
          />
          <button className='login-button'>Login</button>
        </form>
				<button onClick={ logout } className='logout-button'>Logout</button>
      </div>
			<div className='list-container'>
				{users.map(user => {
					return(
					<p className='list-item'>{user.username}</p>
					);
				})}
			</div>
    </div>
  )
}
