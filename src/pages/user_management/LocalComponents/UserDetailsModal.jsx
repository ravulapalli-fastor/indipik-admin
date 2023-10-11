import React, { useState } from "react";
import Modal from '../../../components/Modal/Modal'
import styles from '../../../styles/userManagement.module.css';
import FilterDropdown from "../../../components/FilterDropdown/FilterDropdown";
import { useDispatch } from "react-redux";
import { userStatus } from "../../../redux/slice/user_management";

const UserDetailsModel = ({
  setIsModalOpen,
  setIdSelected,
  data,
}) => {
  const [selectedOption,setSelectedOption]=useState('Active');
  const dispatch=useDispatch();
  const handleSubmitStatus=()=>{
    dispatch(userStatus({
        'admin_id':data?.id,
        'status':selectedOption?.toLocaleUpperCase()
    }));
    setIsModalOpen(false);
  }
  return (
    <>
     <Modal
      goBackText='Details'
      goBackBtnClick={()=>{setIsModalOpen(false);setIdSelected("")}}
      isFooterCta={true}
      onSubmitCta={handleSubmitStatus}
     >
      <div className={styles.modalDetails}>
        <div className={styles.fileDetails}>
          <p className={styles.title}>Basic Details</p>
          <div className={styles.detailsContainer}>
            <table>
              <tbody>
                <tr>
                  <td>Name</td>
                  <td>{data?.name}</td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>{data?.email}</td>
                </tr>
                <tr>
                  <td>Role</td>
                  <td>{data?.admin_permissions?.[0]?.role?.name}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className={styles.statusContainer}>
          <p className={styles.title}>Status</p>
          <FilterDropdown 
          isFilter={false}
          options={["Active","Suspend"]}
          setSelectedOption={setSelectedOption}
          selectedOption={selectedOption}
          />
        </div>
      </div>
     </Modal>
    </>
  );
};

export default UserDetailsModel
