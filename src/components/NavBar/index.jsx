import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LogoReverse } from '../Logo';
import { useAuth } from '../../Contexts/useAuth';
import { useState } from 'react';
import Button from '../Button';
import { FaUserCircle, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import axios from 'axios';

import './styles.css';

function Navbar() {
  const logout = import.meta.env.VITE_LOGOUT;

  const location = useLocation();
  const { userData, logout: userLogout } = useAuth(); // Adicionei a função de logout aqui
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
 
  if (location.pathname === './src/pages/login' || location.pathname === '/') {
    return null;
  }

  const logoutUser = async () => {
    try {
      const response = await axios.post(`${logout}`, {}, {
        headers: {
          Authorization: `Bearer ${userData.token}` 
        }
      })

      if (response.status === 200) {
        userLogout(); 
        navigate('/'); // Redireciona para a página de login
      }
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div className="ContainerNavBar">
      <div className="ContainerLogo">
        <LogoReverse />
      </div>
      <div className="ContainerUser">
        <FaUserCircle />
        <p>Olá, <strong>{userData.data.Nome}</strong></p>
        <button onClick={() => setIsOpen(!isOpen)} className='buttonArrow'>
          {isOpen ? <FaChevronUp /> : <FaChevronDown />}
        </button>
        {isOpen && (
          <div className="dropdown-menu">
            <h4>Acesso rápido</h4>
            <div className="dropdown-links">
              <Link to="/inicio">Inicio</Link>
              <Link to="/">Gerenciar Doadores</Link>
              <Link to="/">Adicionar Exames</Link>
              <Link to="/estoque">Estoque</Link>
              {userData?.information?.isAdmin && <Link to="/cadastro">Gerenciar funcionários</Link>}
            </div>
            <Button TextButton={'Sair'} onClick={logoutUser} className="navbar-button" />
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
