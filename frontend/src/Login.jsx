import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [userType, setSelectedOption] = useState('');
  const navigate = useNavigate()

    const handleOptionChange = (event) => {
      setSelectedOption(event.target.value);
    };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post('http://localhost:5000/login', {
        email,
        password,
        userType,
      })
      .then((res) => {
        if (res.data.Status === "Success") {
          // Redirect to the home page after successful login
          navigate('/');
        } else {
          setError(res.data.error);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };


  return (

    <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
    <div className='p-3 rounded w-25 border loginForm'>
        <div className='text-danger'>
            {error && error}
        </div>
        <br></br>
        <h2>Welcome</h2>
        <br></br>
        <form onSubmit={handleSubmit}>
            <div className='mb-3'>
                <label htmlFor="email"><strong>Email</strong></label>
                <input type="email" placeholder='Enter Email' name='email' 
                  onChange={handleEmailChange} className='form-control rounded-0' autoComplete='off'/>
            </div>
            <div className='mb-3'>
                <label htmlFor="password"><strong>Password</strong></label>
                <input type="password" placeholder='Enter Password' name='password'
                  onChange={handlePasswordChange} className='form-control rounded-0' />
            </div>
            <div>
            <label htmlFor="selecoption"><strong>Select your role:</strong></label>
       <select id="userType" name="userType" onChange={handleOptionChange}>
        <option value="">--Please choose an option--</option>
        <option value="manager">Manager</option>
        <option value="employee">Employee</option>
       </select>
            </div>
            <br>
            </br>
            <button type='submit' className='btn btn-success w-100 rounded-0'> Log in</button>
            <p>You are agree to aour terms and policies</p>
        </form>
     </div>
</div>

  );
}

export default Login;
