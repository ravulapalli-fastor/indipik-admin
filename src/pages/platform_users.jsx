import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/PlatformUsers.module.css'
import { PageLayout } from '../components/common/PageLayout/PageLayout'
import TopBar from '../components/common/TopBar/TopBar'
import { useEffect, useState } from 'react';
import chevronRight from "../assets/chevron-down.svg";
import style from "../styles/Table.module.css"
import Modal from '../components/Modal/Modal'
import deleteImg from "../assets/delete.svg";
import FilterDropdown from '../components/FilterDropdown/FilterDropdown'
import { useDispatch } from 'react-redux'
import { getPlatformUsersDetails } from '../redux/slice/platform_users'

export default function index() {
  const [isModalOpen,setIsModalOpen]=useState(false);
  const [idSelected,setIdSelected]=useState(null);
  const [filterSelected,setFilterSelected]=useState('Contributors');
  const tableHeaders=["S.No","Name","Joined Date","Total Items Uploaded","Status","Action"];
  const [selectedOption,setSelectedOption]=useState('Active');

  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(getPlatformUsersDetails(filterSelected=='Contributors'?true:false));
  },[filterSelected]);
  
  return (
  <div className={styles.outerContainer}>
     <PageLayout>
      <TopBar
       pageTitle="Platform Users"
       setFilterSelected={setFilterSelected}
       titleOptions={["Contributors","Buyers"]}
       filterSelected={filterSelected}
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
                <td>Joined On</td>
                <td>12-09-23</td>
              </tr>
              <tr>
                <td>Total Items Uploaded</td>
                <td>5</td>
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
    </Modal>
    }  
  </div>
  )
}
