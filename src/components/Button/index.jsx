import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

import './styles.css';

// verifica se o lading é true se sim a animação do button é ativada
function Button({ TextButton, onclick, loading }) {
  return (
    <button className='button' onClick={onclick}>
      {loading ? (
        <FontAwesomeIcon icon={faSpinner} spin />
      ) : (
        TextButton
      )}
    </button>
  );
}

Button.propTypes = {
  TextButton: PropTypes.string, // Se uma prop não for marcada como isRequired, ela é considerada opcional. Se uma prop opcional não for fornecida, ela será undefined
  onclick: PropTypes.func,
  loading: PropTypes.bool
};

export default Button;
