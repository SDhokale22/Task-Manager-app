import React, { useState } from 'react'
import axios from "axios";
import toast from 'react-hot-toast';
import {useDispatch, useSelector} from "react-redux";
import { Link, useNavigate } from 'react-router-dom'
//import { authactions } from '../redux/userSlice';

const Login = () => { 
  const [user, setUser] = useState({
    username:"",
    password:"",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitHandler = async(e) => {
    e.preventDefault();
    try{
        const res = await axios.post(`http://localhost:8000/api/v1/user/login`, user, {
          headers: {
            "Content-Type" : "application/json"
          },
          withCredentials: true
        });
        navigate("/");
        //dispatch(authactions.login);

      }catch(error){
        toast.error(error.response.data.message);
        console.log(error);
      }
    setUser({
      username:"",
      password:"",
    })
  }
  
  
  return (
    <div className='h-[98vh] flex items-center justify-center'>
        <div className='p-4 w-2/6 rounded bg-gray-800 '>
            <h1 className='text-2xl font-semibold my-4'>Login</h1>
            <form onSubmit={onSubmitHandler} action=''>
            <input 
            type='username' 
            placeholder='Username' 
            name='username'
            value={user.username}
            onChange={(e) => setUser({...user, username:e.target.value})}
            className='bg-gray-700 px-3 py-2 my-3 w-full rounded'   
            />

            <input 
            type='password' 
            placeholder='Password' 
            name='password'
            value={user.password}
            onChange={(e) => setUser({...user, password:e.target.value})}
            className='bg-gray-700 px-3 py-2 my-3 w-full rounded' 

            />

            <div className='w-full flex items-center gap-3'>
                <button type="submit" className='bg-blue-400 text-xl font-semibold text-black px-3 py-2 rounded my-3 '>Login</button> 
                <Link to="/signup" className='text-gray-400 hover:text-gray-200'>Don't have an account? Signup here</Link>
            </div>
            </form>       
        </div>
    </div>
  )
}

export default Login