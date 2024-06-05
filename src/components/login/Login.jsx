import React from 'react'
import { useState } from 'react';
import useHook from './useHook'

export default function Login() {
  const { login } = useHook();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const loginfun = (e) => {
    e.preventDefault();
    let data = {
      'email': email,
      'password': password,
    }
    login(data)
  };
  return (
    <div className='w-100 d-flex justify-content-center align-items-center vh-100' style={{ backgroundColor: "whitesmoke" }}>
      <form className="sign shadow-lg d-flex justify-content-around flex-column align-center bg-white rounded p-4 gap-3" style={{ height: "400px", width: "360px" }}>
        <h2 className='text-center'>Sign In</h2>
        <div className='d-flex justify-content-start flex-column gap-4 text-start'>
        <div className='d-grid'>
          <label className="label">Email:</label>
          <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Enter your Email" />
        </div>
        <div className='d-grid'>
          <label className="label">Password:</label>
          <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Enter your Password" />
        </div>
        <button className="input btn btn-primary" onClick={loginfun}>Login</button>
        </div>
      </form>
    </div>
  )
}
