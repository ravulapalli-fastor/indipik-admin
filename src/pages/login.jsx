import React, { useEffect, useState } from "react";
import style from '../styles/signin.module.css'
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/router';
import { adminLogin } from "../redux/slice/sign_in";
import logo from '../assets/Indipik.svg';
import backArrow from "../assets/arrow-left.svg";
import Image from "next/image";
import Link from "next/link";
import eyes from "../assets/Eyes.svg";
import eye_hide from "../assets/eye_hide.svg";
import { toast } from "react-toastify";


const index = () => {
  const {login } = useSelector((state)=> state.signInReducer);
  const [email,setEmail]=useState('');
  const [errText, setErrText] = useState("");
  const [errType, setErrType] = useState("");
  const [passwordShow,setPasswordShow]=useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [password,setPassword]=useState('');
  const [registerDetails,setRegisterDetail]=useState({
    name:'',
    email:'',
    password:''
  });
  const [type,setType]=useState('login');
  const dispatch=useDispatch();
  const router=useRouter();


  const handleData=(e)=>{
    let {name,value}=e.target;
    setEmail(value);
    if(errText!==""){
    setErrText("");
    setErrType("");
    }
  };

  const handleSignin=async()=>{
    if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
          await dispatch(adminLogin({
            email:email,password:password
          })).then((res)=>{
            toast.success("Successfully Sign in!",{toastId:'loginId'});
            router.push(`/`);
          })
        .catch((e)=>{
          console.log(e,"error")
        })
    }else{
      setErrType("email");
      if(email==="") setErrText("Please enter your email id");
      else setErrText("Email Id is incorrect, please enter correct email");
    }
  }

  return (
    <div className={style.login_main_container}>
      <div className={style.login_left_container}>
          {!isLogin && <Image src={backArrow} alt="back_arrow" 
          onClick={()=>{setIsLogin(true)}}
          width={24} height={24} 
          className={style.back_arrow}/>
          }
          <Image src={logo} alt="images" width={100} height={100}className={style.main_image}/>
      </div>
      <div className={style.login_right_container}>
        <div className={style.login_right_data_container}>
        {isLogin?(
          <>
          <p className={style.welcome_title}>Welcome back!</p>
          <h2 className={style.login_title}>Login to your account</h2>
          <div className={style.email_container}>
    <div className={style.input_container}
      style={{
          border:errType=="email"?"1px solid rgb(238, 13, 13)":"1px solid #cdcdcd"
      }}
    >
      <input className={style.inputfield}
      placeholder="Email ID"
      type="email"
      name="email"
      onChange={(e)=>setEmail(e.target.value)}
      />
    </div>
    {errType=="email" && <p className={style.error_text}>{errText}</p>}
    <div className={style.input_container} 
      style={{
          border:errType=="password"?"1px solid rgb(238, 13, 13)":"1px solid #cdcdcd"
      }}
    >
      <input className={style.inputfield}
      placeholder="Password"
      type={passwordShow?"text":"password"}
      name="password"
      minLength={4}
      maxLength={4}
      onChange={(e)=>setPassword(e.target.value)}
      />
      <Image 
      src={passwordShow?eye_hide:eyes} 
      alt="password" 
      width={16} height={16} 
      onClick={()=>setPasswordShow(!passwordShow)}
      />
    </div>
    {errType=="password" && <p className={style.error_text}>{errText}</p>}
    <div className={style.not_registered}>
    {/* <div className={style.forgot_password}
    // onClick={handleForgotPassword}
    >
      Forgot password ?
    </div> */}
    </div>
    <div className={style.sign_button}>
    <button className={"Button"}
        onClick={handleSignin}
    >
        Sign in
    </button>
     </div>
         </div> 
         </>         
        ):(
            <>
            hello
            </>
          )}
        </div>
      </div>
  </div>
  );
};

export default index;
