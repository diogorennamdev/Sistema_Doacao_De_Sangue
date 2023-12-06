import { useState } from 'react';
import PropTypes from 'prop-types';
import { TbDropletPlus, TbEdit, TbTrash } from "react-icons/tb";
import Pagination from '../Pagination';

import "./styles.css";
function List({ users, onClick, onDelete, onAddDonation }) {
  const [currentPage, setCurrentPage] = useState(1);

  const usersPerPage = 5;
  const totalPages = Math.ceil(users.length / usersPerPage);

  const visibleUsers = Array.isArray(users) ? users.slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage) : [];

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className='ListContainer'>
      {visibleUsers.map((user) => (
        <div className='CardListUser' key={user._id}>
          <div className='CardListName'>
            <h2>{user.name.substring(0, 2)}</h2>
            <h3>{user.name}</h3>
          </div>
          <div>
            {user.isDonor &&
              <TbDropletPlus
                onClick={() => onAddDonation(user)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    onAddDonation(user);
                  }
                }}
                tabIndex={0}
                className='DonorIcon'
                title='Adicionar Doação'
              />}
            <TbEdit
              onClick={() => onClick(user)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  onClick(user);
                }
              }}
              tabIndex={0}
              className='EditIcon'
              title='Editar'
            />
            <TbTrash
              onClick={() => onDelete(user)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  onDelete(user);
                }
              }}
              tabIndex={0}
              className='DeleteIcon'
              title='Excluir'
            />
          </div>
        </div>
      ))}

      <div className="pagination">
        <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
      </div>
    </div >
  );
}

List.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClick: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onAddDonation: PropTypes.func.isRequired,
};

export default List;
