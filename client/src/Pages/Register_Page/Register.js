import React, { useState } from 'react';
import './register.css';
import { Link, useNavigate } from 'react-router-dom';

import axios from 'axios';



const Register = () => {
    const [username,setName] = useState ();
    const [email,setEmail] = useState ();
    const [password,setPassword] = useState ();
    const [msg,setMsg] = useState ("");
    const navigate = useNavigate();

    const handeleSubmit = (e)=>{
        e.preventDefault();  
        if(username && email && password) {
            axios.post ('http://127.0.0.1:5050/api/auth/register',{username,email,password})
            .then((result)=>{
                console.log(result);
                navigate('/');
            })
            .catch((error)=>{
                console.log(error);
            })
        }
        else {
            setMsg("Error : All inputs must be filled in !")
            navigate('/register');
        }
    
    
    
    }

    return (
    <div className='allSignup'>
        <div className='registerSignup'>
            <h2>Register_Page :</h2>
            <form onSubmit={handeleSubmit} className='formSignup'>
                <div className='labelSignup'>
                    <label>Name :</label>
                    <input type='text' placeholder='Enter Name' name='name' onChange={(e)=>setName(e.target.value)}  />
                </div>

                <div className='labelSignup'>
                    <label>Email :</label>
                    <input type='email' placeholder='Enter Email' name='email' onChange={(e)=>setEmail(e.target.value)}  />
                </div>

                <div className='labelSignup'>
                    <label>Password :</label>
                    <input type='password' placeholder='Enter Password' name='password' onChange={(e)=>setPassword(e.target.value)}   />
                </div>
                <div className='btnRegisterSignup'>
                    <button type='submit' className='btnSubmit'>Register</button>
                    <p style={{color:'red'}}>{msg}</p>
                </div>
            </form>

            <div className='alertSignup'>
                <p>Already have an account !</p>
                <Link to='/'>Login</Link>
            </div>
        </div>
    </div>
  )
}

export default Register