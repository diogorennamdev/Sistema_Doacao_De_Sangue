import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './utils/PrivateRoute';
import { useAuth } from './Contexts/useAuth';

import App from './App';
import Login from './pages/Login';
import Home from './pages/Home';
import EmployeeList from './pages/Employee';
import Stock from './pages/Stock';
import Donor from './pages/Donor';
import Exams from './pages/Exams';

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
          <Route path="/funcionario" element={<PrivateRoute element={EmployeeList} />} />
          <Route path='/estoque' element={<PrivateRoute element={Stock} />} />
          <Route path='/doador' element={<PrivateRoute element={Donor} />} />
          <Route path='/exame' element={<PrivateRoute element={Exams} />} />

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
