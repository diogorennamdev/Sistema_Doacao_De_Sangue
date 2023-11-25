import React, { useState } from 'react';
import PropTypes from 'prop-types';
import "./styles.css";

function Card({name}) {
  



  return (
    <div className='CardDonation'>
      <h2>{name}</h2>
      
    </div>
  );
}

Card.propTypes = {
    name: PropTypes.string
}

export default Card;
