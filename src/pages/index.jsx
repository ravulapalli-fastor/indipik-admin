import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Dashboard.module.css'
import { PageLayout } from '../components/common/PageLayout/PageLayout'
import FilterDropdown from '../components/FilterDropdown/FilterDropdown'
import Pagination from '../components/common/Pagination'
import { useEffect, useState } from 'react'
import TopBar from '../components/common/TopBar/TopBar'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { getDashboardDetails } from '../redux/slice/dashboard'
import { getFileDetails } from '../redux/slice/file_details'
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';

export default function Home() {
  const [currentPage,setcurrentPage]=useState(1);
  const [filterSelected,setFilterSelected]=useState("Image");
  const {DashboardData}=useSelector((s)=>s.dashboardReducer);
  const {fileData}=useSelector((state)=>state.fileReducer);

  const router=useRouter();
  const dispatch=useDispatch();


console.log(Object.entries(DashboardData));
const dashboardTitle=[
  {'key':'totalRevenue',
   'title':'Total Revenue'
  },
  {'key':'totalActiveBuyer',
   'title':'Total Active Buyer'
  },
  {'key':'totalActiveContributor',
   'title':'Total Active Contributor'
  },
  {'key':'totalImages',
   'title':'Total Images'
  },
  {'key':'totalVideos',
   'title':'Total Videos'
  },
    {'key':'totalSubcribedUsers',
   'title':'Total Subcribed Users'
  },
  {'key':'totalDownload',
   'title':'Total Download'
  }
];

const getDashboardTitle=(key)=>{
   return dashboardTitle?.find(data=>data.key==key)?.title
};
  useEffect(()=>{
    // !localStorage?.getItem("adminToken") && router.push("/login");
    dispatch(getDashboardDetails());
  },[]);
  useEffect(()=>{
    dispatch(getFileDetails({type:filterSelected?.toLocaleUpperCase(),
    page_no:1}));
  },[filterSelected])

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
        {Object.entries(DashboardData)?.map((data)=>(
        <div className={styles.previewCard}>
          <p className={styles.previewCardTitle}>{getDashboardTitle(data?.[0])}</p>
          <h3 className={styles.previewCardDescription}>{data?.[1]}</h3>
        </div>
        ))}
      </div>
      <div className={styles.detailsContainer}>
      <TopBar
       setFilterSelected={setFilterSelected}
       titleOptions={["Image","Video"]}
       filterSelected={filterSelected}
       showFilter={false}
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
              {fileData?.map((data,index)=>(
              <tr>
                <td>{index+1}</td>
                <td>{data?.title}</td>
                <td>{data?.user?.name}</td>
                <td>{new Date(+data?.created_at).toLocaleDateString('en-IN')}</td>
                <td>{data?.status?.toLowerCase()}</td>
              </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* <Pagination totalPages={5} currentPage={currentPage}/> */}
      </div>
     </PageLayout>
  )
}
