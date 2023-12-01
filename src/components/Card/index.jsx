import React, { useState } from 'react';
import PropTypes from 'prop-types';
import "./styles.css";
import { LuPencilLine } from "react-icons/lu";

function Card({ users ,onClick}) {
  const [startIndex, setStartIndex] = useState(0); // Controla o índice inicial dos usuários visíveis

  const handleLoadMore = () => {
    setStartIndex(prevStartIndex => prevStartIndex + 5); // Avança para o próximo conjunto de usuários ao clicar em "Ver Mais"
  };
  const handleLoadLess = () => {
    setStartIndex(0); // Mostra apenas os 6 primeiros usuários ao clicar em "Ver Menos"
  };

  const visibleUsers = users.slice(startIndex, startIndex + 5);

  return (
    <>
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

      <div>
        {users.length > startIndex + 6 && (
          <button onClick={handleLoadMore} className="load-more-button">
            Ver Mais
          </button>
        )}

        {startIndex > 0 && (
          <button onClick={handleLoadLess} className="load-more-button">
            Ver Menos
          </button>
        )}
      </div>
    </>
  );
}

Card.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string
    })
  )
};

export default Card;
