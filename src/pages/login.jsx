import React, { useEffect, useState } from "react";
import styles from '../styles/signin.module.css'
import { useDispatch, useSelector } from "react-redux";
import { adminLogin, adminRegister } from "../redux/Slice/sign_in";
import { useRouter } from 'next/router';


const Signin = () => {
  const {login } = useSelector((state)=> state.signInReducer);
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [registerDetails,setRegisterDetail]=useState({
    name:'',
    email:'',
    password:''
  });
  const [type,setType]=useState('login');
  const dispatch=useDispatch();
  const router=useRouter();

  const handleSubmit=(e)=>{
   e.preventDefault();
   dispatch(adminLogin({email:email,password:password}))
   .then((res)=>{
    console.log(res,'res login')
    login && router.replace('/');
   })
  }
  const handleRegister=(e)=>{
   e.preventDefault();
   dispatch(adminRegister({
    email:registerDetails?.email,
    name:registerDetails?.name,
    password:registerDetails?.password
  }))
  }
  useEffect(() => {
    login && router.push('/')
  }, [login])

  return <div className={styles.mainContainer}>
    {type!='register'?
    <form className={styles.container} 
    onSubmit={(e)=>handleSubmit(e)}
    >
      <input placeholder='Enter Email' type="email" onChange={(e)=>setEmail(e.target.value)}/>
      <input placeholder="Enter Password" type='password' onChange={(e)=>setPassword(e.target.value)}/>
      <button type='submit'>
        Login
      </button>
    </form>
    :
    <form className={styles.container} 
    onSubmit={(e)=>handleRegister(e)}
    >
      <input placeholder='Enter Name' type="name" 
      onChange={(e)=>setRegisterDetail({...registerDetails,'name':e.target.value})}
      />
      <input placeholder='Enter Email' type="email" 
      onChange={(e)=>setRegisterDetail({...registerDetails,'email':e.target.value})}
      />      
      <input placeholder="Enter Password" type='password' 
      onChange={(e)=>setRegisterDetail({...registerDetails,'password':e.target.value})}
      />      
      <button type='submit'>
        Register
      </button>
    </form>
    }
  </div>;
};

export default Signin;
