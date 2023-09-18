import React from "react";
import styles from "../../styles/Table.module.css";
import Image from "next/image";
import chevronRight from "../../assets/chevron-down.svg";

const DetailsTable = ({
  tableHeaders,
  setIsModalOpen,
  setIdSelected
}) => {
  return <div className={styles.tableContainer}>
          <table>
            <thead>
              <tr>
                {tableHeaders?.map((header)=>(
                  <th>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</td>
                <td>Aryan Sharma</td>
                <td>April 20, 2023</td>
                <td className={styles.status}>Active</td>
                <td >
                  <Image src={chevronRight} alt="" width={50} height={50} 
                  onClick={()=>{
                  setIsModalOpen(true);
                  setIdSelected(0)
                  }}
                  />
                </td>
              </tr>
            </tbody>
          </table>  
        </div>;
};

export default DetailsTable;
