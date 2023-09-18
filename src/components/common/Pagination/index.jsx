import React from "react";
import style from "./pagination.module.css"



const Pagination = ({totalPages,currentPage}) => {

  return (
      <div className={style.pagination}>
        <button id={style.button_arrow} className={style.btn}> Prev</button>
        <div className={style.page_numbers}>
          {new Array(totalPages).fill(0).slice(0,2).map((e,i)=>(
            <button className={style.page}>{i+1}</button>
          ))}
          <button className={style.page}>...</button>
          <button className={style.page}>{totalPages}</button>
        </div>
          <button id={style.button_arrow} className={style.btn}>Next </button>
      </div>
);
};

export default Pagination;
