import React from "react";
import styles from "./Modal.module.css";
import arrowLeft from "../../assets/arrow-left.svg";
import Image from "next/image";

const Modal = ({
    goBackText = "Back",
    goBackBtnClick=()=>{},
    onSubmitCta=()=>{},
    onSubmitCtaText="Submit",
    isFooterCta=true,
    children="children"
}) => {
  return <div className={styles.modalWrapper}>
    <div className={styles.dataContainer}>
        <div className={styles.goBackContainer}>
           <Image src={arrowLeft} alt="" width={24} height={24} onClick={goBackBtnClick}/>
           <p>{goBackText}</p>
        </div>
        <div style={{height:`${isFooterCta?'calc(100vh - 80px - 100px)':'calc(100vh - 80px)'}`}}>{children}</div>
        {isFooterCta && 
            <div className={styles.submitContainer}>
                <button className='Button' onClick={onSubmitCta}>{onSubmitCtaText}</button>
            </div>
        }
    </div>
  </div>;
};

export default Modal;
