import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';

import App from './App';
import Login from './pages/Login';
import Home from './pages/Home';
import Admin from './pages/Admin';
import EmployeeList from './pages/Employee';
import Stock from './pages/Stock';
import Cadastro from './pages/Cadastro';
const RoutesConfig = () => (
  <Routes>
    <Route element={<App />}>
      <Route path="/" element={<Login />} />
      <Route
        path="/inicio"
        element={<PrivateRoute element={Home} />}
      />
      <Route
        path="/admin"
        element={<PrivateRoute element={Admin} />}
      />
      <Route
        path="/funcionario/listar"
        element={<PrivateRoute element={EmployeeList} />}
      />
      <Route
        path='/estoque'
        element={<PrivateRoute element={Stock} />}
      />
    </Route>
    <Route
        path='/cadastro'
        element={<PrivateRoute element={Cadastro} />}
      />
  </Routes>
);

export default RoutesConfig;
