import React from 'react'
import './styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
function Button({ TextButton, onclick, loading }) {

// verifica se o lading é true se sim a animação do button é ativada
  return (
    <button className='button' onClick={onclick}>
      {loading ? (
        <FontAwesomeIcon icon={faSpinner} spin />
      ) : (
        TextButton
      )

      }
    </button>
  )
}

export default Button