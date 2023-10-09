import React, { useState } from "react";
import styles from "./filterDropdown.module.css";
import Image from "next/image";
import filterImg from "../../assets/filter.svg";
import chevronDown from "../../assets/chevron-down.svg";

const FilterDropdown = ({
  isFilter=true,
  options=["one","two","three"],
  selectedOption="Filter",
  setSelectedOption=()=>{}
}) => {
  const [isDropdown,setIsDropdown]=useState(false);

  return <div className={styles.filterContainer}>
    <div className={styles.flexContainer} onClick={()=>setIsDropdown(!isDropdown)}>
      <p className={styles.filter}>{selectedOption}</p>
      <Image
      className={isFilter?'':isDropdown?styles.rotateChevron:''} 
      src={isFilter?filterImg:chevronDown} 
      alt="" width={100} height={50}
      />
    </div>
    {isDropdown && 
    <div className={styles.dropdownWrapper}>
      <div className={styles.dropdown}>
        {options?.map((ele,i)=>(
          <div key={i}
          className={`${styles.defaultOption} ${selectedOption==ele?styles.active:''}`} 
          onClick={()=>{
            setSelectedOption(ele);
            setIsDropdown(false)}
          }
          >
            {ele}
          </div>
        ))}
      </div>
    </div>
    }
  </div>;
};

export default FilterDropdown;
