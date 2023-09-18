import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/image.module.css'
import { PageLayout } from '../components/common/PageLayout/PageLayout'
import DetailsTable from '../components/DetailsTable/DetailsTable'
import Modal from '../components/Modal/Modal';
import FilterDropdown from "../components/FilterDropdown/FilterDropdown";
import { useState } from 'react';
import dummyImg from "../assets/dummyImg.svg";
import previewImg from "../assets/preview.svg";
import crossImg from "../assets/cross.svg";
import TopBar from '../components/common/TopBar/TopBar'

export default function index() {
  const [isModalOpen,setIsModalOpen]=useState(false);
  const [idSelected,setIdSelected]=useState("");
  const [filterSelected,setFilterSelected]=useState('InReview');
  const [selectedOption,setSelectedOption]=useState('Reject');
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
        tableHeaders={["S.No","Image Name","Contributor Name","Uploaded On","Status","Action"]}
        /> 
      </div>
     </PageLayout>
    {isModalOpen && 
    <Modal 
    goBackText='Details'
    goBackBtnClick={()=>{setIsModalOpen(false);setIdSelected("")}}
    isFooterCta={false}
    >
      <div className={styles.modalDetails}>
        <p className={styles.title}>Preview</p>
        <div className={styles.filePreviewContainer}>
          <div className={styles.imagePreview}>
            <Image 
            className={styles.mainImg} 
            src={dummyImg} alt="" width={400} height={200}
            />
            <Image 
            className={styles.previewImg}
            onClick={()=>{}} 
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
                <td>Image Name</td>
                <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</td>
              </tr>
              <tr>
                <td>Contributor Name</td>
                <td>Aryan Sharma</td>
              </tr>
              <tr>
                <td>Uploaded On</td>
                <td>12-09-23</td>
              </tr>
              <tr>
                <td>Category</td>
                <td>Image, Building</td>
              </tr>
              <tr>
                <td>Location</td>
                <td>New Delhi</td>
              </tr>
            </table>
          </div>
        </div>
        <div className={styles.keywordsContainer}>
          <p className={styles.title}>Keywords</p>
          <div className={styles.keywordsInnerContainer}>
            <div className={styles.tab}>
              <p>Happy</p>
              <Image src={crossImg} alt="" width={24} height={24}/>
            </div>
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
        </div>
        :
        <div className={styles.removeContainer}>
          <p className={styles.title}>Remove</p>
          <button>Remove</button>
        </div>
      }
      </div>
    </Modal>
    }
    </div>
  )
}
