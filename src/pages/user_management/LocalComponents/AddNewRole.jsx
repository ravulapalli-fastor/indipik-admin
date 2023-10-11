import React, { useState } from "react";
import Modal from '../../../components/Modal/Modal'
import styles from './AddNewRole.module.css';

const AddNewRole = ({
  setIsAddNewModal,
}) => {
  const [name,setName]=useState('');
  // const { name, activity } = body;
  const modules=[

  ]
  return (
    <>
     <Modal
      goBackText='Add New Role'
      goBackBtnClick={()=>{setIsAddNewModal(false)}}
      isFooterCta={false}
     >
      <div className={styles.modalDetails}>
        <p className={styles.title}>Name</p>
        <input 
        placeholder='Enter Name...'
        name='name'
        onChange={(e)=>setName(e.target.value)}
        />
      </div>
      <p className={styles.title}>Image</p>
      <p className={styles.title}>Video</p>
      <p className={styles.title}>Keywords</p>
      <p className={styles.title}>Platform Users</p>
     </Modal>
    </>
  );
};

export default AddNewRole;
