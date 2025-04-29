// src/components/Pagination/PaginationComponent.tsx
import React from 'react';
import { Pagination } from 'react-bootstrap';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PaginationComponent: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <Pagination className="justify-content-center">
      <Pagination.Prev
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
      />
      {pages.map((page, index) => (
        <Pagination.Item
          key={index}
          active={page === currentPage}
          onClick={() => onPageChange(page)}
          style={page === currentPage ? { fontWeight: 'bold' } : {}}
        >
          {page}
        </Pagination.Item>
      ))}
      <Pagination.Next
        onClick={() =>
          currentPage < totalPages && onPageChange(currentPage + 1)
        }
      />
    </Pagination>
  );
};
