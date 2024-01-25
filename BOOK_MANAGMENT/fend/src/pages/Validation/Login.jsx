import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import backgroundImage from './log1.jpg'; // Replace with the actual path to your background image
import  validation from './LoginValidation.js';




function Login() {
  const [values,setValues]=useState({
    email:'',
    password:''
  })
  const navigate = useNavigate();
  
  const [errors,setErrors]=useState({})
  
  const handleInput = (event)=>{
    setValues(prev =>({...prev, [event.target.name]:[event.target.value]}))
  }
  
  //axios.defaults.withCredentials =true;

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(validation(values));
  
    if (errors.email === "" && errors.password === "") {
      axios.post("http://localhost:8800/users/", values)
        .then((res) => {
          console.log("Response from server:", res.data); // Log the response
          if (res.data === "success") {
            // Check if the user is an admin
            if (values.email === "ingale@gmail.com" && values.password === "770908ABHI408ad") {
              // Admin login successful
              console.log("Admin login successful");
              navigate('/home'); // Redirect to the admin dashboard or any other admin page
            } else {
              // Regular user login successful
              console.log("Regular user login successful");
              navigate('/home');
            }
          } else {
            alert("No records existed");
          }
        })
        .catch((err) => console.error("Error from server:", err));
    }
  };
  

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        backgroundImage: `url(${backgroundImage})`, // Apply the background image
        backgroundSize: 'cover',
      }}
    >
      <div className="bg-white p-3 rounded w-25">
        <h2 >LogIn</h2>
        <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              autoComplete="off"
              name="email"
              className="form-control rounded-0"
              onChange={handleInput}
            />
            {errors.email && <span className='text-danger'>{errors.email}</span>}
          </div>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              className="form-control rounded-0"
              onChange={handleInput}
            />
            {errors.password && <span className='text-danger'>{errors.password}</span>}
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">
            Login
          </button>
          
        </form>
        <p>Don't Have an Account</p>
        <Link
          to="/signup"
          className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}

export default Login;
