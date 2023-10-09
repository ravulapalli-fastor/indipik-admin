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

export default function index() {
  const [isModalOpen,setIsModalOpen]=useState(false);
  const [idSelected,setIdSelected]=useState("");
  const [filterSelected,setFilterSelected]=useState('InReview');
  const [selectedOption,setSelectedOption]=useState('Reject');
  const {fileData,singleFileDetails}=useSelector((state)=>state.fileReducer);
  const [rejectedReasons,setRejectedReasons]=useState([]);
  
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
    const payload={
    type:'VIDEO',
    page_no:1,
    filterSelected:filterSelected=="InReview"?'INREVIEW':'PUBLISHED'
  };
    console.log(payload,'payload details')
    dispatch(getFileDetails(payload))
  },[filterSelected]);
  
  useEffect(()=>{
    isModalOpen ?
    document.body.style.overflow='hidden'
    :document.body.style.overflow='unset'
  },[isModalOpen]);

  useEffect(()=>{
    idSelected!="" && dispatch(getSingleFileDetails({
      type:'VIDEO',
      status:filterSelected?.toLocaleUpperCase(),
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
        tableHeaders={["S.No","Video Name","Contributor Name","Uploaded On","Status","Action"]}
        /> 
      </div>
     </PageLayout>
    {isModalOpen && 
    <Modal 
    goBackText='Details'
    goBackBtnClick={()=>{setIsModalOpen(false);setIdSelected("")}}
    isFooterCta={selectedOption!=='Pending'&&filterSelected!=='Approved'}
    onSubmitCta={selectedOption!=='Pending' && handleFileApproveReject}
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
          options={["Reject","Approved","Pending"]}
          setSelectedOption={setSelectedOption}
          selectedOption={selectedOption}
          />
          {selectedOption=='Reject' ?
          <div className={styles.rejectReasonContainer}>
           {rejectedReasons?.map((reason,i)=>(
            <p className={styles.reason} key={i}>{reason}</p>
           ))}
           <div className={styles.reasonInputPlusButton}>
            <input placeholder='Enter Reason...' onChange={(e)=>setReason(e.target.value)}/>
            <button onClick={
              ()=>reason!=''&& setRejectedReasons(prev=>[...prev,reason])
              }
            >Add</button>
           </div>
          </div>
          :''}
          {/* {selectedOption!=='Pending' &&
          <button className={'Button'}
          onClick={handleFileApproveReject}
          >Submit</button>
          } */}
        </div>
        :
        <div className={styles.removeContainer}>
          <p className={styles.title}>Remove</p>
          <button onClick={handleRemove}>Remove</button>
        </div>
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

    </div>
  )
}
 