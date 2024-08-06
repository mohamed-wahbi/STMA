import React, { useState } from 'react';
import axios from 'axios';
import { Link , useNavigate} from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mesg, setMesg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      axios.post('http://127.0.0.1:5050/api/auth/login', { email, password })
      .then((resulta) => {
        console.log((resulta.data.isTechnicien));

        if ((resulta.status===200) && (resulta.data.isTechnicien)){
          localStorage.setItem('token',resulta.data.token);
          navigate('/homeTechnicien')
        }

        else if ((resulta.status===200) && (resulta.data.isAdmin)) {
          localStorage.setItem('token',resulta.data.token);
          navigate('/homeadmin');
        }
        else if ((resulta.status===200) && !(resulta.data.isAdmin)){
          localStorage.setItem('token',resulta.data.token);
          navigate('/home')
        }
        
      })
      .catch((err) => {
        console.log(err);
        setMesg("Error: Email or password is incorrect!");
      });
    } else {
      setMesg("Error: All inputs must be filled in!");
    }
  };

  return (
    <div className='allSignup'>
      <div className='registerSignup'>
        <h2>Login_Page:</h2>
        <form onSubmit={handleSubmit} className='formSignup'>
          <div className='labelSignup'>
            <label>Email:</label>
            <input type='email' placeholder='Enter Email' name='email' onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className='labelSignup'>
            <label>Password:</label>
            <input type='password' placeholder='Enter Password' name='password' onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className='btnRegisterSignup'>
            <button type='submit'>Login</button>
            <p style={{ color: 'red' }}>{mesg}</p>
          </div>
        </form>
        <div className='alertSignup'>
          <p>You don't have an account!</p>
          <Link to='/register'>Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
