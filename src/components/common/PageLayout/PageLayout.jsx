import React from "react";
import styles from "./PageLayout.module.css";
import { Header } from "../Header/Header";
import { SideNavbar } from "./LocalComponents/SideNavbar/SideNavbar";

export const PageLayout = ({children}) => {
  return <div className={styles.mainContainer}>
    <SideNavbar/>
    <div className={styles.innerContainer}>
        <Header/>
        <div className={styles.childContainer}>
          <div className={styles.childInnerContainer}>
            {children}
          </div>
        </div>
    </div>
    </div>;
};
