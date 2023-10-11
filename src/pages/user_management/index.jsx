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
import { getUserManagementDetails, getUserManagementRoleDetails } from '../../redux/slice/user_management';
import RoleDetailsModel from './LocalComponents/RoleDetailsModel';
import AddNewRole from './LocalComponents/AddNewRole';
import UserDetailsModel from './LocalComponents/UserDetailsModal';
import AddNewUser from './LocalComponents/AddNewUser';

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
  const [isAddNewModal,setIsAddNewModal]=useState(false)


  const dispatch=useDispatch();
  useEffect(()=>{
    filterSelected!='Users' ?
     dispatch(getUserManagementRoleDetails())
     :dispatch(getUserManagementDetails());
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
       setIsAddNewModal={setIsAddNewModal}
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
              UserManagementData?.map((data,index)=>(
              <tr>
                <td>{(currentPage-1)*10+(index+1)}</td>
                <td>{data?.name}</td>
                <td>{data?.email}</td>
                <td>{data?.admin_permissions?.[0]?.role?.name}</td>
                <td className={style.status}>{data?.status?.toLocaleLowerCase()}</td>
                <td >
                  <Image src={chevronRight} alt="" width={50} height={50} 
                  onClick={()=>{
                  setIsModalOpen(true);
                  setIdSelected(data?.id);
                  setDataSelected(data)
                  }}
                  />
                </td>
              </tr>
              ))
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
    ?<UserDetailsModel
     setIdSelected={setIdSelected}
     setIsModalOpen={setIsModalOpen}
     data={dataSelected}
    />
    :<RoleDetailsModel
     setIdSelected={setIdSelected}
     setIsModalOpen={setIsModalOpen}
     data={dataSelected}
    />
    :''
    }
    {
      isAddNewModal?
      filterSelected=='Users'?
      <AddNewUser
      setIsAddNewModal={setIsAddNewModal}
      />
      :<AddNewRole 
      setIsAddNewModal={setIsAddNewModal}
      />
      :''
    }
  </div>
  )
}
