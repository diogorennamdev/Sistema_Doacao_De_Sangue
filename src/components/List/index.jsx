import { useState } from 'react';
import PropTypes from 'prop-types';
import { HiPencilAlt } from "react-icons/hi";
import { HiMiniTrash } from "react-icons/hi2";
import Pagination from '../Pagination';

import "./styles.css";
function List({ users, onClick, onDelete }) {
  const [currentPage, setCurrentPage] = useState(1);

  const usersPerPage = 5;
  const totalPages = Math.ceil(users.length / usersPerPage);

  const visibleUsers = Array.isArray(users) ? users.slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage) : [];

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className='ListContainer'>
        {visibleUsers.map((user, index) => (
          <div className='CardListUser' key={index}>
            <div className='CardListName'>
              <h2>{user.name.substring(0, 2)}</h2>
              <h3>{user.name}</h3>
            </div>
            <div>
              <span onClick={() => onClick(user)} className='icon'>
                <HiPencilAlt />
              </span>
              <span onClick={() => onDelete(user)} className='icon'>
                <HiMiniTrash />
              </span>
            </div>
          </div>
        ))}
      <div className="pagination">
        <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
      </div>
      </div>

    </>
  );
}

List.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClick: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default List;
