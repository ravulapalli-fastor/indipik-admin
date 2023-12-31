import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/image.module.css'
import { PageLayout } from '../components/common/PageLayout/PageLayout'
import DetailsTable from '../components/DetailsTable/DetailsTable'
import Modal from '../components/Modal/Modal';
import FilterDropdown from "../components/FilterDropdown/FilterDropdown";
import { useEffect, useState } from 'react';
import dummyImg from "../assets/dummyImg.svg";
import previewImg from "../assets/preview.svg";
import crossImg from "../assets/cross.svg";
import TopBar from '../components/common/TopBar/TopBar'
import { useDispatch, useSelector } from 'react-redux'
import { fileApprove, fileKeywordRemove, fileRemove, getFileDetails, getInReviewFileDetails, getSingleFileDetails } from '../redux/slice/file_details'
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';
import ConfirmationPopup from '../components/common/ConfirmationPopup/ConfirmationPopup'

export default function index() {
  const [isModalOpen,setIsModalOpen]=useState(false);
  const [idSelected,setIdSelected]=useState("");
  const [filterSelected,setFilterSelected]=useState('InReview');
  const [selectedOption,setSelectedOption]=useState('');
  const {fileData,singleFileDetails,total_pages}=useSelector((state)=>state.fileReducer);
  const [rejectedReasons,setRejectedReasons]=useState([]);
  const [titleOptionSelected,setTitleOptionSelected]=useState('InReview');
  const [isFullPreview,setIsFullPreview]=useState(false);
  const [currentPage,setCurrentPage]=useState(1);
  const [isConfimationModal,setIsConfirmationModal]=useState(false);


  const [reason,setReason]=useState('');

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
    type:'IMAGE',
    page_no:1,
    filterSelected:filterSelected=="InReview"?'INREVIEW':'PUBLISHED'
  };
    dispatch(getFileDetails(payload2))
  };

  const handleRemove=()=>{
    dispatch(fileRemove({media_id:idSelected}));
    const payload={type:'IMAGE',
    page_no:1,
    filterSelected:filterSelected=="InReview"?'INREVIEW':'PUBLISHED'
  };
    setIsModalOpen(false);
    dispatch(getFileDetails(payload))
  };

  const handleKeywordRemove=(id)=>{
    const payload={
      'media_id':singleFileDetails?.id,
      'keyword_id':id
    }
    dispatch(fileKeywordRemove(payload))
  }

  useEffect(()=>{
    setCurrentPage(1);
    const payload={type:'IMAGE',
    page_no:1,
    filterSelected:filterSelected=="InReview"?'INREVIEW':'PUBLISHED'
  };
    console.log(payload,'payload details')
    dispatch(getFileDetails(payload))
  },[filterSelected]);

  useEffect(()=>{
    const payload={type:'IMAGE',
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
      type:'IMAGE',
      status:filterSelected=="InReview"?'INREVIEW':'PUBLISHED',
      media_id:Number(idSelected)
    }));
  },[idSelected]);

  console.log(currentPage,filterSelected,'singleFile details');


  return (
    <div className={styles.outerContainer}>
     <PageLayout>
      <TopBar
       pageTitle="Images"
       setFilterSelected={setFilterSelected}
       titleOptions={["InReview","Approved"]}
       filterSelected={filterSelected}
      />
      <div className={styles.container}>
        <DetailsTable
        setIsModalOpen={setIsModalOpen}
        setIdSelected={setIdSelected}
        data={fileData}
        currentPage={currentPage}
        tableHeaders={["S.No","Image Name","Contributor Name","Uploaded On","Status","Action"]}
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
          <div className={styles.imagePreview}>
            <Image 
            className={styles.mainImg} 
            src={singleFileDetails?.media_formats?.find((x)=>x.file_type=="ORIGINAL")?.url} alt="" width={400} height={200}
            />
            <Image 
            className={styles.previewImg}
            onClick={()=>{setIsFullPreview(true)}} 
            src={previewImg} alt="" width={400} height={200}
            />
          </div>
        </div>
        <div classNames='hr'></div>
        <div className={styles.fileDetails}>
          <p className={styles.title}>Image Details</p>
          <div className={styles.detailsContainer}>
            <table>
              <tr>
                <td>Image Title</td>
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
              <Image src={crossImg} alt="" width={24} height={24}
              onClick={()=>handleKeywordRemove(item?.keyword?.id)}
              />
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
            <input 
            placeholder='Enter Reason...' 
            onChange={(e)=>setReason(e.target.value)}
            />
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
          :''}
      </div>
    </Modal>
    }
    {
      isFullPreview && 
      <div className='modalWrapper'>
        <div className={styles.fullPreviewContainer}>
          <Image onClick={()=>setIsFullPreview(false)} className={styles.crossImg} src={crossImg} alt="Close" width={50} height={50}/>
          <Image className={styles.mainImg} src={singleFileDetails?.media_formats?.find((x)=>x.file_type=="ORIGINAL")?.url} alt="" width={1000} height={500}/>
        </div>
      </div>
    }
    {
      isConfimationModal && 
      <ConfirmationPopup
      setConfirmationModalOpen={setIsConfirmationModal}
      type='Image'
      handleRemove={handleFileApproveReject}
      />
    }
    </div>
  )
}
