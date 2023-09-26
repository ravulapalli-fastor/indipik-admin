import React from "react";
import styles from "./TopBar.module.css";
import FilterDropdown from "../../FilterDropdown/FilterDropdown";

const TopBar = ({
    setFilterSelected=()=>{},
    titleOptions,
    filterSelected,
    setIsAddNewModal=()=>{},
    isAddButton=false,
    showFilter=true,
    pageTitle
}) => {
  return (
  <div className={styles.topBar}>
    <div className={styles.mainContainer}>
      <p className={styles.mainTitle}>{pageTitle}</p>
        <div className={styles.addNewPlusFilterContainer}>
         {isAddButton &&  
            <button
            className='Button' 
            onClick={()=>setIsAddNewModal(true)}
            >Add New</button>
         }
         {showFilter &&
            <FilterDropdown/>
         }
        </div>    
    </div>
    <div className={styles.dataTypesFilter}>
     <div className={styles.dataTypes}>
        {titleOptions?.map((option,index)=>(
        <div 
          key={index}
          className={`
          ${styles.defaultFilter} 
          ${filterSelected==option?styles.activeFilter:''}
          `}
          onClick={()=>setFilterSelected(option)}
          >
            {option}
        </div>
        ))}
      </div>
    </div>
  </div>
  )
};

export default TopBar;
