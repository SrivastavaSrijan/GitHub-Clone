import { memo, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { useRepositoryQueryParams } from "../hooks";
import { APIDefaults } from "../constants";
interface IPaginationProps {
  totalPages: number;
}
const defaultPage = APIDefaults.searchRepoWithinOrg.page;
const defaultPerPage = APIDefaults.searchRepoWithinOrg.per_page;
const _Pagination = ({ totalPages }: IPaginationProps) => {
  const { page: currPage } = useRepositoryQueryParams() ?? {
    page: defaultPage,
    per_page: defaultPerPage,
  };

  const [, setSearchParams] = useSearchParams();
  const handlePageChange = useCallback(
    (selectedPage: number) => () => {
      setSearchParams((prevSearchParams) => ({
        ...Object.fromEntries(prevSearchParams.entries()),
        page: selectedPage.toString(),
      }));
    },
    [setSearchParams]
  );

  const renderPaginationButtons = useCallback(() => {
    if (totalPages <= defaultPerPage) {
      return [...Array(totalPages).keys()].map((page) => (
        <button
          className={`join-item btn ${
            page + 1 === currPage ? "btn-active" : ""
          }`}
          onClick={handlePageChange(page + 1)}
          key={page + 1}
        >
          {page + 1}
        </button>
      ));
    } else {
      // Showing first two, last two pages and current page with ellipses
      const startPages = [1, 2];
      const endPages = [totalPages - 1, totalPages];
      const current = currPage;
      const offsets = [-1, 0, 1]; // Pages before and after the current page

      const pages = new Set([
        ...startPages,
        ...endPages,
        ...offsets.map((offset) => current + offset),
      ]);
      const sortedPages = Array.from(pages)
        .sort((a, b) => a - b)
        .filter((page) => page > 0 && page <= totalPages);

      return sortedPages.map((page, index, array) => (
        <div key={page}>
          <button
            className={`join-item btn ${page === currPage ? "btn-active" : ""}`}
            onClick={handlePageChange(page)}
          >
            {page}
          </button>
          {index < array.length - 1 && array[index + 1] !== page + 1 && (
            <span className="join-item btn btn-disabled">...</span>
          )}
        </div>
      ));
    }
  }, [currPage, handlePageChange, totalPages]);

  return (
    <div className="join flex justify-center">{renderPaginationButtons()}</div>
  );
};

export const Pagination = memo(
  _Pagination,
  ({ totalPages }, { totalPages: prevTotalPages }) =>
    totalPages === prevTotalPages
);
