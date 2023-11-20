import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';

import App from './App';
import Login from './pages/Login';
import Home from './pages/Home';
import Admin from './pages/Admin';
import EmployeeList from './pages/Employee';
import Stock from './pages/Stock';

const RoutesConfig = () => (
  <Routes>
    <Route element={<App />}>
      <Route path="/" element={<Login />} />
      <Route
        path="/home"
        element={<PrivateRoute element={Home} />}
      />
      <Route
        path="/admin"
        element={<PrivateRoute element={Admin} />}
      />
      <Route
        path="/EmployeeList"
        element={<PrivateRoute element={EmployeeList} />}
      />
      <Route
        path='/stock'
        element={<PrivateRoute element={Stock} />}
      />
    </Route>
  </Routes>
);

export default RoutesConfig;
