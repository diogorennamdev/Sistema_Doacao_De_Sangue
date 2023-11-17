import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRefresh } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

import './styles.css';

function Button({ TextButton, onclick, loading }) {
  return (
    <button 
      className='button'
      onClick={onclick}
    >
      {loading ? (
        <FontAwesomeIcon icon={faRefresh} spin />
      ) : (
        TextButton
      )}
    </button>
  );
}

Button.propTypes = {
  TextButton: PropTypes.string,
  onclick: PropTypes.func,
  loading: PropTypes.bool
};

export default Button;
