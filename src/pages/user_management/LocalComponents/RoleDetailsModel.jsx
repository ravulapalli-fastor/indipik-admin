import React from "react";
import Modal from '../../../components/Modal/Modal'
import styles from '../../../styles/userManagement.module.css';

const RoleDetailsModel = ({
  setIsModalOpen,
  setIdSelected,
  data,
}) => {
  return (
    <>
     <Modal
      goBackText='Details'
      goBackBtnClick={()=>{setIsModalOpen(false);setIdSelected("")}}
      isFooterCta={false}
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
                  <td>Total Users</td>
                  <td>{data?.total_users}</td>
                </tr>
                <tr>
                  <td>Module Access</td>
                </tr>
                <tr>
                  <td>Activity</td>
                  <td>{(data?.activity)?.toLocaleLowerCase()}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
     </Modal>
    </>
  );
};

export default RoleDetailsModel
