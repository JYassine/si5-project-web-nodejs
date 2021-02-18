// import { useState, useEffect } from 'react';
import PaginationComponent from "react-reactstrap-pagination";

export const TablePagination = ({
    pagesCount,
    currentPage,
    onSelect
}) => {

    return (
        <PaginationComponent
            totalItems={pagesCount}
            pageSize={1}
            onSelect={onSelect}
            maxPaginationNumbers={5}
            defaultActivePage={currentPage}
            firstPageText={'<<'}
            previousPageText={'<'}
            nextPageText={'>'}
            lastPageText={'>>'}
            
        />

    )
}