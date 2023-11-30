import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './utils/PrivateRoute';
import { useAuth } from './Contexts/useAuth';

import App from './App';
import Login from './pages/Login';
import Home from './pages/Home';
import Admin from './pages/Admin';
import EmployeeList from './pages/Employee';
import Stock from './pages/Stock';
import Cadastro from './pages/Cadastro';
import Donation from './pages/Donation';

const RoutesConfig = () => {
  const { getUserData } = useAuth();
  const userData = getUserData();
  const isLoggedIn = userData !== null;

  const renderRoutes = () => {
    if (isLoggedIn) {
      return (
        <Route element={<App />}>
          <Route path="/" element={<Login />} />
          <Route path="/inicio" element={<PrivateRoute element={Home} />} />
          <Route path="/admin" element={<PrivateRoute element={Admin} />} />
          <Route path="/funcionario/listar" element={<PrivateRoute element={EmployeeList} />} />
          <Route path='/estoque' element={<PrivateRoute element={Stock} />} />
          <Route path='/cadastro' element={<PrivateRoute element={Cadastro} />} />
          <Route path='/doador' element={<PrivateRoute element={Donation} />} />
        </Route>
      );
    } else {
      return (
        <Route element={<App />}>
          <Route path="/" element={<Login />} />
        </Route>
      );
    }
  };

  return <Routes>{renderRoutes()}</Routes>;
};

export default RoutesConfig;
