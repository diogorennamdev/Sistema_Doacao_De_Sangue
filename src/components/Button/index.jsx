import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

import './styles.css';

function Button({ TextButton, onclick, loading }) {
  const [hover, setHover] = useState(false);

  return (
    <button 
      className={hover ? 'button hover' : 'button'} 
      onClick={onclick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {loading ? (
        <FontAwesomeIcon icon={faSpinner} spin />
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
