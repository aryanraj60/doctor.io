import React from "react";
import { Pagination } from "flowbite-react";

const PaginationComp = ({
  totalUsers,
  usersPerPage,
  currentPage,
  setCurrentPage,
}) => {
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
    pages.push(i);
  }

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Pagination
      currentPage={currentPage}
      totalPages={pages.length}
      onPageChange={onPageChange}
    />
  );
};

export default PaginationComp;
