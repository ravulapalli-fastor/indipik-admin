import React from "react";
import styles from "./Header.module.css";
import profileIcon from "../../../assets/profile-icon.svg";
import chevronDown from "../../../assets/chevron-down.svg";
import Image from "next/image";

export const Header = () => {
  return <div className={styles.navbarContainer}>
     <div className={styles.profileContainer}>
      <Image src={profileIcon} alt="" width={100} height={50}/>
      <p className={styles.userName}>User</p>
      <Image src={chevronDown} alt="" width={100} height={50}/>
     </div>
     <div className={styles.dropdown}>
       hi hello
     </div>
    </div>;
};
