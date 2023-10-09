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


export const Header = () => {
  const [isDropdown,setIsDropdown]=useState(false);
  // const {userData}=useSelector((s)=>s.signInReducer);
  const [userData,setuserData]=useState(null)
  const dispatch=useDispatch();
  const router=useRouter();

  const handleLogout=()=>{
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
    setuserData(null);
    setIsDropdown(false);
  }
    const dropdownRef = useOnclickOutside(() => {
        setIsDropdown(false);
    });
  console.log(userData,'isDropdown');
  useEffect(()=>{
    localStorage.getItem('adminData') ? setuserData(localStorage.getItem('adminData')):router.push("/login")
  },[]);

  return <div className={styles.navbarContainer} >
    {userData? 
    <>
    <div className={styles.profileContainer} 
     onClick={()=>setIsDropdown(!isDropdown)}
     ref={dropdownRef}
     >
      <Image src={profileIcon} alt="" width={100} height={50}/>
      <p className={styles.userName}>User</p>
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
