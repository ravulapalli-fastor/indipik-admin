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
import { addkeywords, deletekeyword, getkeywords } from '../redux/slice/kewords'
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';

export default function index() {
  const [isModalOpen,setIsModalOpen]=useState(false);
  const [isAddNewModal,setIsAddNewModal]=useState(false);
  const [idSelected,setIdSelected]=useState(null);
  const [newKeywordsAdded,setNewKeywordsAdded]=useState([]);
  const tableHeaders=["S.No","Name","Creator Name","Created On","Action"];
  const {KeywordData,pages}=useSelector((state)=>state.keywordReducer);
  const [currentPage,setCurrentPage]=useState(1);
  const dispatch=useDispatch();
  const [selectedData,setSelectedData]=useState(null);

  let serialNo=0;

  const handleAddKeyword=async()=>{
    await dispatch(addkeywords({keywords:newKeywordsAdded}))
    .then((res)=>setIsAddNewModal(false));
  }

  const handleKeywordDelete=(id)=>{
    console.log()
    dispatch(deletekeyword(id))
  }

  useEffect(()=>{
    const payload={page_no:currentPage};
    dispatch(getkeywords(payload))
  },[currentPage]);
  console.log(currentPage)
  
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
                return(
              <tr>
                <td>{(currentPage-1)*10+(index+1)}</td>
                <td>{item?.name}</td>
                <td>{item?.admin?.name}</td>
                <td>{new Date(+item?.created_at).toLocaleDateString('en-IN')}</td>
                <td >
                  <Image src={deleteImg} alt="" width={50} height={50} 
                  onClick={()=>{
                   handleKeywordDelete(item?.id)
                  }}
                  style={{transform:'unset'}}
                  />
                </td>
              </tr>
              )})}
            </tbody>
          </table>  
        </div>       
      </div>
      {pages>1 && 
        <div className={'paginationContainer'}>
        {" "}
        <ResponsivePagination
        current={currentPage}
        total={pages}
        onPageChange={setCurrentPage}
       />
       </div>
      }
     </PageLayout>
    {/* {isModalOpen && 
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
                <td>{selectedData?.admin?.name}</td>
              </tr>
              <tr>
                <td>Creator On</td>
                <td>{new Date(+selectedData?.created_at).toLocaleDateString('en-IN')}</td>
              </tr>
            </table>
          </div>
        </div>
        <div className={styles.keywordsContainer}>
          <p className={styles.title}>Keywords Name</p>
          <div className={styles.keywordsInnerContainer}>
            <div className={styles.tab}>
              <p>{selectedData?.name}</p>
              <Image src={deleteImg} alt="" width={24} height={24}/> 
            </div>
          </div>
        </div>
      </div>
    </Modal>
    } */}
    {
      isAddNewModal &&
      <Modal
        goBackText='Add New'
        goBackBtnClick={()=>{setIsAddNewModal(false);setNewKeywordsAdded([]);setIdSelected("")}}
        isFooterCta={true}
        onSubmitCta={handleAddKeyword}
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
