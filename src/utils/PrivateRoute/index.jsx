import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth } from "../../Contexts/useAuth";
import AlertDialog from "../../components/AlertDialog";
import { useState, useEffect, useCallback } from "react";

function PrivateRoute({ element: Element, ...rest }) {
  const { getUserData } = useAuth();
  const userData = getUserData();
  const isLoggedIn = userData !== null;
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [navigate, setNavigate] = useState(false);

  // Verifica se o token expirou
  const isTokenExpired = useCallback(() => userData && userData.information.exp * 1000 < Date.now(), [userData]);

  // Verifica a validade do token a cada X milissegundos (por exemplo, a cada 5 minutos)
  useEffect(() => {
    const checkTokenExpiration = () => {
      if (!isLoggedIn || isTokenExpired()) {
        setTitle('Sessão expirada');
        setMessage('Faça login novamente para continuar.');
        setShow(true);
        setNavigate(true);
      }
    };

    const tokenCheckInterval = setInterval(checkTokenExpiration, 300000);

    return () => clearInterval(tokenCheckInterval);
  }, [isLoggedIn, userData, isTokenExpired]);

  // Se o usuário não estiver logado ou o token tiver expirado, redireciona para a página de login
  const handleClose = () => {
    setShow(false);
    setNavigate(true);
  }

  return (
    <>
      {navigate && <Navigate to="/" replace />}
      <AlertDialog show={show} handleClose={handleClose} title={title} message={message} />
      {!navigate && <Element {...rest} />}
    </>
  );
}

PrivateRoute.propTypes = {
  element: PropTypes.elementType.isRequired,
  rest: PropTypes.object,
};

export default PrivateRoute;
