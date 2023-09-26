import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/userManagement.module.css'
import { PageLayout } from '../../components/common/PageLayout/PageLayout'
import TopBar from '../../components/common/TopBar/TopBar'
import { useState } from 'react';
import style from "../../styles/Table.module.css"
import chevronRight from "../../assets/chevron-down.svg";
import Modal from '../../components/Modal/Modal'
import FilterDropdown from '../../components/FilterDropdown/FilterDropdown'

export default function index() {
  const [isAddNewModal,setIsAddNewModal]=useState(false);
  const [filterSelected,setFilterSelected]=useState('Users');
  const [isModalOpen,setIsModalOpen]=useState(false);
  const [idSelected,setIdSelected]=useState(null);
  const [selectedOption,setSelectedOption]=useState('Active');

  const userHeaders=["S.No","Name","Email","Role","Status","Action"];
  const roleHeaders=["S.No","Name","Users","Status","Action"];
  const tableHeaders=filterSelected=="Users"?userHeaders:roleHeaders;

  return (
  <div className={styles.outerContainer}>
     <PageLayout>
      <TopBar
       pageTitle="User Management"
       setIsAddNewModal={setIsAddNewModal}
       isAddButton={true}
       filterSelected={filterSelected}
       titleOptions={["Users","Roles"]}
       setFilterSelected={setFilterSelected}
      />
        <div className={style.tableContainer}>
          <table>
            <thead>
              <tr>
                {tableHeaders?.map((header)=>(
                  <th>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filterSelected=="Users"?
              <tr>
                <td>1</td>
                <td>Aryan Sharma</td>
                <td>April 20, 2023</td>
                <td>10</td>
                <td className={style.status}>Active</td>
                <td >
                  <Image src={chevronRight} alt="" width={50} height={50} 
                  onClick={()=>{
                  setIsModalOpen(true);
                  setIdSelected(0)
                  }}
                  />
                </td>
              </tr>
              :
              <tr>
                <td>1</td>
                <td>Aryan Sharma</td>
                <td>10</td>
                <td className={style.status}>Active</td>
                <td >
                  <Image src={chevronRight} alt="" width={50} height={50} 
                  onClick={()=>{
                  setIsModalOpen(true);
                  setIdSelected(0)
                  }}
                  />
                </td>
              </tr>
            }
            </tbody>
          </table>  
        </div>    
      </PageLayout>
    {isModalOpen && 
    <Modal 
    goBackText='Details'
    goBackBtnClick={()=>{setIsModalOpen(false);setIdSelected("")}}
    isFooterCta={false}
    >
      {filterSelected=='Users'?
      <div className={styles.modalDetails}>
        <div className={styles.fileDetails}>
          <p className={styles.title}>Basic Details</p>
          <div className={styles.detailsContainer}>
            <table>
              <tr>
                <td>Name</td>
                <td>Aryan Sharma</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>a@gmail.com</td>
              </tr>
              <tr>
                <td>Role</td>
                <td>Admin</td>
              </tr>
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
      :
      <div className={styles.modalDetails}>
        <div className={styles.fileDetails}>
          <p className={styles.title}>Basic Details</p>
          <div className={styles.detailsContainer}>
            <table>
              <tr>
                <td>Name</td>
                <td>Aryan Sharma</td>
              </tr>
              <tr>
                <td>Total Users</td>
                <td>15</td>
              </tr>
              <tr>
                <td>Module Access</td>
                <td>Reject</td>
              </tr>
              <tr>
                <td>Activity</td>
                <td>Read, Write</td>
              </tr>            
            </table>
          </div>
        </div>
      </div>    
      }
    </Modal>
    }
    {isAddNewModal&&
    <Modal 
    goBackText='Add New'
    goBackBtnClick={()=>{setIsAddNewModal(false)}}
    isFooterCta={true}
    >
    add new screen
    </Modal>
    }     
    </div>
  )
}
