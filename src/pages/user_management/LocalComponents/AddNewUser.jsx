import React, { useEffect, useState } from "react";
import Modal from '../../../components/Modal/Modal'
import styles from './AddNewRole.module.css';
import FilterDropdown from "../../../components/FilterDropdown/FilterDropdown";
import { useDispatch, useSelector } from "react-redux";
import { addNewUser, getUserManagementRoleDetails } from "../../../redux/slice/user_management";

const AddNewUser = ({
  setIsAddNewModal,
}) => {
    const [selectedOption,setSelectedOption]=useState(null);
    const dispatch=useDispatch();
    const {RoleManagementData}=useSelector(s=>s.userManagementReducer);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit=()=>{
      const payload={
        'name':name,
        'email':email,
        'role_id':[selectedOption]
      };
      dispatch(addNewUser(payload))
    }
    useEffect(()=>{
     dispatch(getUserManagementRoleDetails())
    },[]);

  return (
    <>
     <Modal
      goBackText='Add New User'
      goBackBtnClick={()=>{setIsAddNewModal(false)}}
      isFooterCta={true}
      onSubmitCta={handleSubmit}
     >
      <div className={styles.modalDetails}>
        <p className={styles.title}>Name</p>
        <input 
        name='name'
        placeholder='Enter Name...'
        onChange={(e)=>setName(e.target.value)}
        />
        <p className={styles.title}>Email</p>
        <input 
        name='email'
        placeholder='Enter EmailID...'
        onChange={(e)=>setEmail(e.target.value)}
        />
        <p className={styles.title}>Role</p>
        <FilterDropdown
        isFilter={false}
        data={RoleManagementData}
        setSelectedOption={setSelectedOption}
        />
      </div>
     </Modal>
    </>
  );
};

export default AddNewUser;
