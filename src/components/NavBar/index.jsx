import { useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();
  
  if (location.pathname === './src/pages/login' || location.pathname === '/') {
    return null;
  }
  return (
    <>      
    </>

  );
}

export default Navbar;
