import { useLocation } from 'react-router-dom';
import Logo from '../Logo';
import './styles.css';

function Navbar() {
  const location = useLocation();

  if (location.pathname === './src/pages/login' || location.pathname === '/') {
    return null;
  }
  return (

    <div className="ContainerHome">
      <Logo />
    </div>


  );
}

export default Navbar;
