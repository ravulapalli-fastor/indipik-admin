import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Dashboard.module.css'
import { PageLayout } from '../components/common/PageLayout/PageLayout'
import FilterDropdown from '../components/FilterDropdown/FilterDropdown'
import Pagination from '../components/common/Pagination'
import { useState } from 'react'
import TopBar from '../components/common/TopBar/TopBar'

export default function Home() {
  const [currentPage,setcurrentPage]=useState(1);
  const [filterSelected,setFilterSelected]=useState("Images")
  return (
     <PageLayout>
      <div className={styles.container}>
      <div className={styles.topFilterHeadingContainer}>
        <div className={styles.headingContainer}>
          <h1 className={styles.heading}>Hey there, User!</h1>
          <p className={styles.description}>Welcome back, we're happy to have you here!</p>
        </div>
        <FilterDropdown/>
      </div>
      <div className='hr'></div>
      <div className={styles.totalDataPreview}>
        <div className={styles.previewCard}>
          <p className={styles.previewCardTitle}>Title</p>
          <h3 className={styles.previewCardDescription}>Description</h3>
        </div>
      </div>
      <div className={styles.detailsContainer}>
      <TopBar
       setFilterSelected={setFilterSelected}
       titleOptions={["Images","Videos"]}
       filterSelected={filterSelected}
      />         
      <div className={styles.detailsTable}>
          <table>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Image Name</th>
                <th>Contributor Name</th>
                <th>Uploaded On</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</td>
                <td>Aryan Sharma</td>
                <td>April 20, 2023</td>
                <td>Active</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <Pagination totalPages={5} currentPage={currentPage}/>
      </div>
     </PageLayout>
  )
}
