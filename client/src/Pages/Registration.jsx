import React from 'react';
import LoginImage from '../Media/Login-image.png';
import {Link} from 'react-router-dom'
import { FcGoogle } from "react-icons/fc";
import Logo from '../Media/LandingPage/Logo.png' ; 
import { useState } from 'react';
import axios from 'axios' ; 
import {useNavigate} from 'react-router-dom' ; 

function Registration() {

  const navigate = useNavigate() ; 

  const [values,setValues]=useState({
    fullname:'',
    email:'',
    password:'',
});

const handleSubmit=(e)=>{
  e.preventDefault() ; 
 axios.post('http://localhost:5000/api/user/Register',values)
 .then(res=>{
  if(res.data.Status==='Success'){
    alert("Registration Successfull")
    navigate('/Login') ; 
  }else{
alert("Error ")
  }
 })
 .catch(err=>console.log(err))
}

  return (
    <>
      <div className='Login w-screen h-screen flex'>
        <div className='Image-logo w-1/2 h-screen bg-red-100 flex items-center justify-center'>
          <img src={LoginImage} alt="Login" className='w-80 h-16' />
        </div>
        <div className='login-form-container w-1/2 h-screen flex items-center justify-center'>
          <form className='login-form bg-white p-8   ' onSubmit={handleSubmit}>
            
            <h2 className='text-2xl font-bold mb-6'>Register with VoicePress! </h2>
            <h4 className='p-2'>Already  have an Account ? <Link to='/Login'><b>Log In</b></Link></h4>
             <button className='  w-80 flex items-center justify-evenly ml-2 m-2 p-2  shadow-xl border border-y-2 hover:bg-gray-200'><FcGoogle  className=''/><b>Signup with Google Account</b></button> 
             <div className='input-field mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='full-name'>Full Name</label>
              <input type='text' id='full-name' name='fullname' className='w-full p-2 my-2 border border-gray-300 rounded' onChange={(e)=>setValues({...values,fullname:e.target.value})} />
            </div> 
            <div className='input-field mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>Email</label>
              <input type='email' id='email' name='email' className='w-full my-2 p-2 border border-gray-300 rounded' onChange={(e)=>setValues({...values,email:e.target.value})}/>
            </div>
            <div className='input-field mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='password'>Password</label>
              <input type='password' id='password' name='password' className='w-full my-2 p-2 border border-gray-300 rounded' onChange={(e)=>setValues({...values,password:e.target.value})}v/>
            </div>
            
            <button type='submit' className='w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition duration-200'>Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Registration;
