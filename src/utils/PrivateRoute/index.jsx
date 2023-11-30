import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth } from "../../Contexts/useAuth";
import BoxDialog from "../../components/BoxDialog";
import { useState, useEffect } from "react";

function PrivateRoute({ element: Element, ...rest }) {
  const { getUserData } = useAuth();
  const userData = getUserData();
  const isLoggedIn = userData !== null;
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [navigate, setNavigate] = useState(false);

  // Verifica se o token expirou
  const isTokenExpired = userData && userData.information.exp * 1000 < Date.now();

  useEffect(() => {
    if (!isLoggedIn || isTokenExpired) {
      setTitle('Sessão expirada');
      setMessage('Faça login novamente para continuar.');
      setShow(true);
    }
  }, [isLoggedIn, isTokenExpired]);

  // Se o usuário não estiver logado ou o token tiver expirado, redireciona para a página de login
  const handleClose = () => {
    setShow(false);
    setNavigate(true);
  }

  return (
    <>
      {navigate && <Navigate to="/" replace />}
      <BoxDialog show={show} handleClose={handleClose} title={title} message={message} />
      {!navigate && <Element {...rest} />}
    </>
  );
}

PrivateRoute.propTypes = {
  element: PropTypes.elementType.isRequired,
  rest: PropTypes.object,
};

export default PrivateRoute;
