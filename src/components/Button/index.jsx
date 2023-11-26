import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRefresh } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

import './styles.css';

function Button({ TextButton, onClick, className, loading }) {
  return (
    <button className={`button ${className}`} onClick={onClick}>
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
  onClick: PropTypes.func,
  className: PropTypes.string,
  loading: PropTypes.bool
};

export default Button;
