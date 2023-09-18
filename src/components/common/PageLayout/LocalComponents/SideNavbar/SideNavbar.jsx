import React from "react";
import styles from "./SideNavbar.module.css"
import Image from "next/image";
import logo from "../../../../../assets/Indipik.svg";
import dashboardImg from "../../../../../assets/dashboard.svg";
import imageSvg from "../../../../../assets/gallery.svg";
import videoSvg from "../../../../../assets/video.svg";
import keywordsSvg from "../../../../../assets/message-edit.svg";
import usersSvg from "../../../../../assets/profile-2user.svg";
import userManagementSvg from "../../../../../assets/user.svg"
import { useRouter } from "next/router";

export const SideNavbar = () => {
    const router=useRouter();
    const pathname=router.pathname;
  return <div className={styles.sideNavbarContainer}>
        <div className={styles.logoImage}>
            <Image  src={logo} alt="Indipik" width={150} height={80}/>
        </div>
        <a href="/" className={`${styles.sidebarMenu} ${pathname=="/"?styles.activeMenu:''}`}>
            <Image  className={styles.sidebarMenuImg} src={dashboardImg} alt="svg" width={100} height={100}/>
            <p className={styles.sidebarMenuTitle}>Dashboard</p>
        </a>
        <a href="/image" className={`${styles.sidebarMenu} ${pathname=="/image"?styles.activeMenu:''}`}>
            <Image  className={styles.sidebarMenuImg} src={imageSvg} alt="svg" width={100} height={100}/>
            <p className={styles.sidebarMenuTitle}>Image</p>
        </a>
        <a href="/video" className={`${styles.sidebarMenu} ${pathname=="/video"?styles.activeMenu:''}`}>
            <Image  className={styles.sidebarMenuImg} src={videoSvg} alt="svg" width={100} height={100}/>
            <p className={styles.sidebarMenuTitle}>Video</p>
        </a>
        <a href="/keywords" className={`${styles.sidebarMenu} ${pathname=="/keywords"?styles.activeMenu:''}`}>
            <Image  className={styles.sidebarMenuImg} src={keywordsSvg} alt="svg" width={100} height={100}/>
            <p className={styles.sidebarMenuTitle}>Keywords</p>
        </a>
        <a href="/platform_users" className={`${styles.sidebarMenu} ${pathname=="/platform_users"?styles.activeMenu:''}`}>
            <Image  className={styles.sidebarMenuImg} src={usersSvg} alt="svg" width={100} height={100}/>
            <p className={styles.sidebarMenuTitle}>Platform Users</p>
        </a>
        <a href="/user_management" className={`${styles.sidebarMenu} ${pathname=="/user_management"?styles.activeMenu:''}`}>
            <Image  className={styles.sidebarMenuImg} src={userManagementSvg} alt="svg" width={100} height={100}/>
            <p className={styles.sidebarMenuTitle}>User Management</p>
        </a>    
    </div>;
};
