import Head from 'next/head'
import Image from 'next/image';
import style from "../styles/Table.module.css"
import styles from '../styles/Home.module.css'
import { PageLayout } from '../components/common/PageLayout/PageLayout'
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import TopBar from '../components/common/TopBar/TopBar';
import chevronRight from "../assets/chevron-down.svg";

export default function index() {
  const [isModalOpen,setIsModalOpen]=useState(false);
  const [idSelected,setIdSelected]=useState(null);
  const [filterSelected,setFilterSelected]=useState('Users');
  const tableHeaders=["S.No","Name","Email","Role","Status","Action"];
  const [selectedOption,setSelectedOption]=useState('Active');

  const dispatch=useDispatch();
  useEffect(()=>{
    // dispatch(getPlatformUsersDetails(filterSelected=='Contributors'?true:false));
  },[filterSelected]);

  return (
     <PageLayout>
      <TopBar
       pageTitle="User Management"
       setFilterSelected={setFilterSelected}
       titleOptions={["Users","Roles"]}
       filterSelected={filterSelected}
       isAddButton={true}
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
  )
}
