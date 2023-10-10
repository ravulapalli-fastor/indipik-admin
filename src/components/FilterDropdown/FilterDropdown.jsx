import React, { useState } from "react";
import styles from "./filterDropdown.module.css";
import Image from "next/image";
import filterImg from "../../assets/filter.svg";
import chevronDown from "../../assets/chevron-down.svg";

const FilterDropdown = ({
  isFilter=true,
  options=[],
  selectedOption="Filter",
  setSelectedOption=()=>{}
}) => {
  const [isDropdown,setIsDropdown]=useState(false);
  const [option,setOption]=useState(selectedOption)

  return <div className={styles.filterContainer}>
    <div className={styles.flexContainer} onClick={()=>setIsDropdown(!isDropdown)}>
      <p className={styles.filter}>{option?.toLowerCase()||selectedOption?.toLowerCase()}</p>
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
          className={`${styles.defaultOption} ${selectedOption?.toLowerCase()==ele?.toLowerCase()?styles.active:''}`} 
          onClick={()=>{
            setSelectedOption(ele);
            setIsDropdown(false);
            setOption(ele)
          }
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
