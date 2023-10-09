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
import { useDispatch, useSelector } from 'react-redux'
import { getPlatformUsersDetails } from '../redux/slice/platform_users'

export default function index() {
  const [isModalOpen,setIsModalOpen]=useState(false);
  const [idSelected,setIdSelected]=useState(null);
  const [filterSelected,setFilterSelected]=useState('Contributors');
  const tableHeaders=filterSelected=="Contributors"
  ?["S.No","Name","Joined Date","Total Items Uploaded","Status","Action"]
  :["S.No","Name","Joined Date","Total Items Downloaded","Status","Action"];
  const [selectedOption,setSelectedOption]=useState('Active');
  const {PlatformUsersData}=useSelector(s=>s.platformUserReducer)
  const [dataSelected,setDataSelected]=useState(null);
  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(getPlatformUsersDetails(filterSelected=='Contributors'?true:false));
  },[filterSelected]);

  const [buyerData,setBuyerData]=useState({
    'plan':'',
    'price':'',
    'date':'',
    'credits':''
  });
  useEffect(()=>{
    if(filterSelected!=='Contributors'){
     let subscribed=dataSelected?.memberships?.filter((i)=>i.is_active && !i.is_referal);
     let credits= 0
     subscribed?.map((x)=> credits+=Number(x.plan.credit));
     let activePlan=subscribed?.find((x)=>x.on_demand)?.plan;
     setBuyerData({
      'price':activePlan?.price,
      'plan':activePlan?.plan,
       credits,
       'date':activePlan?.created_at
    })
    }
  },[dataSelected])
  
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
              {PlatformUsersData?.map((data,index)=>(
              <tr>
                <td>{index+1}</td>
                <td>{data?.name}</td>
                <td>{new Date(+data?.created_at).toLocaleDateString('en-IN')}</td>
                <td>{filterSelected=='Contributors'?
                data?.user_detail?.total_upload || 0
                :data?.user_detail?.total_download || 0
                }</td>
                <td className={style.status}>{data?.status}</td>
                <td >
                  <Image src={chevronRight} alt="" width={50} height={50} 
                  onClick={()=>{
                  setIsModalOpen(true);
                  // setIdSelected(item?.id);
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
              <tbody>
              <tr>
                <td>Name</td>
                <td>{dataSelected?.name}</td>
              </tr>
              <tr>
                <td>Joined On</td>
                <td>{new Date(+dataSelected?.created_at).toLocaleDateString('en-IN')}</td>
              </tr>
              <tr>
                <td>Total Items {filterSelected=='Contributors'?'Uploaded':'Downloaded'}</td>
                <td>{filterSelected=='Contributors'?
                dataSelected?.user_detail?.total_upload || 0
                :dataSelected?.user_detail?.total_download || 0
                }</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
        {filterSelected=='Contributors'?
        <div className={styles.statusContainer}>
          <p className={styles.title}>Status</p>
          <FilterDropdown 
          isFilter={false}
          options={["Active","Suspend"]}
          setSelectedOption={setSelectedOption}
          selectedOption={selectedOption}
          />
        </div>
        :
        <div className={styles.fileDetails}>
          <p className={styles.title}>Subscribe Detail</p>
          <div className={styles.detailsContainer}>
            {buyerData?.plan?
            <table>
              <tbody>
              <tr>
                <td>Plan</td>
                <td>
                  {buyerData?.plan}
                </td>
              </tr>
              <tr>
                <td>Purchase Date</td>
                <td>{new Date(+buyerData?.date).toLocaleDateString('en-IN')}</td>
              </tr>
              <tr>
                <td>Total Credits</td>
                <td>{buyerData?.credits}</td>
              </tr>
              <tr>
                <td>Price</td>
                <td>{buyerData?.price}</td>
              </tr>
              </tbody>
            </table>
            :
            <p>No Subscription Plan Purchased</p>
            }
          </div>
        </div>
        }
      </div>
    </Modal>
    }  
  </div>
  )
}
