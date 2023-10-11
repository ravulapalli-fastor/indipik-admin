import React from "react";
import styles from './Confirmation.module.css';
import Image from "next/image";
import popupImage from "../../../assets/conformationPopup.svg"

const ConfirmationPopup = ({
  type='Image',
  setConfirmationModalOpen,
  handleRemove
}) => {
  return <div className={'modalWrapper'}>
    <div className={styles.container}>
        <Image src={popupImage} alt="" width={100} height={100}/>
        <h3>Remove {type}</h3>
        <p>Are you sure you want to remove this {type.toLocaleLowerCase()}? This action cannot be undone.</p>
        <div className={styles.btnContainer}>
          <button 
          className={`Button ${styles.cancelBtn}`}
          onClick={()=>setConfirmationModalOpen(false)}
          >
            Cancel
          </button>
          <button 
          className={`Button ${styles.removeBtn}`}
          onClick={()=>{handleRemove();setConfirmationModalOpen(false)}}>
            Remove
          </button>
        </div>
    </div>
  </div>;
};

export default ConfirmationPopup;
