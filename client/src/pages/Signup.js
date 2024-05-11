import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
import axios from "axios";
import { useSelector } from 'react-redux';

const Signup = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username:"",
    email:"",
    password:"",
  });

  const onSubmitHandler = async(e) => {
    e.preventDefault();
    try{
      const res = await axios.post(`http://localhost:8000/api/v1/user/signup`, user, {
        headers: {
          "Content-Type" : "application/json"
        },
        withCredentials: true
      });

      if(res.data.success){
        navigate("/login")
        toast.success(res.data.message)
      }
    }catch(error){
      toast.error(error.response.data.message);
      console.log(error);
    }
  
    setUser({
      username:"",
      email:"",
      password:"",
    })
  }
  
  return (
   
    <div className='h-[98vh] flex items-center justify-center'>
        <div className='p-4 w-2/6 rounded bg-gray-800 '>
            <h1 className='text-2xl font-semibold my-4'>Signup</h1>
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
            type='email' 
            placeholder='Email' 
            name='email' 
            value={user.email}
            onChange={(e) => setUser({...user, email:e.target.value})}
            className='bg-gray-700 px-3 py-2 my-3 w-full rounded' 
            required  
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
                <button type="submit" className='bg-blue-400 text-xl font-semibold text-black px-3 py-2 rounded my-3'>Signup</button> 
                <Link to="/login" className='text-gray-400 hover:text-gray-200'>Already have an account? Login here</Link>
            </div>
            </form>
        </div>
    </div>
    
  )
}

export default Signup