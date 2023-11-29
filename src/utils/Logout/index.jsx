import { useAuth } from '../../Contexts/useAuth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '../../components/Button';

function Logout() {
  const logout = import.meta.env.VITE_LOGOUT;
  const { userData, logout: userLogout } = useAuth();

  const navigate = useNavigate();

  
  const logoutUser = async () => {
    try {
      const response = await axios.post(`${logout}`, {}, {
        headers: {
          Authorization: `Bearer ${userData.token}`
        }
      })

      if (response.status === 200) {
        userLogout();
        navigate('/');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button TextButton={'Sair'} onClick={logoutUser} className="navbar-button" />
  );
}

export default Logout;
