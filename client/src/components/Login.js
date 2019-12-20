import React, { useState } from "react";
import { axiosWithAuth } from '../utils/axiosWithAuth';

const Login = props => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  })


  const handleSubmit = e => {
    e.preventDefault();
    console.log(credentials)
    axiosWithAuth()
      .post('/login', credentials)
      .then(res =>
        localStorage.setItem('token', res.data.payload),
        props.history.push('/bubbles')
      )
      .catch(err => console.log(err))
  }

  const handleChanges = e => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    })
  }

  // console.log(credentials)

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={handleSubmit}>
        <label>Username: </label>
        <input
          type="text"
          name="username"
          onChange={handleChanges}
          value={credentials.username}
        />

        <label>Password: </label>
        <input
          type="text"
          name="password"
          onChange={handleChanges}
          value={credentials.password}
        />
        <button>Login</button>
      </form>
    </>
  );
};

export default Login;
