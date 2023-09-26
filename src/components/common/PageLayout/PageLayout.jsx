import React, { useEffect } from "react";
import styles from "./PageLayout.module.css";
import { Header } from "../Header/Header";
import { SideNavbar } from "./LocalComponents/SideNavbar/SideNavbar";
import {useRouter} from 'next/router'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const PageLayout = ({children}) => {
  let token =''
  const router=useRouter();

  useEffect(() => {
  // Perform localStorage action
   token = localStorage.getItem('adminToken') || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIiLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTY5Mzk3Nzc2NCwiZXhwIjoxNjk2NTY5NzY0fQ.0Ajhh_FvMwi8nH7jXv8bOAd75oG-HBgv2WKBa11Hr64';
   if(!token){
    console.log(router.pathname);
    router.push('/login')
  }
  }, [])

  return <>
  <div className={styles.mainContainer}>
    <SideNavbar/>
    <div className={styles.innerContainer}>
        <Header/>
        <div className={styles.childContainer}>
          <div className={styles.childInnerContainer}>
            {children}
          </div>
        </div>
    </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover      
      />
    </div>
    </>;
};
