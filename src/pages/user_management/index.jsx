import Head from 'next/head'
import Image from 'next/image';
import style from "../../styles/Table.module.css"
import styles from '../../styles/Home.module.css'
import { PageLayout } from '../../components/common/PageLayout/PageLayout'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TopBar from '../../components/common/TopBar/TopBar';
import chevronRight from "../../assets/chevron-down.svg";
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';
import { getUserManagementRoleDetails } from '../../redux/slice/user_management';
import RoleDetailsModel from './LocalComponents/RoleDetailsModel';

export default function index() {
  const [isModalOpen,setIsModalOpen]=useState(false);
  const [idSelected,setIdSelected]=useState(null);
  const [filterSelected,setFilterSelected]=useState('Users');
  const tableHeaders=filterSelected=='Users' 
    ?["S.No","Name","Email","Role","Status","Action"]
    :["S.No","Name","Users","Activity","Action"];
  const [selectedOption,setSelectedOption]=useState('Active');
  const {UserManagementData,RoleManagementData,total_pages}=useSelector(s=>s.userManagementReducer);
  const [currentPage,setCurrentPage]=useState(1);
  const [dataSelected,setDataSelected]=useState(null);


  const dispatch=useDispatch();
  useEffect(()=>{
    filterSelected!='Users' ?
     dispatch(getUserManagementRoleDetails())
     :''
  },[filterSelected]);

  return (
  <div className={styles.outerContainer}>
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
              {filterSelected=='Users'?
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
              RoleManagementData?.map((data,index)=>(
              <tr>
                <td>{(currentPage-1)*10+(index+1)}</td>
                <td>{data?.name}</td>
                <td>{data?.total_users}</td>
                <td>{(data?.activity)?.toLocaleLowerCase()}</td>
                <td >
                  <Image src={chevronRight} alt="" width={50} height={50} 
                  onClick={()=>{
                  setIsModalOpen(true);
                  setDataSelected(data);
                  }}
                  />
                </td>
              </tr>
              ))
              }
            </tbody>
          </table>  
        </div> 
      {total_pages>1 && 
        <div className={'paginationContainer'}>
        {" "}
        <ResponsivePagination
        current={currentPage}
        total={total_pages}
        onPageChange={setCurrentPage}
       />
       </div>
      }      
    </PageLayout>
    {isModalOpen ?
    filterSelected=='Users'
    ?''
    :<RoleDetailsModel
     setIdSelected={setIdSelected}
     setIsModalOpen={setIsModalOpen}
     data={dataSelected}
    />
    :''
    }
  </div>
  )
}
