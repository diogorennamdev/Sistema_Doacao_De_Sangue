import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth } from "../../Contexts/useAuth";

function PrivateRoute({ element: Element, ...rest }) {
  const { getUserData } = useAuth();
  const userData = getUserData();
  const isLoggedIn = userData !== null;

  return isLoggedIn ? <Element {...rest} /> : <Navigate to="/" replace />;
}
PrivateRoute.propTypes = {
  element: PropTypes.elementType.isRequired,
  rest: PropTypes.object,
};

export default PrivateRoute;