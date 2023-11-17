import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './Contexts/useContext';
import PropTypes from 'prop-types';

import Login from './pages/Login';
import Home from './pages/Home';
import Admin from './pages/Admin';
function PrivateRoute({ element: Element, ...rest }) {
  const { getUserData } = useAuth();
  const userData = getUserData();
  const isLoggedIn = userData !== null;

  return isLoggedIn ? <Element {...rest} /> : <Navigate to="/" replace />;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/home"
            element={<PrivateRoute element={Home} />}
          />
          <Route
            path="/admin"
            element={<PrivateRoute element={Admin} />}
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

PrivateRoute.propTypes = {
  element: PropTypes.elementType.isRequired,
  rest: PropTypes.object,
};

export default App;
