import React from 'react';
import { FaRegCircle, FaCircle } from 'react-icons/fa';

interface PaginationProps {
  total: number;
  current: number;
  onClick: (index: number) => void;
}

const PaginationComponent: React.FC<PaginationProps> = ({ total, current, onClick }) => {
  return (
    <ol className="pagination-container">
      {Array.from({ length: total }, (_, index) => (
        <li key={index} 
            className={`pagination-item ${index === current ? 'active' : ''}`}
            onClick={() => onClick(index)}>
          {index === current ? <FaCircle /> : <FaRegCircle />}
        </li>
      ))}
    </ol>
  );
};

export default PaginationComponent;
