import React, { useEffect, useState } from "react";
import styles from "./Header.module.css";
import profileIcon from "../../../assets/profile-icon.svg";
import chevronDown from "../../../assets/chevron-down.svg";
import Image from "next/image";
import useOnclickOutside from "react-cool-onclickoutside";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { IsAuth } from "../../../redux/slice/sign_in";
import { useRouter } from "next/router";
import { toast } from "react-toastify";


export const Header = () => {
  const [isDropdown,setIsDropdown]=useState(false);
  const [userData,setuserData]=useState(null)
  const router=useRouter();

  const handleLogout=()=>{
    localStorage.clear();
    setuserData(null);
    setIsDropdown(false);
    toast.success('Logout Successfully!');
    router.push("/login")
  }
    const dropdownRef = useOnclickOutside(() => {
        setIsDropdown(false);
    });
    
  useEffect(()=>{
    console.log(localStorage.getItem('adminData'),'admin token');
    localStorage.getItem('adminData') && router.pathname!='login'
    ? setuserData(localStorage.getItem('adminData'))
    :router.push("/login")
  },[]);

  return <div className={styles.navbarContainer} >
    {userData? 
    <>
    <div className={styles.profileContainer} 
     onClick={()=>setIsDropdown(!isDropdown)}
     ref={dropdownRef}
     >
      <Image src={profileIcon} alt="" width={100} height={50}/>
      <p className={styles.userName}>{JSON.parse(userData)?.name}</p>
      <Image src={chevronDown} alt="" width={100} height={50}/>
     </div>
     {isDropdown &&<div className={styles.dropdown} ref={dropdownRef}>
       <div onClick={handleLogout}>Logout</div>
     </div>
     }
     </>
     :
     <button className={'Button'}>
      <Link href='/login'>Sign In</Link>
     </button>
    }
    </div>;
};
