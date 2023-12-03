import { useState } from 'react';
import PropTypes from 'prop-types';
import "./styles.css";
import { LuPencilLine } from "react-icons/lu";
import Pagination from '../Pagination';

function List({ users, onClick }) {
  const [currentPage, setCurrentPage] = useState(1);

  const usersPerPage = 5;
  const totalPages = Math.ceil(users.length / usersPerPage);

  const visibleUsers = users.slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage);

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
            <span onClick={() => onClick(user)} className='icon'>
              <LuPencilLine />
            </span>
          </div>
        ))}
      </div>
      <div className="pagination">
        <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
      </div>

    </>
  );
}

List.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default List;
