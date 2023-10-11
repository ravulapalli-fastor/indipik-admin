import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/video.module.css'
import { PageLayout } from '../components/common/PageLayout/PageLayout'
import DetailsTable from '../components/DetailsTable/DetailsTable'
import Modal from '../components/Modal/Modal';
import FilterDropdown from "../components/FilterDropdown/FilterDropdown";
import { useEffect, useState } from 'react';
import dummyImg from "../assets/dummyImg.svg";
import crossImg from "../assets/cross.svg";
import TopBar from '../components/common/TopBar/TopBar'
import { useDispatch, useSelector } from 'react-redux'
import { getFileDetails, getSingleFileDetails } from '../redux/slice/file_details'
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';
import ConfirmationPopup from '../components/common/ConfirmationPopup/ConfirmationPopup'

export default function index() {
  const [isModalOpen,setIsModalOpen]=useState(false);
  const [idSelected,setIdSelected]=useState("");
  const [filterSelected,setFilterSelected]=useState('InReview');
  const [selectedOption,setSelectedOption]=useState('Reject');
  const {fileData,singleFileDetails,total_pages}=useSelector((state)=>state.fileReducer);
  const [rejectedReasons,setRejectedReasons]=useState([]);
  const [currentPage,setCurrentPage]=useState(1);
  const [reason,setReason]=useState('');
  const [isConfimationModal,setIsConfirmationModal]=useState(false);
  
  const dispatch=useDispatch();
  const handleFileApproveReject=()=>{
    const payload=selectedOption=='Reject'?
    {
     'media_id':idSelected,
     'is_reject':true,
     'reason':rejectedReasons
    }:{
     'media_id':idSelected
    };
    dispatch(fileApprove(payload));
    const payload2={
    type:'VIDEO',
    page_no:1,
    filterSelected:filterSelected=="InReview"?'INREVIEW':'PUBLISHED'
  };
    dispatch(getFileDetails(payload2))
  };

  const handleRemove=()=>{
    dispatch(fileRemove({media_id:idSelected}));
    const payload={type:'VIDEO',
    page_no:1,
    filterSelected:filterSelected=="InReview"?'INREVIEW':'PUBLISHED'
  };
    setIsModalOpen(false);
    dispatch(getFileDetails(payload))
  };

  useEffect(()=>{
    setCurrentPage(1);
    const payload={
    type:'VIDEO',
    page_no:1,
    filterSelected:filterSelected=="InReview"?'INREVIEW':'PUBLISHED'
  };
    console.log(payload,'payload details')
    dispatch(getFileDetails(payload))
  },[filterSelected]);

  useEffect(()=>{
    const payload={type:'VIDEO',
    page_no:currentPage,
    filterSelected:filterSelected=="InReview"?'INREVIEW':'PUBLISHED'
  };
    console.log(payload,'payload details')
    dispatch(getFileDetails(payload))
  },[currentPage]); 

  useEffect(()=>{
    isModalOpen ?
    document.body.style.overflow='hidden'
    :document.body.style.overflow='unset'
  },[isModalOpen]);

  useEffect(()=>{
    idSelected!="" && dispatch(getSingleFileDetails({
      type:'VIDEO',
      status:filterSelected=="InReview"?'INREVIEW':'PUBLISHED',
      media_id:Number(idSelected)
    }));
  },[idSelected]);

  return (
    <div className={styles.outerContainer}>
     <PageLayout>
      <TopBar
       pageTitle="Videos"
       setFilterSelected={setFilterSelected}
       titleOptions={["InReview","Approved"]}
       filterSelected={filterSelected}
      />      
      <div className={styles.container}>
        <DetailsTable
        data={fileData}
        setIsModalOpen={setIsModalOpen}
        setIdSelected={setIdSelected}
        currentPage={currentPage}
        tableHeaders={["S.No","Video Name","Contributor Name","Uploaded On","Status","Action"]}
        /> 
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
    {isModalOpen && 
    <Modal 
    goBackText='Details'
    goBackBtnClick={()=>{setIsModalOpen(false);setIdSelected("");setRejectedReasons([])}}
    isFooterCta={selectedOption!=='Inreview'}
    onSubmitCta={()=>{
      selectedOption=='Reject'?
      setIsConfirmationModal(true)
      :handleFileApproveReject()
    }}    
    >
      <div className={styles.modalDetails}>
        <p className={styles.title}>Preview</p>
        <div className={styles.filePreviewContainer}>
          <div className={styles.videoPreview}>
            <video src={singleFileDetails?.media_formats?.find((x)=>x.file_type=="ORIGINAL")?.url} controls={true}></video>
          </div>
        </div>
        <div classNames='hr'></div>
        <div className={styles.fileDetails}>
          <p className={styles.title}>Video Details</p>
          <div className={styles.detailsContainer}>
            <table>
              <tr>
                <td>Video Title</td>
                <td>{singleFileDetails?.title}</td>
              </tr>
              <tr>
                <td>Contributor Name</td>
                <td>{singleFileDetails?.user?.name}</td>
              </tr>
              <tr>
                <td>Uploaded On</td>
                <td>{new Date(+singleFileDetails?.created_at).toLocaleDateString('en-IN')}</td>
              </tr>
              <tr>
                <td>Category</td>
                <td>
                {singleFileDetails?.media_categories?.map((cat)=>(
                  cat?.category?.name
                )).join(", ")}
                </td>
              </tr>
              <tr>
                <td>Location</td>
                <td>{`
                ${singleFileDetails?.extra_medium?.lat?singleFileDetails?.extra_medium?.lat:''}
                , ${singleFileDetails?.extra_medium?.long?singleFileDetails?.extra_medium?.long:''}
                `}</td>
              </tr>
            </table>
          </div>
        </div>
        <div className={styles.keywordsContainer}>
          <p className={styles.title}>Keywords</p>
          <div className={styles.keywordsInnerContainer}>
            {singleFileDetails?.media_keywords?.map((item,index)=>(
            <div className={styles.tab} key={index}>
              <p>{item?.keyword?.name}</p>
              <Image src={crossImg} alt="" width={24} height={24}/>
            </div>
            ))}
          </div>
        </div>
        {filterSelected=="InReview" ?
        <div className={styles.statusContainer}>
          <p className={styles.title}>Status</p>
          <FilterDropdown 
          isFilter={false}
          options={["Reject","Approved","Inreview"]}
          setSelectedOption={setSelectedOption}
          selectedOption={singleFileDetails?.status}
          />
        </div>
        :
        <div className={styles.removeContainer}>
          <p className={styles.title}>Reject</p>
          <button onClick={()=>setSelectedOption('Reject')}>Reject</button>
        </div>
      } 
        {selectedOption=='Reject' ?
          <div className={styles.rejectReasonContainer}>
           {rejectedReasons?.map((reason,i)=>(
            <p className={styles.reason} key={i}>{reason}</p>
           ))}
           <div className={styles.reasonInputPlusButton}>
            <input placeholder='Enter Reason...' onChange={(e)=>setReason(e.target.value)}/>
            <button onClick={
              ()=>{if(reason!=''){
                setReason("");
                setRejectedReasons(prev=>[...prev,reason])
              }}
              }
              className={'Button'}
            >Add</button>
           </div>
          </div>
          :''
        }     
    </div>
    </Modal>
    }
    {/* {
      isFullPreview && 
      <div className='modalWrapper'>
        <div className={styles.fullPreviewContainer}>
            <video src={singleFileDetails?.media_formats?.find((x)=>x.file_type=="ORIGINAL")?.url} controls={true}></video>
        </div>
      </div>
    } */}
      {
      isConfimationModal && 
      <ConfirmationPopup
      setConfirmationModalOpen={setIsConfirmationModal}
      type='Video'
      handleRemove={handleFileApproveReject}
      />
    }
    </div>
  )
}
 