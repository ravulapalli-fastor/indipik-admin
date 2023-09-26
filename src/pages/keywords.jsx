import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/keywords.module.css'
import { PageLayout } from '../components/common/PageLayout/PageLayout'
import DetailsTable from '../components/DetailsTable/DetailsTable'
import Modal from '../components/Modal/Modal';
import FilterDropdown from "../components/FilterDropdown/FilterDropdown";
import { useEffect, useState } from 'react';
import dummyImg from "../assets/dummyImg.svg";
import previewImg from "../assets/preview.svg";
import crossImg from "../assets/cross.svg";
import deleteImg from "../assets/delete.svg";
import TopBar from '../components/common/TopBar/TopBar'
import style from "../styles/Table.module.css";
import chevronRight from "../assets/chevron-down.svg";
import { useDispatch, useSelector } from 'react-redux'
import { getkeywords } from '../redux/slice/kewords'

export default function index() {
  const [isModalOpen,setIsModalOpen]=useState(false);
  const [isAddNewModal,setIsAddNewModal]=useState(false);
  const [idSelected,setIdSelected]=useState(null);
  const [newKeywordsAdded,setNewKeywordsAdded]=useState([]);
  const tableHeaders=["S.No","Name","Creator Name","Created On","Action"];
  const {KeywordData}=useSelector((state)=>state.keywordReducer);
  const dispatch=useDispatch();
  let serialNo=0;

  useEffect(()=>{
    const payload={page_no:1};
    console.log(payload,'payload details')
    dispatch(getkeywords(payload))
  },[]);
  
  return (
    <div className={styles.outerContainer}>
     <PageLayout>
      <TopBar 
       pageTitle="Keywords"
       setIsAddNewModal={setIsAddNewModal}
       isAddButton={true}
      />
      <div className={styles.container}>
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
              {KeywordData?.map((item,index)=>{
                serialNo+=index;
                return(
              <tr>
                <td>{serialNo}</td>
                <td>{item?.name}</td>
                <td>{item?.admin?.name}</td>
                <td>{new Date(+item?.created_at).toLocaleDateString('en-IN')}</td>
                <td >
                  <Image src={chevronRight} alt="" width={50} height={50} 
                  onClick={()=>{
                  setIsModalOpen(true);
                  setIdSelected(0)
                  }}
                  />
                </td>
              </tr>
              )})}
            </tbody>
          </table>  
        </div>       
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
                <td>Creator Name</td>
                <td>Aryan Sharma</td>
              </tr>
              <tr>
                <td>Creator On</td>
                <td>12-09-23</td>
              </tr>
            </table>
          </div>
        </div>
        <div className={styles.keywordsContainer}>
          <p className={styles.title}>Keywords Name</p>
          <div className={styles.keywordsInnerContainer}>
            <div className={styles.tab}>
              <p>Happy</p>
              <Image src={deleteImg} alt="" width={24} height={24}/>
            </div>
          </div>
        </div>
      </div>
    </Modal>
    }
    {
      isAddNewModal &&
      <Modal
        goBackText='Add New'
        goBackBtnClick={()=>{setIsAddNewModal(false);setIdSelected("")}}
        isFooterCta={true}
      >
        <div className={styles.modalDetails}>
          <p className={styles.title}>Keywords</p>
          <div className={styles.keywordsInputContainer}>
            {newKeywordsAdded?.map((keyword,index)=>(
              <div className={styles.keywordTab} key={index}>{keyword}</div>
            ))}
            <input 
            onKeyDown={(e)=>{
              if(e.key=="Enter"){
                setNewKeywordsAdded([...newKeywordsAdded,e.target.value]);
                e.target.value=""
              }}
            }
            placeholder="Enter Keywords" 
            className={`${styles.defaultInput} ${newKeywordsAdded.length>0? styles.sWidth:''}`}
            />
          </div>
        </div>
      </Modal>
    }
    </div>
  )
}
