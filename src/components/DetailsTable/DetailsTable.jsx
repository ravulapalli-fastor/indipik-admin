import React, { useEffect } from "react";
import styles from "../../styles/Table.module.css";
import Image from "next/image";
import chevronRight from "../../assets/chevron-down.svg";
import { useDispatch } from "react-redux";
import { getSingleFileDetails } from "../../redux/slice/file_details";

const DetailsTable = ({
  tableHeaders,
  setIsModalOpen,
  setIdSelected,
  data,
}) => {
  let serialNo=0;
  return (
  <div className={styles.tableContainer}>
          <table>
            <thead>
              <tr>
                {tableHeaders?.map((header)=>(
                  <th>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
            {
            data?.map((item,index)=>{
              serialNo+=1;
              return(
              <tr key={index}>
                <td>{serialNo}</td>
                <td>{item?.title}</td>
                <td>{item?.user?.name}</td>
                <td>{new Date(+item?.created_at).toLocaleDateString('en-IN')}</td>
                <td className={styles.status}>{item?.status?.toLowerCase()}</td>
                <td >
                  <Image src={chevronRight} alt="" width={50} height={50} 
                  onClick={()=>{
                  setIsModalOpen(true);
                  setIdSelected(item?.id)
                  }}
                  />
                </td>
              </tr>
              )})
            }
            </tbody>
          </table>
  </div>
  );
};

export default DetailsTable;
