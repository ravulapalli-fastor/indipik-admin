import React, { useState } from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import style from "../styles/register.module.css";
import logo from "../assets/Indipik.svg";
import backArrow from "../assets/arrow-left.svg";

import { useRouter } from 'next/router';
import Link from 'next/link';
import {toast} from "react-toastify"
import eyes from "../assets/Eyes.svg";
import eye_hide from "../assets/eye_hide.svg";
import { adminRegister, resendOtp, resendRegisterOtp, verifyRegisterOtp } from '../redux/slice/register';
import OTPInput from 'react-otp-input';

const index = () => {
  const [registerdata, setRegisterData] = useState({
    "email":"",
    "password":"",
    "name":"",
    "phone":"",
    "confirm_password":""
  });

  const [sucess, setSucess] = useState(false);
  const [errText, setErrText] = useState("");
  const [errType, setErrType] = useState("");
  const [isRegister, setIsRegister] = useState(true);
  const [otpLength, setOtpLength] = useState(4);
  const [isResend, setIsResend] = useState(false);
  const [isEmailResend, setIsEmailResend] = useState(false);
  const [otp, setOtp] = useState(new Array(otpLength).fill(""));
  const [finalOtp, setFinalOtp] = useState("");
  const [emailotp, setEmailOtp] = useState('');
  const [finalemailOtp, setFinalEmailOtp] = useState("");
  const [passwordShow,setPasswordShow]=useState(false);
  const [confirmPasswordShow,setConfirmPasswordShow]=useState(false);
  const dispatch=useDispatch();
  const router=useRouter();

  const handleTextData=(e)=>{
    let {name,value}=e.target;
    if(/[^a-zA-Z ]/.test(e.target.value)){
      e.target.value=e.target.value.replace(/[^a-zA-Z ]/g, '');
    }else{
      setRegisterData({...registerdata,[name]:value});
    }
    if(errText!==""){
    setErrText("");
    setErrType("");
    }
    if(sucess) setSucess(false);
  }
  const handleData=(e)=>{
    let {name,value}=e.target;
    setRegisterData({...registerdata,[name]:value});
    if(errText!==""){
    setErrText("");
    setErrType("");
    }
    if(sucess) setSucess(false);
  }


  const handleSignup=async()=>{
    if(registerdata.name){
      if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(registerdata.email)){
            if(!registerdata.password){
              setErrType("password")
              setErrText(
                "Please enter password"
              );
            } else{
              if(!registerdata.confirm_password){
                setErrType("confirm_password")
                setErrText(
                  "Please enter password"
                );

              }else{
                if(registerdata.password!==registerdata.confirm_password){
                  setErrType("confirm_password")
                  setErrText(
                    "Password doesn't match"
                  );
                }else {
                  // api call
                  try{
                    const payload={
                      name:registerdata.name,
                      email:registerdata.email,
                      password:registerdata.password,
                    //   confirm_password:registerdata.confirm_password,
                    }
                    console.log(payload,"register payload")
                    await dispatch(adminRegister(payload))
                    .then((res)=>{
                      // if(res.payload.status){
                        // setIsRegister(false);
                        toast.success("Successfully Signup!");
                        router.push("/login");
                      // }else{
                      //   toast.error(res.payload.message)
                      // }
                    })
                    }catch(e){
                      console.log("login error",e)
                    }
                }
            }
          }        
      }else{
        setErrType("email");
        if(registerdata.email==="") setErrText("Please enter your email id");
        else setErrText("Email Id is incorrect, please enter correct email");
      }
    }else{
      setErrType("name");
      setErrText("Please enter your name")
    }
  }
  // otp functions
  const onOtpChange=(x)=>{
    setFinalOtp(x);
  }
  const onEmailOtpChange=(x)=>{
    setFinalEmailOtp(x);
  }

const handleEmailResend=async()=>{
    setIsEmailResend(true)
    console.log("resend code",registerdata);
    let x=new Array(length).fill("");
    setEmailOtp(x);
    onEmailOtpChange(x.join(""));
    try{
      await dispatch(resendRegisterOtp(registerdata.email))
      }catch(e){
        console.log("login error",e)
      }
}

 const handleOtpInputChange = (x) => {
    console.log(x,"otp value",emailotp);
    setEmailOtp(x);
  };

  const handleVerify=async()=>{
    try{
      await dispatch(verifyRegisterOtp({
        email:registerdata?.email,
        email_otp:finalemailOtp,
      }))
      .then((res)=>{
        if(res.payload.status) {
        router.push("/login");
        } 
        else {
          setErrText(res.payload.message);
          setErrType("response")
        }
      })
    }catch(e){
      console.log("error",e);
    }
  }

  return (
    <div className={style.register_main_container}>
      <div className={style.register_left_container}>
          {!isRegister && <Image src={backArrow} alt="back_arrow" 
          onClick={()=>{setIsRegister(true)}}
          width={24} height={24} 
          className={style.back_arrow}/>
          }
          <Image src={logo} alt="images" width={100} height={100}className={style.main_image}/>
      </div>
      <div className={style.register_right_container}>
      {isRegister?
        <div className={style.register_right_data_container}>
          <p className={style.welcome_title}>Welcome</p>
          <h2 className={style.register_title}>Create a new account</h2>
        
        <div className={style.input_containers}>
            <input type="text" placeholder="Name" className={style.inputfield} 
              name="name"
              onChange={(e)=>handleTextData(e)}
              style={{
                  border:errType=="name"?"1px solid rgb(238, 13, 13)":"1px solid #cdcdcd"
              }}
            />
            {errType=="name" && <p className={style.error_text}>{errText}</p>}
            <input type="email" placeholder="Email" className={style.inputfield} 
            name="email"
            onChange={(e)=>handleData(e)}
            style={{
              border:errType=="email"?"1px solid rgb(238, 13, 13)":"1px solid #cdcdcd"
            }}
            />
            {errType=="email" && <p className={style.error_text}>{errText}</p>}
            <div className={style.password_container}>
            <input 
            type={passwordShow?"text":"password"} 
            placeholder="Password" className={style.inputfield} 
            name="password"
            minLength={6}
            maxLength={6}
            onChange={(e)=>handleData(e)}
            style={{
              border:errType=="password"?"1px solid rgb(238, 13, 13)":"1px solid #cdcdcd"
            }}
            />
              <Image 
              src={passwordShow?eyes:eye_hide} 
              alt="password" 
              width={16} height={16} 
              onClick={()=>setPasswordShow(!passwordShow)}
              />
            </div>
            {errType=="password" && <p className={style.error_text}>{errText}</p>}
            <div className={style.password_container}>
            <input type={confirmPasswordShow?"text":"password"} placeholder="Confirm Password" className={style.inputfield} 
            name="confirm_password"
            minLength={6}
            maxLength={6}
            onChange={(e)=>handleData(e)}
            />
              <Image 
              src={confirmPasswordShow?eyes:eye_hide} 
              alt="password" 
              width={16} height={16} 
              onClick={()=>setConfirmPasswordShow(!confirmPasswordShow)}
              />
            </div>
            {errType=="confirm_password" && <p className={style.error_text}>{errText}</p>}
        </div>
        <div className={style.already_registered}>
          <p>Already Registered?</p>
          <Link href={`/login`}>Click here to Signin</Link>
        </div>
        <div className={style.sign_button}>
        <button className='Button'
            onClick={handleSignup}
        >
            Sign up
        </button>
        </div>
        </div>
      :
      <div className={style.register_verification_container}>
   <div>              
    <h2 className={style.main_title}>OTP Verification</h2>
    <div className={style.verification_container}> 
    <p className={style.sub_title}>Enter OTP Code Sent to {registerdata?.email}</p>
    <div className={style.register_input_container} >
          <OTPInput
            value={emailotp}
            onChange={handleOtpInputChange}
            numInputs={4}
            inputType={'tel'}
            shouldAutoFocus={true}
            renderInput={(props) => <input {...props} />}
            // isInputNum={true}
           containerStyle={style.otp_flex}
          />
    </div>
    <div className={`${style.resend_container} ${style.register_resend_container}`}>
      <p className={style.resend_title}>Didn’t receive OTP code?</p>
      <p className={style.resend_code}
      onClick={handleEmailResend} 
      >Resend Code</p>
    </div>
    </div>
    <div className={style.sign_button}>
    <button className={'Button'}
        onClick={handleVerify}
    >
        Verify
    </button>
    </div>
   </div>      
   </div>
      }
      </div>
    </div>
  )
}

export default index;