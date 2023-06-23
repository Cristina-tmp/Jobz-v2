import React from "react";
import Wrapper from "../assets/wrappers/PageBtnContainer";
import { useAppContext } from "../context/appContext";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";

const PageBtnContainer = () => {
  const { page, numOfPages, changePage } = useAppContext();

  const pages = [...Array(numOfPages).keys()].map((num) => num + 1);

  const nextPage = () => {
    let newPage = page + 1;
    if (newPage > numOfPages) {
      newPage = 1;
    }
    changePage(newPage);
  };

  const prevPage = () => {
    let newPage = page - 1;
    if (newPage < 1) {
      newPage = numOfPages;
    }
    changePage(newPage);
  };

  return (
    <Wrapper>
      <button className="prev-btn" onClick={prevPage}>
        <HiChevronDoubleLeft />
        prev
      </button>
      {pages.map((num) => {
        return (
          <button
            type="button"
            className={num === page ? "pageBtn active" : "pageBtn"}
            key={num}
            onClick={() => changePage(num)}
          >
            {num}
          </button>
        );
      })}
      <button className="next-btn" onClick={nextPage}>
        <HiChevronDoubleRight />
        next
      </button>
    </Wrapper>
  );
};

export default PageBtnContainer;
