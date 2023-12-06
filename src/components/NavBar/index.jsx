import { Link, useLocation } from 'react-router-dom';
import { LogoReverse } from '../Logo';
import { useAuth } from '../../Contexts/useAuth';
import { useState, useEffect } from 'react';
import Logout from '../../utils/Logout';
import { FaUserCircle, FaChevronDown, FaChevronUp } from 'react-icons/fa';

import './styles.css';

function Navbar() {
  const location = useLocation();
  const { userData } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('.dropdown-menu')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  if (location.pathname === './src/pages/login' || location.pathname === '/') {
    return null;
  }

  const toggleMenu = (event) => {
    event.stopPropagation();
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className="ContainerNavBar">
      <LogoReverse />
      <div className="ContainerUser">
        <FaUserCircle />
        <p
          onClick={toggleMenu}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              toggleMenu(event);
            }
          }}
          tabIndex={0}
        >
          Olá, <strong>{userData.data.Nome}</strong>
        </p>
        <button onClick={toggleMenu} className='buttonArrow'>
          {isOpen ? <FaChevronUp /> : <FaChevronDown />}
        </button>
        {isOpen && (
          <div
            className="dropdown-menu"
            onClick={(event) => event.stopPropagation()}
            onKeyDown={(event) => {
              if (event.key === 'Escape') {
                setIsOpen(false);
              }
            }}
          >
            <h4>Acesso rápido</h4>
            <div className="dropdown-links">
              <Link to="/inicio" onClick={closeMenu}>Inicio</Link>
              <Link to="/doador" onClick={closeMenu}>Gerenciar Doadores</Link>
              <Link to="/exame" onClick={closeMenu}>Adicionar Exames</Link>
              <Link to="/estoque" onClick={closeMenu}>Estoque</Link>
              {userData?.information?.isAdmin && <Link to="/funcionario" nClick={closeMenu}>Gerenciar funcionários</Link>}
            </div>
            <Logout />
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
